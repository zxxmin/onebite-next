import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from './index.module.css'
import { InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";

export const getServerSideProps = async () => {
  const [allMovie, recoMovie] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies()
  ])

  
  return {
    props: {
      allMovie,
      recoMovie
    },
  }
}

export default function Home({
  allMovie,
  recoMovie
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  
  return <div className={style.container}>
    <section>
      <h3>지금 가장 추천하는 영화</h3>
      <ul className={style.best_container}>
        {recoMovie.slice(0, 3).map((movie) => (
          <li key={`best-${movie.id}`}>
            <MovieItem {...movie} />
          </li>
        ))}
      </ul>
    </section>
    <section>
      <h3>등록된 모든 영화</h3>
      <ul className={style.now_container}>
          {allMovie.map((movie) => (
            <li key={`now-${movie.id}`}>
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
