require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    siteUrl: 'gracjanopiela.pl',
    title: `Gracjan Opiela portfolio`,
    description: `My new portfolio created with gatsby.`,
    seo: {
      separator: `-`,
      og: {
        fbAppId: ``,
        type: `website`,
        title: `title`,
        description: `description`,
        image: `static/img/og-cover.png`
      },
      twitter: {
        creator: `gracjanopiela.pl`,
        card: `summary_large_image`
      }
    }
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
        omitGoogleFont: true
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gracjan Opiela Portfolio`,
        short_name: `GO portfolio`, // Max 12 characters
        start_url: `/?utm_source=a2hs`,
        background_color: `#ffffff`,
        theme_color: `#ffff00`,
        display: `minimal-ui`,
        icon: `static/img/icon.png` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-strict-csp`
  ]
}
