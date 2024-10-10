import Image from "next/image";
import styles from "./page.module.css";
import movies from "@/mock/movies.json"
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";

async function AllMovies () {
  // day12. 등록된 모든 영화는 한번 불러온 후 데이터 변화가 없으므로 'force-cache' 설정
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
  // day12. 새로고침이나 페이지 이동 시 계속된 랜덤했으면 좋겠어서 'no-store' 기본값 설정
  // day13. 풀 라우트 캐시를 적용하기 위해 Staic 페이지로 만들어야하므로 no-store에서 revalidate를 설정해줌.
  // -> no-store을 설정하기 위해 옵션이 빈값이였으나, build 시 index 페이지가 static 페이지로 설정되긴 함.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    {next: {revalidate: 3}}
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
