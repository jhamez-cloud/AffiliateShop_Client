import React from 'react'
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyMedia,
  EmptyDescription,
  EmptyContent
} from './ui/empty'
import { Button } from './ui/button';
import { SearchXIcon } from 'lucide-react';
import { Spinner } from './ui/spinner';

export default function NoNotification({navigate}:{navigate?:(page:string) => void}) {
  return (
    <Empty className="w-full">
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <Spinner/>
            </EmptyMedia>

            <EmptyTitle>No Notifications.</EmptyTitle>

            <EmptyDescription>
                There are no notifications for you.<br/> Sign Up or Register To Get Notifications.<br/>
            </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button variant={"link"}>
                <a href="/pages/SignUpPage" onClick={()=>navigate}>
                    Sign Up
                </a>
            </Button>
        </EmptyContent>
    </Empty>
  )
}
