'use client';

import React from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
      <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-sm">
        ✉️
      </div>

      <h1 className="text-4xl font-[900] text-gray-900 tracking-tight uppercase mb-4">Verify Your Email</h1>
      <p className="text-gray-500 text-lg font-medium mb-10 max-w-sm mx-auto">
        We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
      </p>

      <div className="space-y-4">
        <button className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-all uppercase tracking-wide">
          Resend Verification Email
        </button>

        <Link
          href="/login"
          className="w-full flex justify-center py-4 px-4 border-2 border-gray-200 rounded-xl text-lg font-bold text-gray-600 bg-transparent hover:bg-gray-50 transition-all uppercase tracking-wide"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
