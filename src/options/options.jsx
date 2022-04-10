import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import Router from './router'
import routes from './routes'

ReactDOM.render(
    <ThemeProvider theme={{}}>
        <Router routes={routes} />
    </ThemeProvider>,
    document.getElementById('app'),
)
