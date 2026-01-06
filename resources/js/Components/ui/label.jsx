import React from 'react'
import PropTypes from 'prop-types'
import { cn } from 'utils/cn'

/**
 * Accessible label text.
 * @param {object} props
 * @param {string} props.htmlFor
 * @param {string} props.className
 */
const Label = ({ htmlFor, className, children }) => {
  const styles = cn('text-[28px] font-comic font-bold text-black', className)
  return (
    <label htmlFor={htmlFor} className={styles}>
      {children}
    </label>
  )
}

Label.propTypes = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
}

export default Label
