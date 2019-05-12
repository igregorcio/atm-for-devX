import React from 'react'

import './Button.css'

const Button: React.FC<{ onClick(): void; disabled?: boolean }> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
