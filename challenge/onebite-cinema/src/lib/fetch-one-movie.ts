import { MovieData } from "@/types";

export default async function fetchOneMovie (
    id:number,
):Promise<MovieData | null> {
    const url = `http://localhost:12345/movie/${id}`;

    try {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error();
        }

        return await res.json();
    }
    catch(e) {
        console.error(e);
        return null;
    }
}