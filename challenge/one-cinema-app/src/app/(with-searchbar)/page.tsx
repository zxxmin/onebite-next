import Image from "next/image";
import styles from "./page.module.css";
import movies from "@/mock/movies.json"
import MovieItem from "@/components/movie-item";


export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <ul className={styles.best_container}>
          {movies.slice(0, 3).map((movie) => (
            <li key={`best-${movie.id}`}>
              <MovieItem {...movie} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <ul className={styles.now_container}>
          {movies.map((movie) => (
            <li key={`now-${movie.id}`}>
              <MovieItem {...movie} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
