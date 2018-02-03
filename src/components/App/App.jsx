import React, { Component } from 'react'
import { Layout } from 'antd'

import Controls from '../Controls'
import Results from '../Results'

import './App.css'

const { Header, Footer, Content } = Layout

class App extends Component {
    render() {
        return (
            <Layout className="App">
                <Header className="App-header">
                    <Controls />
                </Header>
                <Content>
                    <Results />
                </Content>
                <Footer>© 2018 JacekK, Inc.</Footer>
            </Layout>
        )
    }
}

export default App
