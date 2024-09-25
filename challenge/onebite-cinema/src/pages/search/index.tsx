import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import style from './index.module.css'
// import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import { useRouter } from "next/router";
import { MovieData } from "@/types";

// SSG는 검색 결과를 서버로 부터 불러오는 동작은 수행할 수 없음
// 클라이언트 측에서 해결

/*
export const getStaticProps = async (context:GetStaticPropsContext) => {
    const q = context.query.q;
    const movies = await fetchMovies(q as string);
    

    return {
        props: {
            movies
        },
    }
}
*/

export default function Page () {
    const [movies, setMovies] = useState<MovieData[]>([]);

    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchMovies(q as string);
        setMovies(data);
    }

    useEffect(() => {
        if(q) {
            fetchSearchResult();
        }
    }, [q])

    return <ul className={style.search_container}>
        {movies.map((movie) => (
            <li key={movie.id}>
                <MovieItem {...movie} />
            </li>
        ))}
  </ul>
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}