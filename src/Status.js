import React, { PureComponent } from 'react'
import styles from './Status.module.scss'
import PropTypes from 'prop-types'

export default class Status extends PureComponent {
    render() {
        let indicatorClasses = styles.statusIndicatorCloseEnough

        if (this.props.activeAccount) {
            indicatorClasses = styles.statusIndicatorActive
        }

        return (
            <div className={styles.status}>
                <div className={indicatorClasses} />
            </div>
        )
    }
}

Status.propTypes = {
    activeAccount: PropTypes.object
}
