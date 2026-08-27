import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function StatusBadge({ status }) {
  if (status === "ongoing")
    return (
      <span className="text-xs bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full font-medium">
        Ongoing
      </span>
    );
  if (status === "sos")
    return (
      <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-medium">
        SOS Triggered
      </span>
    );
  return null;
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export default function TripHistory() {
  const navigate = useNavigate();
  const { trips, deleteTrip, deleteAllTrips } = useUser();
  const [confirmModal, setConfirmModal] = useState(null); // null | { type: "single", id } | { type: "all" }

  const handleConfirm = () => {
    if (confirmModal.type === "single") {
      deleteTrip(confirmModal.id);
    } else if (confirmModal.type === "all") {
      deleteAllTrips();
    }
    setConfirmModal(null);
  };

  return (
    <div className="min-h-screen bg-[#12102A] text-[#F4F2FF] flex justify-center relative">
      <div className="w-full max-w-sm px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/home")} className="text-[#A79DE0] text-xl">
              ←
            </button>
            <h1 className="text-xl font-bold">Trip History</h1>
          </div>

          {trips.length > 0 && (
            <button
              onClick={() => setConfirmModal({ type: "all" })}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#1E1B3A] border border-[#302B57] text-red-400"
            >
              Clear all
            </button>
          )}
        </div>

        {trips.length === 0 ? (
          <p className="text-sm text-[#7B72A8]">No trips yet.</p>
        ) : (
          <div className="space-y-2">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-[#1E1B3A] border border-[#302B57] rounded-xl p-3 flex items-center justify-between"
              >
                <button
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  className="text-left flex-1"
                >
                  <p className="text-sm font-medium">
                    {trip.status === "ongoing" && "Trip in progress"}
                    {trip.status === "completed" && "Trip completed successfully"}
                    {trip.status === "sos" && "Trip completed"}
                  </p>
                  <p className="text-xs text-[#7B72A8] mt-0.5">
                    {trip.startTime.toLocaleDateString()} •{" "}
                    {trip.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    {trip.endTime &&
                      ` – ${trip.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                  </p>
                </button>

                <div className="flex items-center gap-3 pl-2">
                  <StatusBadge status={trip.status} />
                  <button
                    onClick={() => setConfirmModal({ type: "single", id: trip.id })}
                    className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center active:bg-red-500/20 transition"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-6 z-50">
          <div className="bg-[#1E1B3A] border border-[#302B57] rounded-2xl p-5 w-full max-w-xs">
            <p className="text-sm font-semibold mb-1">
              {confirmModal.type === "all" ? "Delete all trips?" : "Delete this trip?"}
            </p>
            <p className="text-xs text-[#A79DE0] mb-4">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-2.5 text-sm rounded-full bg-[#252048] text-[#F4F2FF] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 text-sm rounded-full bg-red-600 active:bg-red-700 text-white font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}