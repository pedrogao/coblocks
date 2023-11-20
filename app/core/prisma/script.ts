import { PrismaClient } from '@prisma/client';
import { Role } from '../../common/enums';
import { hashPassword } from '../../common/password';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'pedro',
      password: await hashPassword('123456'),
      role: Role.Admin,
    },
  });
  console.log(user);
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
