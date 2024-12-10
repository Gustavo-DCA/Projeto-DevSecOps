import { json } from '@sveltejs/kit';
import crypto from 'crypto';
import fetch from 'node-fetch';
import prisma from '$lib/prisma';
import { ESLint }  from 'eslint';
import { raw } from 'mysql2';
import axios from 'axios';

const GITHUB_WEBHOOK_SECRET  = process.env.GITHUB_WEBHOOK_SECRET!;
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN!;
const MAX_FILES_THRESHOLD = 10;

export async function POST({ request }) {
  const signature = request.headers.get('X-Hub-Signature-256');
  const rawBody = await request.text();
  const computedSignature = 'sha256=' + crypto.createHmac('sha256', GITHUB_WEBHOOK_SECRET).update(rawBody).digest('hex');

  if (signature !== computedSignature) {
    return new Response('Invalid signature', { status: 401 });
  } 

  const payload = JSON.parse(rawBody);
  const commits = payload.commits;
  const repoFullName = payload.repository.full_name;

  const eslint = new ESLint()

  for (const commit of commits) {
    const { id, message, timestamp, url, author } = commit;

    const commitApiUrl = `https://api.github.com/repos/${repoFullName}/commits/${id}`;
    const response = await fetch(commitApiUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    });
    if (!response.ok) {
      console.error(`Failed to fetch commit details: ${response.statusText}`);
      continue;
    }

    const commitData : any= await response.json();
    const filesChanged = commitData.files;

    const commitDto = await prisma.commit.create({
      data: {
        commitId: id,
        message,
        timestamp: new Date(timestamp),
        url,
        authorName: author.name,
        authorEmail: author.email
      }
    });

    if (commit.added.length > MAX_FILES_THRESHOLD && commit.message != 'initial') {
      await prisma.attention.create({
        data: {
          commitId: commitDto.id,
          timestamp: new Date(),
          reason: 'Muitos arquivos criados em apenas um commit!'
        }
      });
    }
    let contagemErros = 0;
    for (const file of filesChanged) {
      const { filename, raw_url, contents_url } = file;
      console.log(raw_url)
    console.log(file)
  
      if (filename.endsWith('.js') || filename.endsWith('.ts')) {

        const file_url = await fetch(contents_url, {
          headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
            Accept: 'application/vnd.github+json'
          }
        });
        const fileUrlReference : any=  await file_url.json();
        const {download_url} = fileUrlReference;
        console.log(download_url)
        const fileResponse = await fetch(download_url, {
          headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
            Accept: 'application/vnd.github+json'
          }
        });

        if (!fileResponse.ok) {
          console.error(`Failed to fetch file content: ${fileResponse.statusText}`);
          continue;
        }

        const code = await fileResponse.text();

        const results = await eslint.lintText(code, { filePath: filename });

        for (const result of results) {
          if (result.errorCount > 0 || result.warningCount > 0) {
            contagemErros += 1;
            const messages = result.messages
              .map(msg => `${msg.ruleId}: ${msg.message} at line ${msg.line}`)
              .join('; ');

            await prisma.attention.create({
              data: {
                commitId: commitDto.id,
                timestamp: new Date(),
                reason: `Problemas no arquivo ${filename}: ${messages}`
              }
            });
          }
        }
      }
    }

    if (contagemErros === 0) {
      await prisma.commit.update({
        where: { id: commitDto.id },
        data: {
          status: 'Nada encontrado',
          statusInt: 0
        },
      });
    } else{
      await prisma.commit.update({
        where: { id: commitDto.id },
        data: {
          status: `${contagemErros} problemas encontrados!`,
          statusInt: 1
        },
      });
    }

  }
  console.log("ok")
  return json({ success: true });
}
