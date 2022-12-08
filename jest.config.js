module.exports = {
  roots: ['<rootDir>/tests'],
  setupFiles: [
    "<rootDir>/tests/common/config/index.ts"
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    ".(ts|tsx)": ["ts-jest", { compiler: "ttypescript" }]
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}