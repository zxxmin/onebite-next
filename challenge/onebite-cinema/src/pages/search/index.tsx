import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import movies from '@/mock/movies.json'
import MovieItem from "@/components/movie-item";
import style from './index.module.css'

export default function Page () {
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