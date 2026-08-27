import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../services/socket.js';

export default function CommuteActive() {
  const navigate = useNavigate();
  const mode = localStorage.getItem('commuteMode') || 'stealth';
  const [sosActive, setSosActive] = useState(false);
  const tapTimestamps = useRef([]);
  const lastKnownLocation = useRef({ lat: 0, lng: 0 });

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lastKnownLocation.current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log('📍 Location cached:', lastKnownLocation.current);
      },
      (err) => console.warn('⚠️ Could not get location on load:', err.message),
      { timeout: 10000, maximumAge: 0, enableHighAccuracy: false }
    );
  }, []);

  const handleTripleTap = () => {
    const now = Date.now();
    tapTimestamps.current = [...tapTimestamps.current, now].filter(
      (t) => now - t < 800
    );
    if (tapTimestamps.current.length >= 3) {
      tapTimestamps.current = [];
      triggerSOS();
    }
  };

  const triggerSOS = () => {
    setSosActive(true);
    socket.emit('trigger_sos', {
      triggerType: 'MANUAL',
      location: lastKnownLocation.current,
    });
  };

  const pressTimer = useRef(null);
  const startPress = () => {
    pressTimer.current = setTimeout(() => navigate('/home'), 1200);
  };
  const cancelPress = () => clearTimeout(pressTimer.current);

  if (sosActive) {
    return <SOSOverlay onCancel={() => setSosActive(false)} />;
  }

  return (
    <div onClick={handleTripleTap} className="min-h-screen bg-black relative overflow-hidden">
      {mode === 'stealth' && (
        <>
          <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white opacity-[0.08]" />
          <div
            onMouseDown={startPress}
            onMouseUp={cancelPress}
            onMouseLeave={cancelPress}
            onTouchStart={startPress}
            onTouchEnd={cancelPress}
            className="absolute bottom-0 right-0 w-16 h-16"
          />
        </>
      )}

      {mode === 'fakeCall' && <FakeCallScreen />}
    </div>
  );
}

function FakeCallScreen() {
  const [callState, setCallState] = useState('ringing'); // 'ringing' | 'active'
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (callState !== 'active') return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [callState]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const answerCall = (e) => {
    e.stopPropagation(); // don't let this tap count toward the triple-tap SOS logic
    setCallState('active');
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-between py-16 relative">
      {callState === 'ringing' && (
        <audio autoPlay loop src="/ringtone.mp3" />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-b from-neutral-800 to-black flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-neutral-700 flex items-center justify-center text-5xl">
            👤
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center">
        <div className="text-white text-2xl font-medium mb-1">Rohan</div>
        <div className="text-neutral-300 text-sm">
          {callState === 'ringing' ? 'Incoming call…' : formatTime(seconds)}
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-8">
        {callState === 'ringing' ? (
          <>
            <CallIconButton icon="✖️" label="Decline" bg="bg-red-600" onClick={(e) => e.stopPropagation()} />
            <CallIconButton icon="✔️" label="Answer" bg="bg-green-600" large onClick={answerCall} />
          </>
        ) : (
          <>
            <CallIconButton icon="🔇" label="Mute" onClick={(e) => e.stopPropagation()} />
            <CallIconButton icon="📞" label="" bg="bg-red-600" large onClick={(e) => e.stopPropagation()} />
            <CallIconButton icon="🔊" label="Speaker" onClick={(e) => e.stopPropagation()} />
          </>
        )}
      </div>
    </div>
  );
}



function CallIconButton({ icon, label, bg = 'bg-neutral-700', large = false, onClick }) {
  return (
    <div className="flex flex-col items-center gap-1" onClick={onClick}>
      <div
        className={`${bg} ${large ? 'w-16 h-16' : 'w-12 h-12'} rounded-full flex items-center justify-center text-xl`}
      >
        {icon}
      </div>
      {label && <span className="text-xs text-neutral-400">{label}</span>}
    </div>
  );
}

function SOSOverlay({ onCancel }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setFlash((f) => !f), 333);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  const pressTimer = useRef(null);
  const startPress = () => {
    pressTimer.current = setTimeout(onCancel, 1000);
  };
  const cancelPress = () => clearTimeout(pressTimer.current);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative"
      style={{ backgroundColor: flash ? '#FF0000' : '#FFFFFF', transition: 'none' }}
    >
      <audio autoPlay loop src="/siren.mp3" />
      <h1 className="text-3xl font-extrabold mb-2" style={{ color: flash ? '#FFFFFF' : '#FF0000' }}>
        SOS TRIGGERED
      </h1>
      <p className="text-sm font-semibold" style={{ color: flash ? '#FFFFFF' : '#FF0000' }}>
        LIVE LOCATION SHARED WITH NEAREST POLICE KIOSK
      </p>
      <div
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
        className="absolute bottom-0 left-0 w-32 h-32"
      />
    </div>
  );
}