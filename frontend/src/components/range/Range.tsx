import style from './style.module.css'

interface RangeProps {
    label: string;
    value: number;
    onChange: (e: any) => void;
    min: number;
    max: number;
    step: number;
}

export default function Range({ label, value, onChange, min, max, step }: RangeProps) {
    return (
        <div className={style.range}>
            <div className={style.rangeLabel}>
                <label>{label}</label>
                <label>{value} meses</label>
            </div>
            <input type="range" value={value} onChange={onChange} min={min} max={max} step={step}/>
        </div>
    )

}