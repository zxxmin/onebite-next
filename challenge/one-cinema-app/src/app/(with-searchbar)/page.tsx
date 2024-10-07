import Image from "next/image";
import styles from "./page.module.css";
import movies from "@/mock/movies.json"
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";

async function AllMovies () {
  // 등록된 모든 영화는 한번 불러온 후 데이터 변화가 없으므로 'force-cache' 설정
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: 'force-cache' }
  )
  if(!res.ok) return <div>오류가 발생하였습니다!!!</div>

  const allMovies:MovieData[] = await res.json();

  return <ul className={styles.now_container}>
    {allMovies.map((movie) => (
      <li key={`now-${movie.id}`}>
        <MovieItem {...movie} />
      </li>
    ))}
  </ul>
}

async function BestMovies () {
  // 새로고침이나 페이지 이동 시 계속된 랜덤했으면 좋겠어서 'no-store' 기본값 설정
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`
  )
  if(!res.ok) return <div>오류가 발생하였습니다!!!</div>

  const bestMovies:MovieData[] = await res.json();

  return <ul className={styles.best_container}>
    {bestMovies.slice(0, 3).map((movie) => (
      <li key={`best-${movie.id}`}>
        <MovieItem {...movie} />
      </li>
    ))}
  </ul>
}



export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <BestMovies />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
