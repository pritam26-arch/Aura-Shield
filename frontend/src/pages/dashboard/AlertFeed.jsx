import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { socket } from '../../services/socket.js';

// Fix for default marker icons not loading correctly with bundlers like Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function AlertFeed() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const handleNewAlert = (data) => {
      setAlerts((prev) => [
        { ...data, receivedAt: new Date().toLocaleTimeString() },
        ...prev,
      ]);
    };

    socket.on('receive_alert', handleNewAlert);
    return () => socket.off('receive_alert', handleNewAlert);
  }, []);

  const latestAlert = alerts[0];

  return (
    <div className="min-h-screen bg-[#0B0A1F] text-[#F4F2FF] p-8">
      <h1 className="text-2xl font-semibold mb-1">Responder Dashboard</h1>
      <p className="text-sm text-[#A9A3D9] mb-6">
        {alerts.length === 0
          ? 'No active alerts yet.'
          : `${alerts.length} alert${alerts.length > 1 ? 's' : ''} received.`}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: alert list */}
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div
              key={alert.alertId || i}
              className="rounded-xl border border-red-500/40 bg-red-950/30 p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-red-400">🚨 SOS — {alert.triggerType}</span>
                <span className="text-xs text-[#A9A3D9]">{alert.receivedAt}</span>
              </div>
              <div className="text-xs text-[#A9A3D9]">
                Location: {alert.location?.lat?.toFixed(4)}, {alert.location?.lng?.toFixed(4)}
              </div>
            </div>
          ))}
        </div>

        {/* Right: live map */}
        <div className="rounded-xl overflow-hidden border border-[#332F63] h-[400px]">
          {latestAlert ? (
            <MapContainer
              center={[latestAlert.location.lat, latestAlert.location.lng]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={[latestAlert.location.lat, latestAlert.location.lng]}>
                <Popup>
                  Latest SOS — {latestAlert.receivedAt}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-[#5B558F]">
              Map will appear when an alert comes in.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}