import React from 'react'
const ReactMarkdown = require('react-markdown')

const IndexPage = props => {
  const md = props.pathContext.desc.desc
  return (
    <div>
      <ReactMarkdown source={md} />
    </div>
  )
}

export default IndexPage
