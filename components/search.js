import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Router from 'next/router'

export default class Search extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      phrase: props.phrase
    }
  }

  onChangeInput = (event, phrase) => {
    this.setState({phrase})
  }

  onSearch = () => {
    const { phrase } = this.state
    Router.push(`/?phrase=${phrase}`)
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.onSearch()
  }

  render () {
    const { phrase } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <div className='bar'>
          <div className='input'>
            <TextField hintText={phrase.length < 1 ? 'Søk etter en ansatt' : null} value={phrase} onChange={this.onChangeInput} fullWidth id='phrase' />
          </div>
          <div className='button'>
            <RaisedButton label='Søk' secondary onTouchTap={this.onSearch} disabled={!phrase.length} />
          </div>
        </div>
        <style jsx>{`
          .bar {
            display: flex;
            align-items: center;
            background: #f2f2f2;
            padding: .5rem 1rem;
          }
          .input {
            flex: 1;
            margin-right: 1rem;
          }
        `}</style>
      </form>
    )
  }
}
