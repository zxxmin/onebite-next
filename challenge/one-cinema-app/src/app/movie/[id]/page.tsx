import NotFound from "@/app/not-found"
import style from "./page.module.css"
import { MovieData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

export async function generateStaticParams () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`)
    if(!res.ok) throw new Error("Fetch failed: ~/movie");

    const movies: MovieData[] = await res.json();
    return movies.map(({ id }) => ({ id: id.toString() }));
}

async function MovieDetail ({ movieId } : { movieId: string }) {
    // day12. 현재 프로젝트에서는 상세보기 데이터도 변하지 않을 것 같으므로 'force-cache' 설정.
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
        { cache: 'force-cache' }
    )
    if(!res.ok) {
        if(res.status === 404) {
            return NotFound();
        }
        return <div>오류가 발생하였습니다!!!</div>
    }

    const movie = await res.json();

    const {
        id,
        title,
        releaseDate,
        company,
        genres,
        subTitle,
        description,
        runtime,
        posterImgUrl,
    } = movie

    return (
        <section>
            <div
                className={style.cover_container}
                style={{backgroundImage: `url('${posterImgUrl}')`}}
            >
                <img src={posterImgUrl} />
            </div>

            <h1 className={style.title}>{title}</h1>
            <div>{releaseDate} / {genres} / {runtime}분</div>
            <div>{company}</div>
            <strong>{subTitle}</strong>
            <div>{description}</div>
        </section>
    )
}

async function ReviewList ({ movieId } : {movieId: string}) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`,
        { next: { tags: [`review-${movieId}`] }}
    )

    if(!res.ok) throw new Error(`Review fetch failed : ${res.statusText}`)
    
    const reviews: ReviewData[] = await res.json();

    return <section>
        {reviews.map((review) => (
            <ReviewItem key={`review-item=${review.id}`} {...review} />
        ))}
    </section>

}

export default async function Page({
    params
} : {
    params: {
        id: string
    }
}) {
    return <div className={style.container}>
        <MovieDetail movieId={params.id} />
        <ReviewEditor movieId={params.id} />
        <ReviewList movieId={params.id} />
    </div>
}