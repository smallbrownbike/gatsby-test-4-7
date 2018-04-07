const path = require('path')

// Create pages from Contentful API

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`)
    const sitemapTemplate = path.resolve(`src/templates/sitemap.js`)
    // Query for markdown nodes to use in creating pages
    resolve(
      graphql(
        `
          {
            allContentfulPage {
              edges {
                node {
                  id
                  slug
                  title
                  desc {
                    desc
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        } else {
          // Create pages
          result.data.allContentfulPage.edges.forEach(edge => {
            createPage({
              path: `${edge.node.slug}`, // required
              component: pageTemplate,
              context: edge.node,
            })
          })
          //Create sitemap
          createPage({
            path: '/sitemap', // required
            component: sitemapTemplate,
            context: { pages: result.data.allContentfulPage.edges },
          })
        }

        return
      })
    )
  })
}
