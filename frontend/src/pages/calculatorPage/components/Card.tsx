import style from '../style.module.css'

interface CardProps {
    title: string,
    description: string,
    onClick: () => void,
}

export default function Card({title, description, onClick}: CardProps) {
    return (
        <div className={style.card}>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={onClick}>
                Simular
            </button>
        </div>
    )
}