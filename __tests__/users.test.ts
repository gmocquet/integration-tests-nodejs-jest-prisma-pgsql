// 
import { Prisma } from '@/lib/prisma';

describe('Users', () => {
  // jestPrisma.client works with transaction rolled-back automatically after each test case end.
  const prisma = jestPrisma.client;

  function drinkFlavor(flavor: string): string {
    if (flavor === 'octopus') {
      throw new Error('Error: yuck, octopus flavor');
    }
    // Do some other stuff

    return 'ok'
  }

  async function drinkFlavorAsync(flavor: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return Promise.resolve(drinkFlavor(flavor))
  }

  test("cannot create a user with an email address that is already in user", async () => {
    // ARRANGE
    expect(await prisma.user.count()).toBe(0);

    const createdUser = await prisma.user.create({
      data: {
        email: "foo@bar.com",
      },
    });

    expect(await prisma.user.count()).toBe(1);

    expect(
      await prisma.user.findFirst({
        where: {
          email: "foo@bar.com",
        },
      }),
    ).toStrictEqual(createdUser);

    // ACT + ASSERT
    try {
      await prisma.user.create({
        data: {
          email: "foo@bar.com",
        },
      })
    } catch (err) {
      expect(err).toHaveProperty('code')
      expect((err as Prisma.PrismaClientKnownRequestError).code).toBe('P2002')
    }
  })

  test("Simple test 3", async () => {
    const rowCount = await prisma.user.count();
    expect(rowCount).toBe(0);
  })

  test("Insert a user", async () => {
    const rowCount = await prisma.user.count();
    expect(rowCount).toBe(0);

    await prisma.user.create({
      data: {
        email: "foo@bar.com",
      },
    });

    expect(await prisma.user.count()).toBe(1);
  })
})


