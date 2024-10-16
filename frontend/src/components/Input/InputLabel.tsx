import Input from "./Input";
import style from './style.module.css'

interface InputLabelProps {
    labeText: string,
    pleaceholder: string,
    value: string,
    type?: string,
    required?: boolean,
    onChange: (e: any) => any
}

export default function InputLabel({labeText, pleaceholder, value, type, required, onChange}: InputLabelProps) {
    return (
        <div className={style.inputLabel}>
            <label>{labeText}</label>
            <Input placeholder={pleaceholder} onChange={onChange} value={value} type={type} required={required}/>
        </div>
    )
}