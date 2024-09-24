import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import movies from '@/mock/movies.json'
import MovieItem from "@/components/movie-item";
import style from './index.module.css'

export default function Home() {
  return <div className={style.container}>
    <section>
      <h3>지금 가장 추천하는 영화</h3>
      <ul className={style.best_container}>
        {movies.slice(0, 3).map((movie) => (
          <li key={movie.id}>
            <MovieItem {...movie} />
          </li>
        ))}
      </ul>
    </section>
    <section>
      <h3>등록된 모든 영화</h3>
      <ul className={style.now_container}>
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieItem {...movie} />
            </li>
          ))}
        </ul>
    </section>
  </div>
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
