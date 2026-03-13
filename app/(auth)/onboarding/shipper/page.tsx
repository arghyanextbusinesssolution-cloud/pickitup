'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ShipperOnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="absolute top-8 right-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
        Step {step} of 2
      </div>

      <div className="text-left mb-8">
        <h1 className="text-4xl font-[900] text-gray-900 tracking-tight uppercase mb-2">Welcome to pickitup</h1>
        <p className="text-gray-500 text-lg font-medium">
          Let's complete your profile so you can start receiving competitive bids.
        </p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 1) setStep(2);
          else window.location.href = '/shipper/dashboard';
        }}
      >
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Phone Number
              </label>
              <input
                type="tel"
                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium"
                placeholder="(555) 555-5555"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Default Pickup City
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium"
                placeholder="e.g. Austin, TX"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                What do you usually ship?
              </label>
              <select className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium bg-white">
                <option>Vehicles & Equipment</option>
                <option>Home & Furniture</option>
                <option>LTL Freight</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Company Name (Optional)
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium"
                placeholder="Business shippers only"
              />
            </div>
          </div>
        )}

        <div className="pt-4 flex gap-4">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 py-4 px-4 border-2 border-gray-200 rounded-xl text-lg font-bold text-gray-600 bg-transparent hover:bg-gray-50 transition-all uppercase tracking-wide"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-all uppercase tracking-wide"
          >
            {step === 1 ? 'Continue' : 'Complete Setup'}
          </button>
        </div>
      </form>
    </div>
  );
}
