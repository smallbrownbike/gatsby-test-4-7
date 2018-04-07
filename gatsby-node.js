const path = require('path')

// Create pages from Contentful API

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`)
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
        }
        console.log(result)
        // Create pages
        result.data.allContentfulPage.edges.forEach(edge => {
          createPage({
            path: `${edge.node.slug}`, // required
            component: pageTemplate,
            context: edge.node,
          })
        })

        return
      })
    )
  })
}
