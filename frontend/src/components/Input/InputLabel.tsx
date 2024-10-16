import Input from "./Input";
import style from './style.module.css'

interface InputLabelProps {
    labeText: string,
    pleaceholder: string
}

export default function InputLabel({labeText, pleaceholder}: InputLabelProps) {
    return (
        <div className={style.inputLabel}>
            <label>{labeText}</label>
            <Input placeholder={pleaceholder}/>
        </div>
    )
}