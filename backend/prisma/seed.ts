import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = [];
  for (let i = 0; i < 20; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10); // Hashed password for each user

    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        bio: faker.lorem.sentence(),
        photoURL: faker.image.avatar(),
        location: faker.location.city(),
        isProfileComplete: faker.datatype.boolean(),
        followerCount: faker.number.int({ min: 0, max: 1000 }),
        followeeCount: faker.number.int({ min: 0, max: 500 }),
        newsCount: faker.number.int({ min: 0, max: 50 }),
        analytics: faker.helpers.arrayElement([
          { engagement: faker.number.int({ min: 100, max: 10000 }) },
          { reach: faker.number.int({ min: 1000, max: 50000 }) },
        ]),
      },
    });
    users.push(user);
  }

  // Seed News
  for (let i = 0; i < 100; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    await prisma.news.create({
      data: {
        title: faker.lorem.words(6),
        content: faker.lorem.paragraphs(3),
        posterImage: faker.image.url(),
        flare: faker.lorem.word(),
        is_Author_Anonymous: faker.datatype.boolean(),
        postingTime: faker.date.recent({ days: 30 }),
        upvotes: faker.number.int({ min: 0, max: 1000 }),
        downvotes: faker.number.int({ min: 0, max: 500 }),
        bookmarkCount: faker.number.int({ min: 0, max: 300 }),
        authorId: randomUser.id,
      },
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
