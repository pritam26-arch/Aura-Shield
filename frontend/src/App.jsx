<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Permissions from "./pages/Permissions.jsx";
import Settings from "./pages/Settings.jsx";
import SettingsContacts from "./pages/SettingsContacts.jsx";
import AddContact from "./pages/AddContact.jsx";
import TripHistory from "./pages/TripHistory.jsx";
import TripDetail from "./pages/TripDetail.jsx";
=======
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import PoliceDashboard from './pages/PoliceDashboard.jsx';
>>>>>>> 784174d860dca508d324f1a4b3b7c873bdf4339c

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
<<<<<<< HEAD
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding/permissions" element={<Permissions />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/contacts" element={<SettingsContacts />} />
      <Route path="/contacts/add" element={<AddContact />} />
      <Route path="/trips" element={<TripHistory />} />
      <Route path="/trips/:id" element={<TripDetail />} />
=======
      <Route path="/police" element={<PoliceDashboard />} />
>>>>>>> 784174d860dca508d324f1a4b3b7c873bdf4339c
    </Routes>
  );
}

export default App;
