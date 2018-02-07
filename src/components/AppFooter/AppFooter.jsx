import React from 'react'
import { Layout } from 'antd'

import pkg from '../../../package.json'

import './AppFooter.css'

const { Footer } = Layout

const renderGithubLink = () => (
    <a href={pkg.repository.url} target="blank" title="Go to GitHub repo">
        GitHub
    </a>
)

export default (props) => (
    <Footer className="AppFooter">
        <div>{pkg.author}</div>
        <div>Source: {renderGithubLink()}</div>
        <div>v{pkg.version}</div>
    </Footer>
)
