module.exports = {
    css: {
        extract: process.env.NODE_ENV !== 'development',
        sourceMap: false,
        requireModuleExtension: true,
        loaderOptions: {
          stylus: {
            'resolve url': true,
            import: [
              './src/theme'
            ]
          }
        }
      }
}