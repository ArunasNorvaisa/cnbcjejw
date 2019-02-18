module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: '<rootDir>tests/setupEnzyme.js',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/tests/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/tests/fileMock.js'
  }
};
