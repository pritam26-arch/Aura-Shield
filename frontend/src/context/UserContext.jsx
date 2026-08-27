import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [permissions, setPermissions] = useState({
    location: false,
    microphone: false,
    motion: false,
  });
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);

  const startTrip = () => {
    const trip = {
      id: Date.now(),
      startTime: new Date(),
      endTime: null,
      status: "ongoing", // "ongoing" | "completed" | "sos"
    };
    setCurrentTrip(trip);
    setTrips((prev) => [trip, ...prev]);
  };

  const endTrip = () => {
    if (!currentTrip) return;
    updateTripStatus(currentTrip.id, "completed");
    setCurrentTrip(null);
  };

  const triggerSOS = () => {
    if (!currentTrip) return;
    updateTripStatus(currentTrip.id, "sos");
  };

  const updateTripStatus = (id, status) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status, endTime: new Date() } : t
      )
    );
  };

  const deleteTrip = (id) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  const deleteAllTrips = () => {
    setTrips([]);
  };

  return (
    <UserContext.Provider
      value={{
        contacts,
        setContacts,
        permissions,
        setPermissions,
        trips,
        currentTrip,
        startTrip,
        endTrip,
        triggerSOS,
        deleteTrip,
        deleteAllTrips,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}