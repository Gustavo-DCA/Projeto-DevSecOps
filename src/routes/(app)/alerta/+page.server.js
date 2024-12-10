import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function load({ locals }) {

  const attention = await prisma.attention.findMany({
    orderBy: { timestamp: 'desc' }
  });

  return { attention };
}