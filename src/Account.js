import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Balance from './Balance'
import Popover from './Popover'

export default class Account extends PureComponent {
  static propTypes = {
    networkName: PropTypes.string,
    activeAccount: PropTypes.object,
    initMakeItRain: PropTypes.func
  }

  state = {
    popoverOpen: false,
    balance: null
  }

  async getBalances(prevProps) {
    if (this.state.activeAccount !== null) {
      const balance = await this.state.activeAccount.getBalance()
      this.setState(() => ({
        balance: balance
      }))
    }
  }

  async getAccount() {
    const accounts = await this.props.ocean.getAccounts()
    this.setState({ activeAccount: accounts[0] })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeAccount !== this.state.activeAccount) {
      this.getBalances(prevProps)
    }
  }

  async componentDidMount() {
    await this.getAccount()

    this.getBalances()
  }

  togglePopover() {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }))
  }

  render() {
    const { popoverOpen, balance } = this.state

    return (
      <div
        onMouseEnter={() => this.togglePopover()}
        onMouseLeave={() => this.togglePopover()}
        onTouchStart={() => this.togglePopover()}
      >
        {balance && (
          <Balance eth={balance.eth.toString()} ocn={balance.ocn.toString()} />
        )}
        {/* <Status
          networkName={networkName}
          activeAccount={activeAccount}
          initMakeItRain={initMakeItRain}
        /> */}
        {popoverOpen && (
          <Popover
            // networkName={this.props.networkName}
            activeAccount={this.state.activeAccount}
            // initMakeItRain={this.props.initMakeItRain}
          />
        )}
      </div>
    )
  }
}
