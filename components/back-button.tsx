"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { MoveLeft } from 'lucide-react'

interface BackButtonProps{
    title? : string;
    className?: string;
    href?: string;
}

const BackButton = ({title, className, href}: BackButtonProps) => {
    const router = useRouter()
  return (
    <>
        <Button variant="outline" size="sm" className={`rounded-full ${!title ? 'flex justify-center items-center' : ''} ${className}`} onClick={()=> href ? router.push(href) : router.back()}>
            <MoveLeft className={` ${!title ? "size-6" : "mr-2 size-4"} text-black dark:text-white `} />
            {title}
          </Button>
    </>
  )
}

export default BackButton