import { ReviewData } from '@/types'
import style from './review-item.module.css'

export default function ReviewItem ({
    id,
    content,
    author,
    createdAt,
    movieId
}: ReviewData) {
    return (
        <div className={style.container}>
            <div className={style.author}>
                <strong>{author}</strong>
                <span>{new Date(createdAt).toLocaleString()} 작성됨</span>
            </div>
            <div className={style.content}>{content}</div>
            <div>
                <button className={style.del_btn}>리뷰 삭제하기</button>
            </div>
        </div>
    )
}