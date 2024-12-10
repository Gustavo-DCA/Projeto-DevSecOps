// src/lib/users.js

import prisma from '$lib/prisma';

export async function findUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username }
  });
}

export async function getUserById(id : number) {
  return await prisma.user.findUnique({
    where: { id: id },
    select:{
      password: false,
      id:true,
    }
  });
}
