import { MovieData } from "@/types";

export default async function fetchMovies (
    q?:string,
):Promise<MovieData[]> {
    let url = 'https://onebite-cinema-api-main-six.vercel.app/movie';

    if(q) {
        url += `/search?q=${q}`
    }

    try {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error();
        }

        return await res.json();
    }
    catch(e) {
        console.error(e);
        return [];
    }
}