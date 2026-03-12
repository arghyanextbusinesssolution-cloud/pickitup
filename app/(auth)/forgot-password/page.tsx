'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/login" className="text-gray-400 hover:text-purple-600 font-medium text-sm flex items-center gap-1 mb-8 transition-colors">
        ← Back to login
      </Link>

      <div className="text-left mb-8">
        <h1 className="text-4xl font-[900] text-gray-900 tracking-tight uppercase mb-2">Reset Password</h1>
        <p className="text-gray-500 text-lg font-medium">
          {status === 'idle'
            ? "Enter your email address and we'll send you a link to reset your password."
            : "Check your inbox! We've sent password reset instructions to your email."}
        </p>
      </div>

      {status === 'idle' && (
        <form
          className="space-y-6"
          onSubmit={(e) => { e.preventDefault(); setStatus('submitted'); }}
        >
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 pb-3 pt-3 text-gray-900 focus:border-purple-600 focus:ring-0 sm:text-lg transition-colors font-medium"
              placeholder="you@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all uppercase tracking-wide"
          >
            Send Reset Link
          </button>
        </form>
      )}

      {status === 'submitted' && (
        <button
          onClick={() => setStatus('idle')}
          className="w-full flex justify-center py-4 px-4 border-2 border-purple-600 rounded-xl text-lg font-bold text-purple-600 bg-transparent hover:bg-purple-50 transition-all uppercase tracking-wide"
        >
          Try another email
        </button>
      )}
    </div>
  );
}
