import React from "react"
import style from './style.module.css'

interface InputProps extends React.HTMLAttributes<HTMLButtonElement> {
    customProps?: string,
}

export default function Button({children, ...rest}: InputProps) {
    return (
        <button {...rest} className={style.button}>{children}</button>
    )
}