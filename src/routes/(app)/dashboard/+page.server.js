import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function load({ locals }) {

  const commits = await prisma.commit.findMany({
    orderBy: { timestamp: 'desc' }
  });

  return { commits };
}

