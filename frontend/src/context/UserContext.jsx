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

  // --- Permission requests (used by Permissions setup screen AND Home) ---
  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => setPermissions((p) => ({ ...p, location: true })),
      () => setPermissions((p) => ({ ...p, location: false }))
    );
  };

  const requestMic = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setPermissions((p) => ({ ...p, microphone: true })))
      .catch(() => setPermissions((p) => ({ ...p, microphone: false })));
  };

  const requestMotion = () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((result) =>
          setPermissions((p) => ({ ...p, motion: result === "granted" }))
        )
        .catch(() => setPermissions((p) => ({ ...p, motion: false })));
    } else {
      setPermissions((p) => ({ ...p, motion: true }));
    }
  };

  // --- Trips ---
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
        requestLocation,
        requestMic,
        requestMotion,
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