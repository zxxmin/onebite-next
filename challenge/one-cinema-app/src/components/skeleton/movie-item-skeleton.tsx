import style from './movie-item-skeleton.module.css'

export default function MoiveItemSkeleton ({ best } : { best: boolean }) {
    return (
        <li className={best ? style.best_container : style.all_container}></li>
    )
}