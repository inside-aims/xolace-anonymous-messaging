import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const DashboardSkeletonLoader = () => {
  return (
    <div className="space-y-6">
    {/* Link Sharing Card Skeleton */}
    <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-7 w-64" />
            </div>
            <Skeleton className="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-20" />
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-4">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-20" />
                </div>
                <Skeleton className="h-9 w-24" />
            </div>
        </CardContent>
    </Card>

    {/* Messages Section Skeleton */}
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-80 mt-2" />
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-lg border-2 border-dashed border-gray-200">
                        <Skeleton className="h-8 w-8 mx-auto rounded" />
                        <Skeleton className="h-3 w-16 mx-auto mt-2" />
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
</div>
  )
}

export default DashboardSkeletonLoader