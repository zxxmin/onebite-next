'use server';

import { revalidateTag } from "next/cache";

export async function deleteReview (_:any, formData: FormData) {
    const reviewId = formData.get('reviewId')?.toString();
    const movieId = formData.get('movieId')?.toString();

    if(!reviewId) {
        return {
            status: false,
            error: `삭제할 리뷰가 없습니다.`
        }
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
            {
                method: 'DELETE'
            }
        )

        if(!res.ok) {
            throw new Error(res.statusText)
        }

        revalidateTag(`review-${movieId}`)
        return {
            status: true,
            error: ''
        }

    }
    catch (e) {
        return {
            status: false,
            error: `리뷰 삭제를 실패하였습니다. : ${e}`
        }
    }
}