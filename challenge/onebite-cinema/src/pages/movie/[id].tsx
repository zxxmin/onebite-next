import {  GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneMovie from '@/lib/fetch-one-movie';
import { useRouter } from 'next/router';
import Head from 'next/head';
import fetchMovies from '@/lib/fetch-movies';

// const mockData = {
//     "id": 1022789,
//     "title": "인사이드 아웃 2",
//     "releaseDate": "2024-06-11",
//     "company": "Walt Disney Pictures, Pixar",
//     "genres": ["애니메이션", "가족", "모험", "코미디"],
//     "subTitle": "비상! 새로운 감정들이 몰려온다!",
//     "description": "13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤 본부를 운영하는 ‘기쁨’, ‘슬픔’, ‘버럭’, ‘까칠’, ‘소심’. 그러던 어느 날, 낯선 감정인 ‘불안’, ‘당황’, ‘따분’, ‘부럽’이가 본부에 등장하고, 언제나 최악의 상황을 대비하며 제멋대로인 ‘불안’이와 기존 감정들은 계속 충돌한다. 결국 새로운 감정들에 의해 본부에서 쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해 위험천만한 모험을 시작하는데…",
//     "runtime": 97,
//     "posterImgUrl": "https://media.themoviedb.org/t/p/w300_and_h450_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
// }

export const getStaticPaths = async () => {
    const movies = await fetchMovies();
    return {
        paths : movies.map(({ id }) => ({
            params: { id: id.toString() }
        })),
        fallback: true,

        // false : 묻고따지지도 않고 Not Found
        // 'blocking : 즉시 생성 like SSR -> 단점은 로딩이 발생할 수 있음
        // true : 즉시 생성. 페이지만 미리 반환
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {

    const id = context.params!.id;
    const movie = await fetchOneMovie(Number(id))

    // not found 페이지 자체를 반환
    if(!movie) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            movie
        },
    }
}

export default function Page ({
    movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    if(router.isFallback) {
        return (
            <>
            <Head>
                <title>한입 시네마</title>
                <meta property="og:image" content="/thumbnail.png" />
                <meta property="og:title" content="한입 시네마" />
                <meta property="og:description" content="한입 시네마에 등록된 영화들을 만나보세요." />
            </Head>
            <div>로딩중...</div>
            </>
        )
    }
    if(!movie) return '문제가 발생하였습니다. 다시 시도하세요.';

    const {
        title,
        releaseDate,
        company,
        genres,
        subTitle,
        description,
        runtime,
        posterImgUrl,
    } = movie;

    
    return (
        <>
        <Head>
            <title>{title}</title>
            <meta property="og:image" content={posterImgUrl} />
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description} />
        </Head>
        <section className={style.container}>
            <div
                className={style.cover_container}
                style={{backgroundImage: `url('${posterImgUrl}')`}}
            >
                <img src={posterImgUrl} />
            </div>

            <h1 className={style.title}>{title}</h1>
            <div>{releaseDate} / {genres} / {runtime}분</div>
            <div>{company}</div>
            <strong>{subTitle}</strong>
            <div>{description}</div>
        </section>
        </>
    )
}