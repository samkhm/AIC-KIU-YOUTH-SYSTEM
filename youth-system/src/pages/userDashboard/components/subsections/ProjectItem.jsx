import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Box from "@/pages/adminDashboard/components/subcomponets/Box";
import { getUserId } from "@/utils/auth";
import API from "@/service/api";
import { useEffect } from "react";
import Mycontributions from "./Mycontributions";

export default function ProjectItem({ project }) {
  if (!project) return null;

  const [mode, setMode] = useState("view"); // view | edit
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  const [contributions, setContributions] = useState([]);
  const [loadCont, setLoadCont] = useState(false);

  const [initialAmount, setInitialAmount] = useState(null);
  const [remainingAmount, setRemainingAmount] = useState(null);

  const userId = getUserId();

  const messageColor =
    {
      success: "text-green-500",
      error: "text-red-500",
      info: "text-blue-500",
      warning: "text-yellow-600",
    }[messageType] || "text-gray-500";

  const openEdit = async () => {
    setMode("edit");
    setAmount("");
    setMessage("");

    await fetchRemainingAmount();
  };

  const clearMessages = () => {
    setMessage("");
    setMessageType("");
  };
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(clearMessages, 9000);
    return () => clearTimeout(timer);
  }, [message]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB");
  };

  //fetch contributions
  const fetchContributions = async () => {
    setLoadCont(true);
    try {
      const res = await API.get(`/tasks/getContributions/${userId}`);
      setContributions(res.data?.contributions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadCont(false);
    }
  };

  const fetchRemainingAmount = async () => {
    if (!project?._id) return;

    try {
      const res = await API.get(`/tasks/getProjectRemAmount/${project._id}`);

      const safeRemaining = res.data?.remainingAmount ?? res.data?.amount ?? 0;
      const safeAmount = res.data?.amount ?? 0;

      setRemainingAmount(Number(safeRemaining));
      setInitialAmount(Number(safeAmount));
    } catch (err) {
      console.error("Failed to fetch remaining amount", err);
      setRemainingAmount(0);
      setInitialAmount(0);
    }
  };

  useEffect(() => {
    fetchRemainingAmount();
  }, [project._id]);

  useEffect(() => {
    fetchContributions();
  }, []);

  const payment = async (payload) => {
    setLoading(true);

    try {
      const res = await API.post("/tasks/userContributions", payload);

      const checkoutRequestID = res.data.checkoutRequestID;

      setMessage("Enter MPesa PIN to complete payment");
      setMessageType("info");

      if (checkoutRequestID) {
        setIsPolling(true);
        waitForPayment(checkoutRequestID);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to initiate payment");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const waitForPayment = (checkoutRequestID) => {
    const maxAttempts = 10; // ~50 seconds
    let attempts = 0;

    const intervalId = setInterval(async () => {
      attempts++;

      try {
        const res = await API.get(`/tasks/paymentStatus/${checkoutRequestID}`);
        const status = res.data.status;

        if (status === "completed") {
          setMessage("Payment confirmed successfully");
          setMessageType("success");
          setIsPolling(false);

          clearInterval(intervalId);

          await fetchContributions();
          await fetchRemainingAmount();
        }

        if (status === "failed") {
          setMessage("Payment failed or cancelled");
          setMessageType("error");
          setIsPolling(false);
          clearInterval(intervalId);
        }

        if (attempts >= maxAttempts) {
          setMessage("Payment confirmation timed out");
          setMessageType("warning");
          setIsPolling(false);
          clearInterval(intervalId);
        }
      } catch (err) {
        console.error(err);
        setIsPolling(false);
        clearInterval(intervalId);
      }
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!amount || amount <= 0) {
      setMessage("Contribution amount must be greater than 0");
      setMessageType("error");
      return;
    }

    const payload = {
      userId,
      projectId: project._id,
      project_name: project.title,
      amount_paid: Number(amount),
    };

    await payment(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Box className="cursor-pointer">
          <div className="flex items-center justify-between p-1">
            <h3 className="font-medium">{project.title}</h3>
            <span
              className={`bg-gray-200 rounded p-2 italic text-sm ${
                project.completed ? "text-green-600" : "text-red-500"
              }`}
            >
              {project.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="w-full h-[200px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <span className="text-sm text-gray-500">
            <strong>Duration:</strong> {formatDate(project.startDate)} to{" "}
            {formatDate(project.endDate)}
          </span>

          <p className="text-sm text-gray-400">
            {project.content?.length > 20
              ? project.content.slice(0, 20) + "..."
              : project.content}
          </p>
        </Box>
      </DialogTrigger>

      <DialogContent className="bg-white">
        {/* VIEW MODE */}
        {mode === "view" && (
          <>
            <DialogHeader>
              <DialogTitle className="border-t-2 rounded mt-5 p-2">
                {project.title}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col border-l-4 rounded border-blue-500 p-2 gap-2">
              <span className="text-sm text-gray-500">
                <strong>Time frame</strong>
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(project.startDate)} to {formatDate(project.endDate)}
              </span>
            </div>

            <DialogDescription className="space-y-2">
              <div className="w-full h-[200px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="border-l-4 rounded border-blue-500 p-3">
                {project.content}
              </p>
            </DialogDescription>

            <DialogFooter>
              <div className="flex justify-between w-full">
                <button
                  type="button"
                  onClick={openEdit}
                  className="p-2 border rounded hover:bg-gray-100 border border-green-300 hover:border-green-500"
                >
                  Contribute
                </button>
              </div>
            </DialogFooter>
          </>
        )}

        {/* EDIT MODE */}
        {mode === "edit" && (
          <>
            <DialogHeader>
              <DialogTitle>Contribute to Project</DialogTitle>
              <div className="flex flex-col">
                <label>Target Amount: Kes. {initialAmount}</label>
                <label
                  className={`italic text-sm font-medium ${
                    remainingAmount === null
                      ? "text-gray-500"
                      : remainingAmount < 0
                      ? "text-red-600"
                      : remainingAmount === 0
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {remainingAmount === null
                    ? "Start contribution"
                    : remainingAmount < 0
                    ? `Overpaid by: Kes. ${Math.abs(remainingAmount)}`
                    : remainingAmount === 0
                    ? "Fully funded!"
                    : `Remaining: Kes. ${remainingAmount}`}
                </label>
              </div>
            </DialogHeader>

            {message && <p className={`text-sm ${messageColor}`}>{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-lg font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="submit"
                  disabled={loading || isPolling}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-500 disabled:opacity-50"
                >
                  {loading
                    ? "Initiating..."
                    : isPolling
                    ? "Waiting for confirmation..."
                    : "Pay"}
                </button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMode("view")}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>

            <div className="bg-gray-200 rounded border-l-2 border-blue-600 p-4">
              <h3 className="w-full flex items-center justify-center border-b border-yellow-400 p-1">
                Your contributions for this project
              </h3>
              <Mycontributions
                contributions={contributions}
                projectId={project._id}
              />
            </div>
          </>
        )}

        {mode === "view" && (
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
}
