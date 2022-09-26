import React from 'react'
import './input.scss'

type Props = {
  name: string
  value: string
  type?: string,
  placeholder: string
  label: string
  onChange: (val: string) => void
}

export const CInput: React.FC<Props> = ({ name, label, value, type, placeholder, onChange }) => {
  return (
    <div className="c-input__group">
      <input 
        type={type}
        className="c-input__field" 
        placeholder={placeholder}
        name={name}
        required 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor='name' className="c-input__label">{label}</label>
    </div>

  )
}
