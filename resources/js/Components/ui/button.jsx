import React from 'react'
import PropTypes from 'prop-types'
import { cn } from 'utils/cn'

/**
 * Button component styled to match Shadcn defaults with tailwind.
 * @param {object} props
 * @param {string} props.variant - visual variant (default, outline)
 * @param {string} props.className - additional class names
 * @param {React.ReactNode} props.children - content
 * @param {() => void} [props.onClick]
 */
const Button = ({ variant = 'default', className, children, onClick, ...rest }) => {
  const base = 'inline-flex select-none items-center justify-center rounded-md text-black font-comic text-[28px] font-bold transition duration-150';
  const sizing = 'h-[67px] w-full px-4';
  const outline = 'border-[3px] border-[color:var(--Marker)]';
  const filled = 'bg-[#c2e4cd] hover:brightness-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-black/40';
  const styles = cn(base, sizing, outline, variant === 'default' && filled, className)
  return (
    <button type="button" className={styles} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'outline']),
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
}

export default Button
