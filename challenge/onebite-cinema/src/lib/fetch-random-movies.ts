import { MovieData } from "@/types";

export default async function fetchRandomMovies (): Promise<MovieData[]> {
    const url = `https://onebite-cinema-api-main-six.vercel.app/movie/random`

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