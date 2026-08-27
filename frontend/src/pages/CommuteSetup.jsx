import { useNavigate } from 'react-router-dom';

export default function CommuteSetup() {
  const navigate = useNavigate();

  const startCommute = (mode) => {
    localStorage.setItem('commuteMode', mode);
    navigate('/commute/active');
  };

  return (
    <div className="min-h-screen bg-[#12102A] text-[#F4F2FF] flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-semibold mb-2">Start your commute</h1>
      <p className="text-sm text-[#A9A3D9] mb-8">Choose how the screen should look while you're being watched over.</p>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => startCommute('fakeCall')}
          className="w-full rounded-xl border border-[#332F63] bg-[#1D1A3F] p-5 text-left hover:border-[#8B7FD4] transition-colors"
        >
          <div className="font-semibold mb-1">Fake Video Call</div>
          <div className="text-xs text-[#A9A3D9]">Screen shows a looping video call, like you're talking to someone.</div>
        </button>

        <button
          onClick={() => startCommute('stealth')}
          className="w-full rounded-xl border border-[#332F63] bg-[#1D1A3F] p-5 text-left hover:border-[#8B7FD4] transition-colors"
        >
          <div className="font-semibold mb-1">Stealth Mode</div>
          <div className="text-xs text-[#A9A3D9]">Screen goes black, looks like your phone is locked.</div>
        </button>
      </div>
    </div>
  );
}