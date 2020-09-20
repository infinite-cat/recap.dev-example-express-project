module.exports = {
  plugins: [
    '@babel/plugin-syntax-typescript',
    '@babel/plugin-syntax-async-generators',
    ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
    ['@babel/plugin-syntax-class-properties', { loose: true }],
    '@babel/plugin-syntax-object-rest-spread',
    '@recap.dev/babel-plugin',
  ],
}
