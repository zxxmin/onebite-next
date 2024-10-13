import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

// export const dynamic = ''
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 가제하지 않음 -> 데이터페칭을 사용하면 다이나믹, 아니면 스태틱, 생략해도 무관
// 2. farce-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정
// 4. error : force-static 과 동일하게 페이지를 강제로 Static 페이지 설정. 다른점 : static으로 설정하면 안되는 이유가 있으면 빌드 오류

async function AllBooks () {
  // cache 변경
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {cache: 'force-cache'}
  );

  if(!response.ok) return <div>오류가 발생하였습니다...</div>

  const allBooks : BookData[] = await response.json();

  return <div>
    {allBooks.map((book) => (
      <BookItem key={book.id} {...book} />
    ))}
  </div>
}

async function RecoBooks () {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {next: {revalidate: 3}}
  );
  if(!response.ok) return <div>오류가 발생하였습니다...</div>

  const recoBooks : BookData[] = await response.json();

  return <div>
    {recoBooks.map((book) => (
      <BookItem key={book.id} {...book} />
    ))}
  </div>
}

export const dynamic = 'force-dynamic';

export default function Home() {
  
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
