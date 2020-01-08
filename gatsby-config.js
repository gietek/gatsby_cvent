require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Gatsby Cvent"
  },
  plugins: [{
    resolve: "gatsby-source-cvent",
    options: {
      account: process.env.CVENT_ACCOUNT,
      username: process.env.CVENT_USERNAME,
      password: process.env.CVENT_PASSWORD
    }
  }]
}
