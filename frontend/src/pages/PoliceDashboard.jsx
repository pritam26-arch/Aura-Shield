import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Backend server URL
const SOCKET_URL = 'http://localhost:5000'; 

const PoliceDashboard = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Establish socket connection
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Listen for incoming SOS alerts from backend
    newSocket.on('receive_alert', (data) => {
      const newAlert = {
        id: Date.now(),
        userId: data.userId || 'Unknown User',
        lat: data.lat,
        lng: data.lng,
        time: new Date().toLocaleTimeString(),
        status: 'Active'
      };
      setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
    });

    return () => newSocket.disconnect();
  }, []);

  const handleDispatch = (id) => {
    setAlerts(alerts.map(alert => alert.id === id ? { ...alert, status: 'Dispatched 🚓' } : alert));
  };

  const handleResolve = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-red-500">🚨 Aura-Shield Police Command Center</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isConnected ? 'bg-green-600' : 'bg-red-600'}`}>
            {isConnected ? 'Live & Monitoring' : 'Disconnected'}
          </span>
        </header>

        {/* Alert List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-300">Active Emergency Alerts</h2>
          
          {alerts.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg text-gray-400 text-center">
              Waiting for emergency alerts... All systems normal.
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="bg-red-950 border border-red-600 p-5 rounded-lg shadow-lg animate-pulse">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded font-bold uppercase">
                    {alert.status}
                  </span>
                  <span className="text-sm text-gray-300">{alert.time}</span>
                </div>
                
                <p className="text-lg font-semibold mb-1">
                  User ID: <span className="text-white">{alert.userId}</span>
                </p>
                
                <p className="text-sm text-gray-300 mb-4">
                  📍 Location: {' '}
                  <a 
                    href={`https://maps.google.com/?q=${alert.lat},${alert.lng}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Open in Google Maps (Lat: {alert.lat}, Lng: {alert.lng})
                  </a>
                </p>

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDispatch(alert.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-bold transition"
                  >
                    Dispatch Unit
                  </button>
                  <button 
                    onClick={() => handleResolve(alert.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition"
                  >
                    Resolve / Close
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default PoliceDashboard;
