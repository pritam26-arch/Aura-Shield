import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Permissions from './pages/Permissions.jsx';
import Home from './pages/Home.jsx';
import Settings from './pages/Settings.jsx';
import SettingsContacts from './pages/SettingsContacts.jsx';
import AddContact from './pages/AddContact.jsx';
import TripHistory from './pages/TripHistory.jsx';
import TripDetail from './pages/TripDetail.jsx';
import CommuteSetup from './pages/CommuteSetup.jsx';
import CommuteActive from './pages/CommuteActive.jsx';
import AlertFeed from './pages/dashboard/AlertFeed.jsx';
import PoliceDashboard from './pages/PoliceDashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding/permissions" element={<Permissions />} />
      <Route path="/permissions" element={<Permissions />} />
      <Route path="/home" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/contacts" element={<SettingsContacts />} />
      <Route path="/contacts/add" element={<AddContact />} />
      <Route path="/trips" element={<TripHistory />} />
      <Route path="/trips/:id" element={<TripDetail />} />
      <Route path="/commute/setup" element={<CommuteSetup />} />
      <Route path="/commute/active" element={<CommuteActive />} />
      <Route path="/dashboard/feed" element={<AlertFeed />} />
      <Route path="/police" element={<PoliceDashboard />} />
    </Routes>
  );
}

export default App;