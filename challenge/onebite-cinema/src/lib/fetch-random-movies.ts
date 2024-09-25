import { MovieData } from "@/types";

export default async function fetchRandomMovies (): Promise<MovieData[]> {
    const url = `http://localhost:12345/movie/random`

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