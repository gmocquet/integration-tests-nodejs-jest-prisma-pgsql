describe('Posts', () => {
  // jestPrisma.client works with transaction rolled-back automatically after each test case end.
  const prisma = jestPrisma.client;

  it("are by default set as published", async () => {
    expect(await prisma.post.count()).toBe(0);
    
    // ACT
    const post = await prisma.post.create({
      data: {
        title: "foo",
        author: {
          create: {
            email: "foo@bar.com",
          },
        },
      },
    });

    // ASSERT
    expect(post.published).toBeTruthy();

    expect(await prisma.post.count()).toBe(1);
  });
});
