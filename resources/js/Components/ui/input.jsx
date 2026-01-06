import React from 'react'
import PropTypes from 'prop-types'
import { cn } from 'utils/cn'

/**
 * Input with figma-accurate borders and sizing.
 * @param {object} props
 * @param {string} props.className
 * @param {string} props.type
 * @param {string} props.id
 * @param {boolean} props.invalid
 */
const Input = ({ className, type = 'text', invalid = false, ...rest }) => {
  const styles = cn(
    'w-[501px] h-[67px] px-3 text-[28px] font-comic font-bold text-black',
    'border-[3px] border-[color:var(--Marker)] bg-[color:var(--Paper)]',
    'focus:outline-none focus:ring-2 focus:ring-black/40 transition duration-150',
    invalid && 'ring-2 ring-red-500',
    className
  )
  return <input type={type} className={styles} {...rest} />
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  invalid: PropTypes.bool
}

export default Input
