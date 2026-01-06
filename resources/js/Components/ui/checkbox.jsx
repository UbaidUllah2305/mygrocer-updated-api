import React from 'react'
import PropTypes from 'prop-types'

/**
 * Simple checkbox sized to 16px with accessible label support.
 * @param {object} props
 * @param {boolean} props.checked
 * @param {(v:boolean)=>void} props.onChange
 * @param {string} props.id
 */
const Checkbox = ({ checked, onChange, id }) => {
  return (
    <input
      id={id}
      type="checkbox"
      className="w-[16px] h-[16px] border border-black rounded-[4px]"
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      aria-checked={checked}
    />
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.string
}

export default Checkbox
