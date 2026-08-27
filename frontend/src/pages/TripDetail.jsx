import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips } = useUser();

  const trip = trips.find((t) => t.id === Number(id));

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#12102A] text-[#F4F2FF] flex items-center justify-center">
        <p className="text-sm text-[#7B72A8]">Trip not found.</p>
      </div>
    );
  }

  const durationMinutes = trip.endTime
    ? Math.round((new Date(trip.endTime) - new Date(trip.startTime)) / 60000)
    : null;

  return (
    <div className="min-h-screen bg-[#12102A] text-[#F4F2FF] flex justify-center">
      <div className="w-full max-w-sm px-5 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/trips")} className="text-[#A79DE0] text-xl">
            ←
          </button>
          <h1 className="text-xl font-bold">Trip Details</h1>
        </div>

        <div className="bg-[#1E1B3A] border border-[#302B57] rounded-xl p-4 mb-4">
          <p className="text-lg font-semibold mb-1">
            {trip.status === "ongoing" && "Trip in progress"}
            {trip.status === "completed" && "Trip completed successfully"}
            {trip.status === "sos" && "SOS Triggered"}
          </p>
          {trip.status === "sos" && (
            <span className="inline-block text-xs bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-medium mb-2">
              Emergency alert sent to contacts
            </span>
          )}
          {trip.status === "ongoing" && (
            <span className="inline-block text-xs bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full font-medium mb-2">
              Ongoing
            </span>
          )}
        </div>

        <div className="bg-[#1E1B3A] border border-[#302B57] rounded-xl p-4 space-y-3">
          <div>
            <p className="text-xs text-[#A79DE0]">Started</p>
            <p className="text-sm font-medium">
              {trip.startTime.toLocaleDateString()} •{" "}
              {trip.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>

          {trip.endTime && (
            <div>
              <p className="text-xs text-[#A79DE0]">Ended</p>
              <p className="text-sm font-medium">
                {trip.endTime.toLocaleDateString()} •{" "}
                {trip.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          )}

          {durationMinutes !== null && (
            <div>
              <p className="text-xs text-[#A79DE0]">Duration</p>
              <p className="text-sm font-medium">{durationMinutes} min</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}