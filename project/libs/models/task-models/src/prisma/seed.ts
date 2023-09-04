import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.task.upsert({
    where: {  taskId: 1 },
    update: {},
    create: {
      title: 'Течет кран',
      description: 'Необходимо починить кран',
      category: {
        create: {
          categoryId: 1,
          title: 'Ремонт'
        },
      },
      price: 2000,
      dueDate: new Date('2023-01-31'),
      address: 'ПМ, 18',
      tags: {
        create: [
          {
            text: 'Сломать',

          }
        ]
      },
      city: 'Moscow',
      userId: '30',
      status: 'New',
      responses: {},
      comments: {
        create: [
          {
            text: 'Привет',
            userId: '30',
          }
        ]
      }
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
