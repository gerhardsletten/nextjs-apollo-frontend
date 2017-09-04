import React from 'react'
import Head from 'next/head'
import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

if (!process.tapEventInjected) {
  injectTapEventPlugin()
  process.tapEventInjected = true
}

const muiTheme = {
  palette: {
    accent1Color: deepOrange500
  }
}

export default ({children, title = 'This is the default title', userAgent}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <style>{`body { margin: 0; min-height: 100vh; }`}</style>
    </Head>
    <MuiThemeProvider muiTheme={getMuiTheme({userAgent, ...muiTheme})}>
      <div className='container'>
        {children}
      </div>
    </MuiThemeProvider>
    <style jsx>{`
      .container {
        font: 18px sans-serif;
        max-width: 100rem;
        margin: 0 auto;
        display: flex;
        min-height: 100vh;
        width: 100%;
        flex-direction: column;
      }
    `}</style>
  </div>
)
