import MoiveItemSkeleton from "./movie-item-skeleton";

export default function MovieListSkeleton ({
    count,
    best
}: {
    count: number;
    best: boolean;
}) {
    return new Array(count).fill(0).map((_,idx) => <MoiveItemSkeleton key={`movie-item-${idx}`} best={best} />)
}