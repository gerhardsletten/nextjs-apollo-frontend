import React, {Component} from 'react'
import Layout from '../components/layout'
import Search from '../components/search'
import withData from '../lib/withData'
import {gql, graphql} from 'react-apollo'
import {List} from 'material-ui/List'
import Item from '../components/item'
import Router from 'next/router'
import omit from 'object.omit'
import Dialog from 'material-ui/Dialog'

class Index extends Component {
  static async getInitialProps ({ query, req }) {
    const userAgent = process.browser ? navigator.userAgent : req.headers['user-agent']
    return {
      phrase: query.phrase || '',
      userAgent
    }
  }

  onShowOverlay = (id) => {
    const {url: {pathname, query}} = this.props
    Router.push({pathname, query: {...query, show: id}})
  }
  handleRequestClose = () => {
    const {url: {pathname, query}} = this.props
    Router.push({pathname, query: omit(query, 'show')})
  }

  render () {
    const { phrase, userAgent, results, url: {query} } = this.props
    const title = phrase ? `Søk etter ${phrase}` : 'Søk etter ansatt'
    const showDialog = results && !!query.show && !!results.find(({id}) => id === query.show)
    const person = showDialog && results.find(({id}) => id === query.show)
    return (
      <Layout title={title} userAgent={userAgent}>
        <div className='container'>
          <Search phrase={phrase} />
        </div>
        <Dialog
          open={showDialog}
          title={person ? `${person.givenName} ${person.familyName}` : ''}
          onRequestClose={this.handleRequestClose}
        >
          {person && (
            <div>
              <div className='p'>
                {person.email && <div><strong>E-post:</strong> <a href={`mailto:${person.email}`} className='link'>{person.email}</a></div>}
                {person.workPhone && <div><strong>Tlf. arbeid:</strong> {person.workPhone}</div>}
                {person.mobilePhone && <div><strong>Mobil:</strong> {person.mobilePhone}</div>}
              </div>
              {person.positions && (
                <ul>
                  {person.positions.map(({type, info, department: {name}}, i) => {
                    return (
                      <li key={i}><strong>{info}, {type}</strong> ({name})</li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </Dialog>
        {results && (
          <div className='results'>
            <List>
              {results.map((item, i) => <Item key={i} {...item} onClick={this.onShowOverlay} />)}
            </List>
          </div>
        )}
        {!results && (
          <div className='placeholder'>
            <div>Du har ikke gjort noe søk enda</div>
          </div>
        )}
        <style jsx>{`
          .title {
            margin-top: 0;
            text-align: center;
          }
          .p {
            margin-bottom: 1rem;
          }
          .link {
            color: #428bca;
          }
          .placeholder {
            padding: 1rem;
            text-align: center;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
          }
        `}</style>
      </Layout>
    )
  }
}

const emplyeeQuery = gql`
  query employees ($phrase: String!) {
    employees (phrase: $phrase) {
      id,
      familyName,
      givenName,
      email,
      mobilePhone,
      workPhone,
      positions {
        info,
        type,
        department {
          name
        }
      }
    }
  }
`

export default withData(graphql(emplyeeQuery, {
  options: ({url: {query}}) => {
    return {
      variables: {
        phrase: query.phrase
      },
      skip: !query.phrase
    }
  },
  props: ({ data }) => ({
    results: data.employees
  })
})(Index))
