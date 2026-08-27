import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Design intent: this is a night-commute safety app, so the login screen
// borrows from that world — deep dusk-indigo background, a soft violet
// "streetlight glow" accent, calm rounded type. Nothing alarming here —
// red/strobe is reserved entirely for the SOS state later in the flow,
// so this screen should feel the opposite: quiet, trustworthy, unhurried.

export default function Login() {
  const [role, setRole] = useState('user'); // 'user' | 'admin'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Hackathon note: swap this for a real API call once backend auth is ready.
    // For now this just simulates a short auth delay so the loading state
    // is visible on stage.
    await new Promise((res) => setTimeout(res, 500));

    localStorage.setItem('role', role);
    setLoading(false);

    navigate(role === 'user' ? '/home' : '/dashboard/feed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#12102A] px-6 relative overflow-hidden">
      {/* ambient glow, purely decorative */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-[#8B7FD4] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#4C46A0] opacity-25 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#F4F2FF]">
            Aura-Sheild
          </h1>
          <p className="mt-1 text-sm text-[#A9A3D9]">
            Someone's always got your back.
          </p>
        </div>

        {/* Role toggle */}
        <div
          role="tablist"
          aria-label="Login as"
          className="mb-6 grid grid-cols-2 rounded-xl bg-[#1D1A3F] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={role === 'user'}
            onClick={() => setRole('user')}
            className={`rounded-lg py-2 text-sm font-medium transition-colors ${
              role === 'user'
                ? 'bg-[#8B7FD4] text-[#12102A]'
                : 'text-[#A9A3D9] hover:text-[#F4F2FF]'
            }`}
          >
            User
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={role === 'admin'}
            onClick={() => setRole('admin')}
            className={`rounded-lg py-2 text-sm font-medium transition-colors ${
              role === 'admin'
                ? 'bg-[#8B7FD4] text-[#12102A]'
                : 'text-[#A9A3D9] hover:text-[#F4F2FF]'
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="identifier"
              className="mb-1 block text-xs font-medium text-[#A9A3D9]"
            >
              {role === 'user' ? 'Phone or email' : 'Admin ID or email'}
            </label>
            <input
              id="identifier"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full rounded-lg border border-[#332F63] bg-[#1D1A3F] px-3 py-2.5 text-[#F4F2FF] placeholder-[#5B558F] outline-none focus:border-[#8B7FD4] focus:ring-1 focus:ring-[#8B7FD4]"
              placeholder={role === 'user' ? 'you@example.com' : 'admin@example.com'}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium text-[#A9A3D9]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-[#332F63] bg-[#1D1A3F] px-3 py-2.5 text-[#F4F2FF] placeholder-[#5B558F] outline-none focus:border-[#8B7FD4] focus:ring-1 focus:ring-[#8B7FD4]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#8B7FD4] py-2.5 text-sm font-semibold text-[#12102A] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : `Log in as ${role === 'user' ? 'User' : 'Admin'}`}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#5B558F]">
          New here?{' '}
          <Link to="/signup" className="text-[#A9A3D9] hover:text-[#F4F2FF]">
            Set up your safety profile
          </Link>
        </p>
      </div>
    </div>
  );
}