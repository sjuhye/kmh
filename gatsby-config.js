require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

let contentfulOptions = {}

if (process.env.NODE_ENV === 'production') {
  contentfulOptions = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  }
} else {
  contentfulOptions = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    host: 'preview.contentful.com'
  }
}

module.exports = {
  siteMetadata: {
    title: 'Katie Hodge',
    author: 'Sjuhye Grace Chung'
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulOptions
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}