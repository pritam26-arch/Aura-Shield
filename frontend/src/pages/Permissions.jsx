import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Permissions() {
  const navigate = useNavigate();
  const { permissions, requestLocation, requestMic, requestMotion } = useUser();

  const allGranted = permissions.location && permissions.microphone && permissions.motion;

  const rows = [
    { key: "location", label: "Location", desc: "So we know where you are during an SOS", action: requestLocation },
    { key: "microphone", label: "Microphone", desc: "To detect screams or threats", action: requestMic },
    { key: "motion", label: "Motion Sensor", desc: "To detect if your phone is dropped", action: requestMotion },
  ];

  return (
    <div className="min-h-screen bg-[#12102A] text-[#F4F2FF] flex justify-center">
      <div className="w-full max-w-sm px-5 py-8">
        <h1 className="text-xl font-bold mb-1">Enable Permissions</h1>
        <p className="text-sm text-[#A79DE0] mb-6">
          Aura-Shield needs these to protect you.
        </p>

        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.key}
              className="p-3 bg-[#1E1B3A] border border-[#302B57] rounded-xl flex items-center justify-between"
            >
              <div className="pr-3">
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-xs text-[#A79DE0]">{row.desc}</p>
              </div>
              {permissions[row.key] ? (
                <span className="text-green-400 text-xs font-semibold">✓ Granted</span>
              ) : (
                <button
                  onClick={row.action}
                  className="text-xs bg-red-600 active:bg-red-700 px-3 py-2 rounded-full font-semibold whitespace-nowrap"
                >
                  Allow
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/home")}
          disabled={!allGranted}
          className={`w-full mt-6 p-3.5 text-sm rounded-full font-semibold shadow-lg transition ${
            allGranted
              ? "bg-red-600 active:bg-red-700 shadow-red-600/30"
              : "bg-[#302B57] text-[#7B72A8] cursor-not-allowed"
          }`}
        >
          {allGranted ? "Continue to App" : "Allow all to continue"}
        </button>
      </div>
    </div>
  );
}