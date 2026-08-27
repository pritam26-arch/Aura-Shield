import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  const navigate = useNavigate();
  const { contacts, trips, permissions, currentTrip, startTrip } = useUser();

  return (
    <div className="min-h-screen bg-[#12102A] text-[#F4F2FF] flex justify-center">
      <div className="w-full max-w-sm px-5 py-8 flex flex-col min-h-screen">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-[#A79DE0]">{getGreeting()}</p>
            <h1 className="text-xl font-bold">Stay Safe 🛡️</h1>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="w-10 h-10 rounded-full bg-[#1E1B3A] flex items-center justify-center text-lg"
          >
            ⚙️
          </button>
        </div>

        {/* Ongoing trip banner */}
        {currentTrip && (
          <button
            onClick={() => navigate("/commute/active")}
            className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-between active:bg-blue-500/20 transition"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <p className="text-sm font-medium text-blue-300">
                Trip in progress — tap to resume
              </p>
            </div>
            <span className="text-blue-300 text-sm">›</span>
          </button>
        )}

        {/* Status card - contacts */}
        <button
          onClick={() => navigate("/contacts/add")}
          className="bg-[#1E1B3A] border border-[#302B57] rounded-2xl p-4 mb-3 text-left flex items-center justify-between active:bg-[#252048] transition"
        >
          <div>
            <p className="text-xs text-[#A79DE0] mb-1">Emergency contacts</p>
            <p className="text-lg font-semibold">
              {contacts?.length
                ? `${contacts.length} contact${contacts.length > 1 ? "s" : ""} added`
                : "None added yet"}
            </p>
          </div>
          <span className="text-xs bg-red-600/20 text-red-400 px-3 py-1.5 rounded-full font-medium">
            {contacts?.length ? "Manage" : "Add"}
          </span>
        </button>

        {/* Permission status row */}
        <div className="bg-[#1E1B3A] border border-[#302B57] rounded-2xl p-4 mb-6">
          <p className="text-xs text-[#A79DE0] mb-2">Monitoring readiness</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className={permissions.location ? "text-green-400" : "text-[#7B72A8]"}>
                {permissions.location ? "✓" : "○"}
              </span>
              <span className="text-xs text-[#F4F2FF]">Location</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={permissions.microphone ? "text-green-400" : "text-[#7B72A8]"}>
                {permissions.microphone ? "✓" : "○"}
              </span>
              <span className="text-xs text-[#F4F2FF]">Mic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={permissions.motion ? "text-green-400" : "text-[#7B72A8]"}>
                {permissions.motion ? "✓" : "○"}
              </span>
              <span className="text-xs text-[#F4F2FF]">Motion</span>
            </div>
          </div>
          {!(permissions.location && permissions.microphone && permissions.motion) && (
            <button
              onClick={() => navigate("/onboarding/permissions")}
              className="text-xs text-red-400 font-medium mt-2"
            >
              Fix permissions →
            </button>
          )}
        </div>

        {/* Main CTA - pushed toward center/bottom for thumb reach */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <button
            onClick={() => {
              startTrip();
              navigate("/commute/mode-select");
            }}
            className="w-44 h-44 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-2xl shadow-red-600/40 flex flex-col items-center justify-center active:scale-95 transition"
          >
            <span className="text-3xl mb-1">🚨</span>
            <span className="font-bold text-sm">Start Commute</span>
          </button>
          <p className="text-xs text-[#A79DE0] mt-4 text-center px-6">
            We'll silently monitor your safety until you're home
          </p>

          {/* Emergency call shortcut */}
          <a
            href="tel:100"
            className="mt-5 text-xs bg-[#1E1B3A] border border-[#302B57] text-[#F4F2FF] px-4 py-2 rounded-full font-medium flex items-center gap-1.5"
          >
            📞 Call Police (100)
          </a>
        </div>

        {/* Recent trips */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-[#A79DE0]">Recent trips</p>
            {trips.length > 0 && (
              <button
                onClick={() => navigate("/trips")}
                className="text-xs text-red-400 font-medium"
              >
                See all
              </button>
            )}
          </div>

          {trips.length === 0 ? (
            <div className="bg-[#1E1B3A] border border-[#302B57] rounded-xl p-3 text-sm text-[#7B72A8]">
              No trips yet
            </div>
          ) : (
            <div className="space-y-2">
              {trips.slice(0, 5).map((trip) => (
                <div
                  key={trip.id}
                  className="bg-[#1E1B3A] border border-[#302B57] rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
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
                  </div>

                  {trip.status === "ongoing" && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full font-medium">
                      Ongoing
                    </span>
                  )}
                  {trip.status === "sos" && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-medium">
                      SOS Triggered
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}