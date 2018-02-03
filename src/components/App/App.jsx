import React, { Component } from 'react'

import Controls from '../Controls'
import Results from '../Results'

import './App.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Controls />
                <Results />
            </div>
        )
    }
}

export default App
