import { Environment, Role, hashPassword } from '@coblocks/common';
import { PrismaClient } from './generated/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create root user
  // 2. Create test project
  // 3. Create test room
  const user = await prisma.user.create({
    data: {
      name: 'pedro',
      password: await hashPassword('123456'),
      role: Role.Super,
    },
  });
  console.log(user);

  const project = await prisma.project.create({
    data: {
      name: 'test',
      environment: Environment.Dev,
      description: 'test',
      creator_id: user.id,
    },
  });
  console.log(project);

  const room = await prisma.room.create({
    data: {
      name: 'test',
      creator_id: user.id,
      project_id: project.id,
    },
  });
  console.log(room);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
