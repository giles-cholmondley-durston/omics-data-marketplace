import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import styles from './Balance.module.scss'

const Balance = ({ eth, ocn }) => {
  const ethFromWei = eth / 1e18

  return (
    <Fragment>
      <span className={styles.balance} title={ethFromWei.toFixed(10)}>
        {ethFromWei.toFixed(3).slice(0, -1)} <strong>Ξ</strong>
      </span>
      <span className={styles.balance}>
        {ocn} <strong>Ọ</strong>
      </span>
    </Fragment>
  )
}

Balance.propTypes = {
  eth: PropTypes.string.isRequired,
  ocn: PropTypes.string.isRequired
}

export default Balance
