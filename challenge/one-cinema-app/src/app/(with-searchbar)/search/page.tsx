import movies from "@/mock/movies.json"
import MovieItem from "@/components/movie-item";
import style from "./page.module.css"

export default function Page({
    searchParams
} : {
    searchParams: {
        q?: string
    }
}) {
    return (
        <ul className={style.search_container}>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <MovieItem {...movie} />
                </li>
            ))}
        </ul>
    )
}