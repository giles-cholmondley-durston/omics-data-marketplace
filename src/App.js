import { Ocean } from '@oceanprotocol/squid'
import { Layout } from 'antd'
import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import * as Web3 from 'web3'
import Account from './Account'
import Datasets from './Datasets'
import PublishDataset from './PublishDataset'

const web3 = new Web3(window.web3.currentProvider)
window.ethereum.enable()

const { Header, Content, Footer } = Layout

class App extends Component {
  constructor(props) {
    super()
    this.state = { ocean: null }
  }

  async componentDidMount() {
    const ocean = await new Ocean.getInstance({
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
    this.setState({ ocean })
  }

  render() {
    const { ocean } = this.state

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ margin: '10px 0' }}>
          <Link to="/">
            <img
              src={require('./images/logo.svg')}
              alt=""
              style={{ width: 500 }}
            />
          </Link>
          <div style={{ float: 'right' }}>
            {ocean && <Account ocean={ocean} />}
          </div>
        </Header>
        <Layout style={{ padding: '10px 50px' }}>
          {ocean ? (
            <Content>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => <Datasets ocean={ocean} />}
                />
                <Route
                  path="/publish-dataset"
                  render={() => <PublishDataset ocean={ocean} />}
                />
              </Switch>
            </Content>
          ) : (
            <p>Loading...</p>
          )}
        </Layout>
        <Footer>Copyright GeneOS 2019 </Footer>
      </Layout>
    )
  }
}

export default App
