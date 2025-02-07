import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css'

interface LinkProps extends React.HTMLAttributes<HTMLLinkElement> {
    customProps?: string,
    href: string
}

export default function LinkComponent({href, children}: LinkProps) {
    return <Link to={href} className={style.link}>{children}</Link>
}