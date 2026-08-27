import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Onboarding() {
  const navigate = useNavigate();
  const { setContacts: saveContacts } = useUser();
  const [contacts, setContacts] = useState([
    { name: "", phone: "" },
    { name: "", phone: "" },
    { name: "", phone: "" },
  ]);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const handleNext = () => {       
    const allFilled = contacts.every(
      (c) => c.name.trim() !== "" && c.phone.trim() !== ""
    );

    if (!allFilled) {
      setError("Please fill in all 3 contacts before continuing.");
      return;
    }

    setError("");
    saveContacts(contacts);
    navigate("/onboarding/permissions");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center">
      <div className="w-full max-w-sm px-5 py-8">
        <h1 className="text-xl font-bold mb-1">Add Emergency Contacts</h1>
        <p className="text-sm text-slate-400 mb-6">
          These 3 people get alerted if you trigger an SOS.
        </p>

        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl"
            >
              <p className="text-xs font-medium text-slate-400 mb-2">
                Contact {index + 1}
              </p>
              <input
                type="text"
                placeholder="Name"
                value={contact.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full p-2.5 mb-2 text-sm rounded-lg bg-slate-700/70 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={contact.phone}
                onChange={(e) => handleChange(index, "phone", e.target.value)}
                className="w-full p-2.5 text-sm rounded-lg bg-slate-700/70 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-xs mt-3">{error}</p>
        )}

        <button
          onClick={handleNext}
          className="w-full mt-6 p-3.5 text-sm bg-red-600 active:bg-red-700 rounded-full font-semibold shadow-lg shadow-red-600/30 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Onboarding;