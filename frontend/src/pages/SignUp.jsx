import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Hackathon note: swap this for a real API call once backend auth is ready.
    await new Promise((res) => setTimeout(res, 500));

    localStorage.setItem('role', 'user');
    setLoading(false);

    // New users go through onboarding to add contacts + permissions
    navigate('/onboarding');
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

        <div className="mb-6 text-center">
          <h2 className="text-lg font-semibold text-[#F4F2FF]">Create your account</h2>
          <p className="mt-1 text-xs text-[#A9A3D9]">
            Takes less than a minute.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-xs font-medium text-[#A9A3D9]"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-[#332F63] bg-[#1D1A3F] px-3 py-2.5 text-[#F4F2FF] placeholder-[#5B558F] outline-none focus:border-[#8B7FD4] focus:ring-1 focus:ring-[#8B7FD4]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="identifier"
              className="mb-1 block text-xs font-medium text-[#A9A3D9]"
            >
              Phone or email
            </label>
            <input
              id="identifier"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full rounded-lg border border-[#332F63] bg-[#1D1A3F] px-3 py-2.5 text-[#F4F2FF] placeholder-[#5B558F] outline-none focus:border-[#8B7FD4] focus:ring-1 focus:ring-[#8B7FD4]"
              placeholder="you@example.com"
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
              autoComplete="new-password"
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
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#5B558F]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#A9A3D9] hover:text-[#F4F2FF]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}