import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.task.upsert({
    where: {  taskId: 1 },
    update: {},
    create: {
      title: 'Течет кран',
      description: 'Необходимо починить кран',
      categories: {
        create: {
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
            userId: '30',
          }
        ]
      },
      city: 'Moscow',
      userId: '30',
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
