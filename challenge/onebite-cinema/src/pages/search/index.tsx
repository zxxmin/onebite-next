import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import movies from '@/mock/movies.json'
import MovieItem from "@/components/movie-item";
import style from './index.module.css'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const q = context.query.q;
    const movies = await fetchMovies(q as string);
    

    return {
        props: {
            movies
        },
    }
}

export default function Page ({
    movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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