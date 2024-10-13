'use server'

import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";

export async function createReview (_: any, formData: FormData) {
    const movieId = formData.get("movieId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    if(!movieId || !content || !author) {
        return {
            status: false,
            error: '리뷰 내용과 작성자를 작성해주세요.'
        }
    }

    try {
        await delay(2000);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
            method: 'POST',
            body: JSON.stringify({ movieId, content, author })
        })

        revalidateTag(`review-${movieId}`)
        
        return {
            status: true,
            error: '',
        }
    }
    catch (e) {
        return {
            status: false,
            error: `리뷰 저장에 실패하였습니다. : ${e}`
        }
    }
}