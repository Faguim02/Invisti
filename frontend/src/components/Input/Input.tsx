import React from 'react'
import style from './style.module.css'

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    customProps?: string,
    placeholder: string,
    value?: string,
    type?: string,
    required?: boolean,
    onChange: (e: any) => any
}

export default function Input({placeholder, value, onChange, type, required, ...rest}: InputProps) {
    return (
        <input className={style.input} {...rest} placeholder={placeholder} onChange={onChange} value={value} type={type} required={required}/>
    )
}