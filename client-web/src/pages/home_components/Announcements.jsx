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

export default function Announcements() {
  const announcement =
    "There will be an election on a very long text that might not fit";

  const truncateWords = (text, limit) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
          {truncateWords(announcement, 6)}
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white rounded-xl shadow-lg max-w-md mx-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Announcement
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-2 text-gray-700">
          {announcement}
        </DialogDescription>
        <div className="mt-6 flex justify-end">
          <DialogClose className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Close
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
