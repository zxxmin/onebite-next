import { ReviewData } from '@/types'
import style from './review-item.module.css'
import ReviewDeleteButton from './review-delete-button'

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
            <div className={style.del_btn}>
                <ReviewDeleteButton reviewId={id} movieId={movieId} />
            </div>
        </div>
    )
}