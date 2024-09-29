import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from './index.module.css'
import { InferGetStaticPropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allMovie, recoMovie] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies()
  ])

  
  return {
    props: {
      allMovie,
      recoMovie
    },
    revalidate: 3,
  }
}

export default function Home({
  allMovie,
  recoMovie
}: InferGetStaticPropsType<typeof getStaticProps>) {

  
  return (
    <>
    <Head>
      <title>한입 시네마</title>
      <meta property="og:image" content="/thumbnail.png" />
      <meta property="og:title" content="한입 시네마" />
      <meta property="og:description" content="한입 시네마에 등록된 영화들을 만나보세요." />
    </Head>
    <div className={style.container}>
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
    </>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
