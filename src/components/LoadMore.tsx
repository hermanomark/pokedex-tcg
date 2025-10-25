import { Spinner } from "./ui/spinner";

const LoadMore = ({ loadMoreRef, isFetchingNextPage, hasNextPage }: { loadMoreRef?: React.RefObject<HTMLDivElement | null>; isFetchingNextPage: boolean; hasNextPage: boolean; }) => {
  return (
    <div ref={loadMoreRef} className="h-10 flex justify-center items-center mt-6">
      {isFetchingNextPage
        ? <Spinner />
        : hasNextPage
          ? "Scroll to load more"
          : ""}
    </div>
  )
}

export default LoadMore;