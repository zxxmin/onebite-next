import style from './review-editor.module.css'
import { createReview } from '@/actions/create-review.action'

export default function ReviewEditor ({ movieId } : { movieId: string }) {
    return <section>
        <form action={createReview} className={style.form_container}>
            <input name="movieId" defaultValue={movieId} hidden />
            <textarea name="content" placeholder="리뷰를 작성해주세요" required />
            <div className={style.author_container}>
                <input type="text" name="author" placeholder="작성자" required />
                <button type="submit">작성하기</button>
            </div>
        </form>
    </section>
}