import {
  Empty,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

const SpinnerEmpty = () => {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner className="size-8" />
        </EmptyMedia>
      </EmptyHeader>
    </Empty>
  )
}

export default SpinnerEmpty;
