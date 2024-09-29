import { MovieData } from "@/types";

export default async function fetchOneMovie (
    id:number,
):Promise<MovieData | null> {
    const url = `https://onebite-cinema-api-main-six.vercel.app/movie/${id}`;

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