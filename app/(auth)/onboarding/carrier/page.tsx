'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CarrierOnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="absolute top-8 right-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
        Step {step} of 3
      </div>

      <div className="text-left mb-8">
        <h1 className="text-4xl font-[900] text-gray-900 tracking-tight uppercase mb-2">Carrier Setup</h1>
        <p className="text-gray-500 text-lg font-medium">
          {step === 1 ? 'Enter your legal operating authority details.' :
            step === 2 ? 'Tell us about your active fleet and capacity.' :
              'Provide your insurance information for verification.'}
        </p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) setStep(step + 1);
          else window.location.href = '/carrier/dashboard';
        }}
      >
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                DOT Number
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium"
                placeholder="US DOT #"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                MC Number (Optional)
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium"
                placeholder="Motor Carrier #"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Primary Equipment Type
              </label>
              <select className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium bg-white">
                <option>Enclosed Trailer</option>
                <option>Open Flatbed</option>
                <option>Auto Carrier</option>
                <option>Box Truck</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Fleet Size
              </label>
              <select className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium bg-white">
                <option>1-5 Trucks (Independent)</option>
                <option>6-20 Trucks</option>
                <option>21+ Trucks</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Insurance Provider
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium"
                placeholder="e.g. Progressive"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Cargo Coverage Limit
              </label>
              <select className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium bg-white">
                <option>$100,000</option>
                <option>$250,000</option>
                <option>$500,000+</option>
              </select>
            </div>
          </div>
        )}

        <div className="pt-4 flex gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="w-1/3 py-4 px-4 border-2 border-gray-200 rounded-xl text-lg font-bold text-gray-600 bg-transparent hover:bg-gray-50 transition-all uppercase tracking-wide"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all uppercase tracking-wide"
          >
            {step < 3 ? 'Continue' : 'Submit for Verification'}
          </button>
        </div>
      </form>
    </div>
  );
}
