import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function SettingsContacts() {
  const navigate = useNavigate();
  const { contacts, setContacts } = useUser();
  const [saved, setSaved] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
    setSaved(false);
  };

  const handleDelete = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#12102A] text-[#F4F2FF] flex justify-center">
      <div className="w-full max-w-sm px-5 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/settings")} className="text-[#A79DE0] text-xl">
            ←
          </button>
          <h1 className="text-xl font-bold">Edit Emergency Contacts</h1>
        </div>

        {contacts.length === 0 && (
          <p className="text-sm text-[#7B72A8] mb-4">
            No contacts yet. Add one from the Home screen.
          </p>
        )}

        <div className="space-y-3 mb-6">
          {contacts.map((contact, index) => (
            <div key={index} className="p-3 bg-[#1E1B3A] border border-[#302B57] rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-[#A79DE0]">Contact {index + 1}</p>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-xs text-red-400"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                placeholder="Name"
                value={contact.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full p-2.5 mb-2 text-sm rounded-lg bg-[#252048] text-white placeholder-[#7B72A8] outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={contact.phone}
                onChange={(e) => handleChange(index, "phone", e.target.value)}
                className="w-full p-2.5 text-sm rounded-lg bg-[#252048] text-white placeholder-[#7B72A8] outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}
        </div>

        {contacts.length > 0 && (
          <button
            onClick={handleSave}
            className="w-full p-3 text-sm bg-red-600 active:bg-red-700 rounded-full font-semibold"
          >
            {saved ? "Saved ✓" : "Save Changes"}
          </button>
        )}
      </div>
    </div>
  );
}