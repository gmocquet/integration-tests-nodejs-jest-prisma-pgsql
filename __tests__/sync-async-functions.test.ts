describe('Sync/Async functions', () => {
  function drinkFlavor(flavor: string): string {
    if (flavor === 'octopus') {
      throw new Error('Error: yuck, octopus flavor');
    }
    // Do some other stuff

    return 'ok'
  }

  async function drinkFlavorAsync(flavor: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1))
    
    return Promise.resolve(drinkFlavor(flavor))
  }

  test("Sync - not throw - expect/not.toThrow", () => {
    // For the Jest doc https://jestjs.io/docs/next/expect#tothrowerror
    // You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
    expect(() => {
      drinkFlavor('cat');
    }).not.toThrow()
  })

  test("Sync - not throw - return value", () => {
    expect(drinkFlavor('cat')).toBe('ok')
  })

  test("Sync - throw - expect/toThrow", () => {
    expect(() => {
      drinkFlavor('octopus');
    }).toThrow(/^Error/);
  })

  test("Sync - throw - try/catch", () => {
    try {
        drinkFlavor('octopus')
    } catch (err) {
      expect((err as Error).message).toMatch(/^Error/)
    }
  })

  test("Async - not throw - expect/resolves", async () => {
    await expect(drinkFlavorAsync('cat')).resolves.toBe('ok')
  })

  test("Async - not throw - await/return value", async () => {
    await expect(await drinkFlavorAsync('cat')).toBe('ok')
  })

  test("Async - throw - expect/rejects", async () => {
    await expect(drinkFlavorAsync('octopus')).rejects.toThrow(/^Error/)
  })

  test("Async - throw - try/catch", async () => {
    try {
      await drinkFlavorAsync('octopus')
    } catch (err) {
      expect((err as Error).message).toMatch(/^Error/)
    }
  })
})


