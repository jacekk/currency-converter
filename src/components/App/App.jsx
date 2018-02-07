import React from 'react'
import { Layout } from 'antd'

import AppFooter from '../AppFooter'
import Controls from '../Controls'
import Results from '../Results'

import './App.css'

const { Header, Content } = Layout

export default () => (
    <Layout className="App">
        <Header className="App-header">
            <Controls />
        </Header>
        <Content className="App-body">
            <Results />
        </Content>
        <AppFooter />
    </Layout>
)
