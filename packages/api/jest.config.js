module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.ts?(x)',
    '<rootDir>/(test|src)/**/*(*.)@(spec|test).ts?(x)',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
