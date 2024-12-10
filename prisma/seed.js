// prisma/seed.js

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password', 10);

  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword
    }
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
