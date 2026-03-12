import React from 'react';

export default function CarrierReviewsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">My Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm text-center">
          <div className="text-6xl font-[900] text-yellow-500 mb-2">4.9</div>
          <div className="flex justify-center text-yellow-400 text-2xl mb-2">★★★★★</div>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Lifetime Rating (142)</div>
        </div>
        <div className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-center space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-4">
              <div className="text-sm font-bold text-gray-400 w-8">{star} ★</div>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400" style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '2%' }}></div>
              </div>
              <div className="text-sm font-bold text-gray-500 w-8 text-right">
                {star === 5 ? '120' : star === 4 ? '15' : star === 3 ? '4' : star === 2 ? '2' : '1'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 space-y-6">
        <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-4">Recent Feedback</h2>

        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-yellow-400 text-sm tracking-widest">★★★★★</div>
                <span className="font-[900] text-gray-900">Sarah Jenkins</span>
              </div>
              <span className="text-sm font-bold text-gray-400 uppercase">Oct 10, 2026</span>
            </div>
            <p className="text-gray-600 font-medium mb-3">
              "Excellent communication and extremely fast delivery! The driver was very professional and took great care of our antique furniture. Highly recommend Cooper Motors!"
            </p>
            <div className="bg-gray-50 rounded-xl p-3 text-sm flex gap-4">
              <span className="font-bold text-gray-500 uppercase tracking-widest">Shipment:</span>
              <span className="text-gray-900 font-bold">Antique Dining Set (Dallas to Austin)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
