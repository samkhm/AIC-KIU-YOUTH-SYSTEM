import React from "react";
import Box from "../subcomponets/Box";
import { FaTrash, FaEdit } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import API from "@/service/api";

export default function Announcement({ news, deleteNews, delLoader, setNews }) {
  const [selectedNews, setSelectedNews] = useState(null);

  const [data, setData] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [upLoader, setUpLoader] = useState(false);

  const updateData = async (id, payload) => {
    setUpLoader(true);
    try {
      const res = await API.put(`/tasks/updateAnnouncement/${id}`, payload);
      const updatedData = res.data?.announcement || res.data;
      setNews((prev) =>
        prev.map((n) => (n._id === id ? { ...n, ...updatedData } : n)),
      );

      setMessage("Updated successfully!");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      setMessage("Update failed");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } finally {
      setUpLoader(false);
    }
  };

  const openEditDialog = (news) => {
    setSelectedNews(news);
    setData(news.data);
    setMessage("");
    setMessageType("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      data: data,
    };

    try {
      updateData(selectedNews._id, payload);
      // setData("")
    } catch (error) {
      setMessage("Failed to update");
      setMessageType("error");
    }
  };

  const clearMessages = () => {
    setMessage("");
    setMessageType("");
  };

  return (
    <>
      <Box>
        <div className="max-h-64 overflow-y-auto">
          <p>{news.data || "No content"}</p>
        </div>

        <div className="flex flex-wrap flex-row gap-5 items-center justify-evenly">
          <div className="w-fit">
            <Dialog>
              <DialogTrigger asChild>
                <FaEdit
                  color="green"
                  cursor="pointer"
                  onClick={() => openEditDialog(news)}
                />
              </DialogTrigger>

              <DialogContent className="flex flex-col w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-700">
                    Edit Announcement
                  </DialogTitle>
                </DialogHeader>

                {message && (
                  <p
                    className={`text-sm italic ${
                      messageType === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-3"
                >
                  <textarea
                    rows={6}
                    value={data}
                    onChange={(e) => {
                      setData(e.target.value);
                      clearMessages();
                    }}
                    placeholder="Enter announcement here..."
                    className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      disabled={upLoader}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
                    >
                      {upLoader ? "Saving..." : "Save"}
                    </button>

                    <DialogClose className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                      Close
                    </DialogClose>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {delLoader === news._id ? (
            <TailSpin height={15} width={15} ariaLabel="loading" />
          ) : (
            <FaTrash
              size={18}
              onClick={() => deleteNews(news._id)}
              className="text-red-500 hover:text-red-300"
            />
          )}
        </div>
      </Box>
    </>
  );
}
