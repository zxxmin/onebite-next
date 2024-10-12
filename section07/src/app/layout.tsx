import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer () {
  // cache를 설정하지 않으면 no-store로 데이터 캐싱이 되지않아 동적 페이지로 자동 설정. -> 풀라우트캐시가 적용되지않음.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  )
  if(!response.ok) return <footer>제작 @winterlood</footer>

  const books :BookData[] = await response.json();

  const bookCount = books.length;

  return <footer>
    <div>제작 @winterlood</div>
    <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
  </footer>
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
