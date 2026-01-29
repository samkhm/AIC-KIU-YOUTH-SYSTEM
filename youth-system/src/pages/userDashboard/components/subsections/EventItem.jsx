import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

export default function EventItem({ event }) {

    
    
  return (
    <Dialog>
    <DialogTrigger asChild>
      <div
        className="
          flex flex-col
          border border-l-2 border-t
          rounded-tl
          border-l-blue-300 border-t-purple-400
          p-2 cursor-pointer
          hover:bg-blue-200
          gap-1
        "
      >
        <h3 className='border-b p-1'>{event.title}</h3>
        <span className='text-sm text-green-700'>{new Date(event.date).toLocaleDateString("en-GB")}</span>
        <p className='italic text-sm text-gray-500'>
          {event.content.length > 30
            ? event.content.slice(0, 30) + '...'
            : event.content}
        </p>
      </div>
    </DialogTrigger>

    <DialogContent>
      <div
        className="
        flex flex-col gap-2
          p-5
          border border-l-4 border-t-2
          rounded
          border-l-blue-300 border-t-purple-400
          mt-5
          hover:bg-blue-100
        "
      >
        <h3 className='border-b w-1/2 p-1'>{event.title}</h3>
        <span className='text-sm text-green-700'>{new Date(event.date).toLocaleDateString("en-GB")}</span>
       <p className='text-sm'> → {event.content} </p>
      </div>

      <DialogClose className="border rounded px-3 py-1 cursor-pointer hover:border-red-200">
        Close
      </DialogClose>
    </DialogContent>
  </Dialog>
  )
}
