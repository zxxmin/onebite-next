import movies from "@/mock/movies.json"
import MovieItem from "@/components/movie-item";
import style from "./page.module.css"
import { MovieData } from "@/types";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { metadata } from "../page";
import { Metadata } from "next";

async function SearchResult ({
    q
} : {
    q?: string
}) {
    /**
     * 현재 프로젝트에서는 검색 결과 데이터도 변하지 않을 것 같으므로 'force-cache' 설정.
     * 'no-store'와 'force-cache' 비교 시 캐싱이 된 상태의 검색 속도가 약 20ms 정도 빨라진거 확인.
     * 'no-store' 일 때는 계속 서버에 요청해서 시간이 일정함.
     * */ 

        
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
        { cache: 'force-cache' }
    )
    if(!res.ok) return <div>오류가 발생하였습니다!!!</div>

    const movies:MovieData[] = await res.json();

    return (
        <ul className={style.search_container}>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <MovieItem
                        {...movie}
                        width={260}
                        height={390}
                    />
                </li>
            ))}
        </ul>
    )
}

type Props = {
    searchParams: {
        q?: string
    }
}

export function generateMetadata({ searchParams }: Props) : Metadata {
    return {
        title: `${searchParams} : 한입 씨네마 검색`,
        description: `${searchParams}의 검색 결과입니다.`,
        openGraph: {
            title: `${searchParams} : 한입 씨네마 검색`,
            description: `${searchParams}의 검색 결과입니다.`,
            images: ['/thumbnail.png'],
        }
    }
}

export default async function Page({
    searchParams
} : {
    searchParams: {
        q?: string
    }
}) {
    return <Suspense key={searchParams.q || ""} fallback={
        <ul className={style.search_container}>
            <MovieListSkeleton count={3} best={true} />
        </ul>
    }>
        <SearchResult q={searchParams.q || ""} />
    </Suspense>
}