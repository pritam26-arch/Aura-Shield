import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Settings() {
  const navigate = useNavigate();
  const { setContacts } = useUser();

  const handleLogout = () => {
    setContacts([]);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#12102A] text-[#F4F2FF] flex justify-center">
      <div className="w-full max-w-sm px-5 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate("/home")}
            className="text-[#A79DE0] text-xl"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/settings/contacts")}
            className="w-full p-4 bg-[#1E1B3A] border border-[#302B57] active:bg-[#252048] rounded-xl text-left flex items-center justify-between"
          >
            <span className="text-sm font-medium">Edit Emergency Contacts</span>
            <span className="text-[#A79DE0]">›</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full p-4 bg-[#1E1B3A] border border-[#302B57] active:bg-[#252048] rounded-xl text-left text-red-400 text-sm font-medium"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}