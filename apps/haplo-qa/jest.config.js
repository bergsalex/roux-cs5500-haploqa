const esModules = ['d3', 'd3-tip', 'd3-array', 'internmap', 'delaunator', 'robust-predicates'].join('|');

module.exports = {
  displayName: 'haplo-qa',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../coverage/apps/haplo-qa',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  // This along with esModules const above prevent errors during build
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
