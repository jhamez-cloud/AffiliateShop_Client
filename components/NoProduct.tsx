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

export default function NoProduct() {
  return (
    <Empty className="w-full">
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <SearchXIcon/>
            </EmptyMedia>

            <EmptyTitle>No Products Available Yet.</EmptyTitle>

            <EmptyDescription>
                We are working hard to get the best deals for you.<br/> Please check back later.<br/>
                Adjust Your Filters or Explore Our Discounted Jumia Products.
            </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button variant="outline" size="sm">
                Check Discounted Jumia Products
            </Button>
        </EmptyContent>
    </Empty>
  )
}
