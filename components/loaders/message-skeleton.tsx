import { Skeleton } from "@/components/ui/skeleton";

    // Messages skeleton loader component
    export const MessagesSkeleton = () => (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-4 rounded-lg border-2 border-dashed border-gray-200">
                    <Skeleton className="h-8 w-8 mx-auto rounded" />
                    <Skeleton className="h-3 w-16 mx-auto mt-2" />
                </div>
            ))}
        </div>
    );