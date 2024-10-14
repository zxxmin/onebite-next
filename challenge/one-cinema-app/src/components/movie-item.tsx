import { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css"
import Image from "next/image";

export default function MovieItem ({
    id,
    title,
    posterImgUrl,
    width,
    height,
}: MovieData & {width?: number; height?: number}) {
    return <Link href={`/movie/${id}`} className={style.container}>
        <Image
            src={posterImgUrl}
            width={width}
            height={height}
            alt={`영화 ${title}의 표지 이미지`}
        />
    </Link>
}