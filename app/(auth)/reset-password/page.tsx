'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-left mb-8">
        <h1 className="text-4xl font-[900] text-gray-900 tracking-tight uppercase mb-2">Create New Password</h1>
        <p className="text-gray-500 text-lg font-medium">
          {status === 'idle'
            ? "Please enter your new password below."
            : "Your password has been successfully reset! You can now log in with your new credentials."}
        </p>
      </div>

      {status === 'idle' && (
        <form
          className="space-y-6"
          onSubmit={(e) => { e.preventDefault(); setStatus('success'); }}
        >
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
              New Password
            </label>
            <input
              type="password"
              className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
              Confirm New Password
            </label>
            <input
              type="password"
              className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all uppercase tracking-wide"
          >
            Update Password
          </button>
        </form>
      )}

      {status === 'success' && (
        <Link
          href="/login"
          className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg text-lg font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-all uppercase tracking-wide"
        >
          Continue to Login
        </Link>
      )}
    </div>
  );
}
