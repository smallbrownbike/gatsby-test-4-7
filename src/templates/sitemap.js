import React from 'react'
import Link from 'gatsby-link'

const Sitemap = props => {
  return (
    <div>
      <ul>
        {props.pathContext.pages.map(page => {
          const slug = page.node.slug
          return (
            <li key={slug}>
              <Link to={`/${slug}`}>{page.node.slug}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sitemap
