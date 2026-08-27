import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Permissions() {
  const navigate = useNavigate();
  const { permissions: status, setPermissions: setStatus } = useUser();

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => setStatus((s) => ({ ...s, location: true })),
      () => setStatus((s) => ({ ...s, location: false }))
    );
  };

  const requestMic = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setStatus((s) => ({ ...s, microphone: true })))
      .catch(() => setStatus((s) => ({ ...s, microphone: false })));
  };

  const requestMotion = () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((result) =>
          setStatus((s) => ({ ...s, motion: result === "granted" }))
        )
        .catch(() => setStatus((s) => ({ ...s, motion: false })));
    } else {
      setStatus((s) => ({ ...s, motion: true }));
    }
  };

  const allGranted = status.location && status.microphone && status.motion;

  const permissionRows = [
    { key: "location", label: "Location", desc: "So we know where you are during an SOS", action: requestLocation },
    { key: "microphone", label: "Microphone", desc: "To detect screams or threats", action: requestMic },
    { key: "motion", label: "Motion Sensor", desc: "To detect if your phone is dropped", action: requestMotion },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center">
      <div className="w-full max-w-sm px-5 py-8">
        <h1 className="text-xl font-bold mb-1">Enable Permissions</h1>
        <p className="text-sm text-slate-400 mb-6">
          Aura-Shield needs these to protect you.
        </p>

        <div className="space-y-3">
          {permissionRows.map((row) => (
            <div
              key={row.key}
              className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl flex items-center justify-between"
            >
              <div className="pr-3">
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-xs text-slate-400">{row.desc}</p>
              </div>
              {status[row.key] ? (
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
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
          }`}
        >
          {allGranted ? "Continue to App" : "Allow all to continue"}
        </button>
      </div>
    </div>
  );
}

export default Permissions;