import React from 'react'
import Page from '../templates/page'
import queryString from 'query-string'

export default class Preview extends React.Component {
  constructor(props) {
    super(props)
    const entryId = queryString.parse(props.location.search).entryId
    this.state = { preview: null, entryId }
  }

  componentDidMount() {
    fetch(
      `http://preview.contentful.com/spaces/${
        process.env.CONTENTFUL_SPACE_ID
      }/entries/${this.state.entryId}?access_token=${
        process.env.CONTENTFUL_PREVIEW_TOKEN
      }`
    )
      .then(res => res.json())
      .then(json =>
        this.setState({ preview: json.fields ? json.fields.desc : null })
      )
  }

  render() {
    return <Page pathContext={{ desc: { desc: this.state.preview } }} />
  }
}
