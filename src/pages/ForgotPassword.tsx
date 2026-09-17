import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-0">
      <h1 className="font-display text-3xl font-semibold text-ink">Reset your password</h1>
      <p className="mt-2 text-inksoft">
        This is a UI-only  flow. No email is actually sent, since SanskritiX doesn't yet have a real authentication
        backend.
      </p>

      {sent ? (
        <div className="mt-8 rounded-2xl border border-stoneline bg-white p-6">
          <p className="font-semibold text-ink">If an account exists for {email}, reset instructions would be sent.</p>
          <p className="mt-2 text-sm text-inksoft">In this , no message is actually delivered.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="forgot-email" className="mb-1 block text-sm font-semibold text-ink">Email</label>
            <input
              id="forgot-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder"
            />
          </div>
          <button type="submit" className="w-full rounded-full bg-madder px-6 py-3 text-sm font-semibold text-white hover:bg-madderdark">
            Send reset instructions
          </button>
        </form>
      )}

      <Link to="/login" className="mt-6 text-center text-sm font-semibold text-madder hover:underline">
        Back to log in
      </Link>
    </div>
  );
}
