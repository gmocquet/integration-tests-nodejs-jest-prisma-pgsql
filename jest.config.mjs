export default {
  clearMocks: true,
  testEnvironment: "@quramy/jest-prisma/environment",
  testEnvironmentOptions: {
    verboseQuery: true,
  },
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: [`<rootDir>/jest.setup.ts`],
  moduleNameMapper: {
    "^@/(.*)$": `<rootDir>/src/$1`,
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          target: "ES2022",
        },
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
}
