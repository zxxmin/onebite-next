'use client';

import { useActionState, useEffect } from 'react'
import style from './review-editor.module.css'
import { createReview } from '@/actions/create-review.action'

export default function ReviewEditor ({ movieId } : { movieId: string }) {

    const [state, formAction, isPending] = useActionState(
        createReview,
        null
    )

    useEffect(() => {
        if(state && !state.status) {
            alert(state.error);
        }
    }, [state])

    return <section>
        <form action={formAction} className={style.form_container}>
            <input name="movieId" defaultValue={movieId} hidden />
            <textarea disabled={isPending} name="content" placeholder="리뷰를 작성해주세요" required />
            <div className={style.author_container}>
                <input disabled={isPending} type="text" name="author" placeholder="작성자" required />
                <button disabled={isPending} type="submit">
                    {isPending ? '...' : '작성하기'}
                </button>
            </div>
        </form>
    </section>
}