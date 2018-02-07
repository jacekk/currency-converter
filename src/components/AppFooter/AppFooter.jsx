import React from 'react'
import { Layout } from 'antd'

import pkg from '../../../package.json'

import './AppFooter.css'

const { Footer } = Layout

export default (props) => (
    <Footer className="AppFooter">
        <div>{pkg.author}</div>
        <div>
            Source:{' '}
            <a href={pkg.repository.url} target="blank" title="Go to GitHub repo">
                GitHub
            </a>
        </div>
        <div>v{pkg.version}</div>
    </Footer>
)
