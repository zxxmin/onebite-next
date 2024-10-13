'use client';

import { deleteReview } from "@/actions/delete-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewDeleteButton ({
    reviewId,
    movieId
} : {
    reviewId: number;
    movieId: number;
}) {
    const [state, formAction, isPending] = useActionState(
        deleteReview,
        null
    )

    useEffect(() => {
        if(state && !state.status) {
            alert(state.error)
        }
    }, [state])

    return (
        <form action={formAction}>
            <input name='reviewId' value={reviewId} hidden />
            <input name='movieId' value={movieId} hidden />
            {isPending ? (
                <div>...</div>
            ) : (
                <button type='submit' disabled={isPending}>삭제하기</button>
            )}
        </form>
    )
}