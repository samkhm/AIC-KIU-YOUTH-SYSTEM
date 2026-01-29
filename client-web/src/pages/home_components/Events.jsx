import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function Events() {
  return (
    <Dialog>
      {/* Trigger Card */}
      <DialogTrigger asChild>
        <div className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-64">
          <img
            src="/path/to/event-image.jpg"
            alt="Paper Picking"
            className="w-full h-40 object-cover"
          />
          <div className="p-4 bg-white">
            <h4 className="text-lg font-semibold text-gray-800">
              Paper Picking
            </h4>
          </div>
        </div>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-white rounded-xl shadow-lg max-w-md mx-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
            Paper Picking
          </DialogTitle>
        </DialogHeader>

        {/* Event Image */}
        <div className="mb-4">
          <img
            src="/path/to/event-image.jpg"
            alt="Paper Picking"
            className="w-full h-60 object-cover rounded-md"
          />
        </div>

        {/* Description */}
        <DialogDescription className="text-gray-700 text-base leading-relaxed">
          This will be an event which will take place on 10/10/2026. Everyone
          is urged to participate. Make sure to register and attend on time.
        </DialogDescription>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <DialogClose className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Close
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
