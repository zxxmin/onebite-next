import style from "./loading.module.css"

export default function Loading () {
    return (
        <div className={style.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}