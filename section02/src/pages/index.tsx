// CSS module
import style from './index.module.css';

export default function Home() {
  return (
    <>
    <h1 style={{color: 'red'}}>인라인 스타일</h1>
    <h1 className={style.h1}>CSS 모듈</h1>
    <h2 className={style.h2}>H2</h2>
    </>
  );
}
