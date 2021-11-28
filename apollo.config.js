module.exports = {
  client: {
    service: {
      name: 'lsadashboard',
      // URL to the GraphQL API
      url: 'http://localhost:3100/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}