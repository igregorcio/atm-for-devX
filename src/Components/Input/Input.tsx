import React from 'react'

import './Input.css'

export interface Props {
  onChange(ev: React.ChangeEvent<HTMLInputElement>): void
  value: number
  label: string
  prefix: string
  onKeyDown?(ev: React.KeyboardEvent<HTMLInputElement>): void
  message?: string
}

// NOTE: simple input, aria for input and labeled not handled here
const Input: React.FC<Props> = ({
  onChange,
  value,
  label,
  prefix,
  onKeyDown,
  message,
}) => {
  return (
    <div className="Input-group">
      <span className="Input-prefix">{prefix}</span>
      <input
        required={true}
        className="Input-input"
        onChange={onChange}
        /* NOTE: 'tel' type is a quick workaround to allow only integers,
         * as would be enough validation onInput already
         */
        type="tel"
        value={value === 0 ? '' : value}
        autoFocus={true}
        onKeyDown={onKeyDown}
        data-testid="input"
      />
      <label className="Input-label">{label}</label>
      <span className="Input-highlight" />
      <span className="Input-bar" />
      {message && <div className="Input-message">{message}</div>}
    </div>
  )
}

export default Input
