module.exports = {
  testTimeout: 10000,
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/*.d.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist'],
  testEnvironment: './src/tests/setup/jest.setup.testEnvironment.ts',
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  maxWorkers: 4
}
