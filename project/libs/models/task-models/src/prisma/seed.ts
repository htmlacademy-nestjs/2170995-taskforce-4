import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.task.upsert({
    where: {  taskId: 1 },
    update: {},
    create: {
      title: 'Сломать стену',
      description: 'Сломать кирпичную стену',
      categories: {
        create: {
          title: 'Сломать'
        },
      },
      price: 2000,
      dueDate: new Date('2023-01-16'),
      address: '',
      tags: {},
      city: 'Москва',
      userId: '23',
      status: 'New',
      responses: {},
      comments: {}
    }
  })
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
