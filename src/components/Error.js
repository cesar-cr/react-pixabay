import React from 'react'
import PropTypes from 'prop-types'

const Error = ({mensaje}) => {
    return (
        <div className="my-3 p-4 text-center alert alert-primary">{ mensaje }</div>
    )
}

Error.propTypes = {
    mensaje : PropTypes.string.isRequired
}

export default Error
