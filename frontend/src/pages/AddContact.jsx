import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AddContact() {
  const navigate = useNavigate();
  const { contacts, setContacts } = useUser();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setContacts([...contacts, { name, phone }]);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#12102A] text-[#F4F2FF] flex justify-center">
      <div className="w-full max-w-sm px-5 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/home")} className="text-[#A79DE0] text-xl">
            ←
          </button>
          <h1 className="text-xl font-bold">Add Emergency Contact</h1>
        </div>

        <div className="p-3 bg-[#1E1B3A] border border-[#302B57] rounded-xl mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 mb-2 text-sm rounded-lg bg-[#252048] text-white placeholder-[#7B72A8] outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2.5 text-sm rounded-lg bg-[#252048] text-white placeholder-[#7B72A8] outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

        <button
          onClick={handleAdd}
          className="w-full p-3.5 text-sm bg-red-600 active:bg-red-700 rounded-full font-semibold"
        >
          Add Contact
        </button>
      </div>
    </div>
  );
}