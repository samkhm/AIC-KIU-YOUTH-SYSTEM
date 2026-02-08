import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function AnnouncementItem({ announcement }) {
  const content = announcement?.data || ''

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="
            border border-l-2 border-t
            rounded-tl
            border-l-blue-300 border-t-purple-400
            p-2 cursor-pointer
            hover:bg-blue-200
          "
        >
          <p>
            {content.length > 50
              ? content.slice(0, 50) + '...'
              : content}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent>
      <div className="max-h-64  overflow-y-auto">
        <div
          className="
          
            p-5
            border border-l-4 border-t-2
            rounded
            border-l-blue-300 border-t-purple-400
            mt-5
            hover:bg-blue-100
          "
        >
          {content}
        </div>
        </div>


        <DialogClose className="border rounded px-3 py-1 cursor-pointer hover:border-red-200">
          Close
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
