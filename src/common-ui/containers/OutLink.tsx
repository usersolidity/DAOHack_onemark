import React from 'react'
import PropTypes from 'prop-types'

/**
 * Wraps standard <a> to track outgoing link on `click`.
 */
class OutLink extends React.PureComponent<any> {
    static propTypes = { to: PropTypes.string.isRequired }

    render() {
        const { to, ...props } = this.props
        return <a target="_blank" href={to} {...props} />
    }
}

export default OutLink
