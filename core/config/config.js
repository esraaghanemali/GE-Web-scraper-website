
module.exports = {
  mongo: {
    connectionString: 'mongodb://localhost:27017/WebScraper'
  },
  jwt: {
    secret: 'iffMg@23',
    session: false
  },
    schedule: {
    time : '1 * * * * *'
    }
}
