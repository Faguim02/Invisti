import React from 'react'
import style from './style.module.css'

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    customProps?: string,
    placeholder: string
}

export default function Input({placeholder, ...rest}: InputProps) {
    return (
        <input className={style.input} {...rest} placeholder={placeholder}/>
    )
}