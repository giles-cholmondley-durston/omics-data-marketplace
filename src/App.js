import { Ocean } from '@oceanprotocol/squid'
import { Layout } from 'antd'
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import * as Web3 from 'web3'
import './App.css'
import Datasets from './Datasets'
import PublishDataset from './PublishDataset'

const web3 = new Web3(window.web3.currentProvider)
window.ethereum.enable()

const { Header, Content, Footer } = Layout

class App extends Component {
  componentDidMount() {
    this.ocean = new Ocean.getInstance({
      web3Provider: web3,
      nodeUri: 'http://localhost:8545',
      aquariusUri: 'http://localhost:5000',
      brizoUri: 'http://localhost:8030',
      parityUri: 'http://localhost:8545',
      secretStoreUri: 'http://localhost:12001',
      threshold: 0,
      password: 'node0',
      address: '0x00bd138abd70e2f00903268f3db08f2d25677c9e'
    })
    console.log('Finished loading contracts!')
  }

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Header>
          <h2 style={{ color: '#fff' }}>Omics Data Marketplace</h2>
        </Header>
        <Layout style={{ padding: '25px 50px' }}>
          {this.ocean ? (
            <Content>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => <Datasets ocean={this.ocean} />}
                />
                <Route
                  path="/publish-dataset"
                  render={() => <PublishDataset ocean={this.ocean} />}
                />
              </Switch>
            </Content>
          ) : (
            <p>Loadin...</p>
          )}
        </Layout>
        <Footer>Copyright GeneOS 2019 </Footer>
      </Layout>
    )
  }
}

export default App
