import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Permissions from './pages/Permissions.jsx';
import Settings from './pages/Settings.jsx';
import SettingsContacts from './pages/SettingsContacts.jsx';
import AddContact from './pages/AddContact.jsx';
import TripHistory from './pages/TripHistory.jsx';
import TripDetail from './pages/TripDetail.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/onboarding/permissions" element={<Permissions />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/contacts" element={<SettingsContacts />} />
      <Route path="/contacts/add" element={<AddContact />} />
      <Route path="/trips" element={<TripHistory />} />
      <Route path="/trips/:id" element={<TripDetail />} />
    </Routes>
  );
}

export default App;