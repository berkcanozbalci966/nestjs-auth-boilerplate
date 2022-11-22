import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { username: 'test' },
    update: {},
    create: {
      username: 'test',
      email: 'test@test.com',
      password: '$2b$10$ia9AyU384Y9IZB.IVZB5puIeXrS7T9G4WQkqdwxGVFzvjdJ6n6aSO',
      name: 'test',
      surname: 'test',
    },
  });
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
