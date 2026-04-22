import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyMedia,
  EmptyDescription,
  EmptyContent
} from './ui/empty'
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

export default function ApiLoading() {
  return (
    <Empty className="w-full">
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <Spinner color='white'/>
            </EmptyMedia>

            <EmptyTitle>Processing your request</EmptyTitle>

            <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
            </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
            <Button variant="outline" size="sm">Cancel</Button>
        </EmptyContent>
    </Empty>
  )
}
