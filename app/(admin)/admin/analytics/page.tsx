import React from 'react';

export default function AdminAnalyticsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">Platform Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 h-96 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Revenue Growth</h2>
            <select className="bg-gray-50 border border-gray-200 font-bold text-sm uppercase px-4 py-2 rounded-xl">
              <option>Last 30 Days</option>
              <option>YTD 2026</option>
            </select>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
            {/* Mock Bar Chart using div heights */}
            <div className="flex items-end justify-between w-full h-full p-8 gap-4 relative z-10">
              {[40, 60, 45, 80, 70, 95, 85].map((height, i) => (
                <div key={i} className="w-1/6 bg-gradient-to-t from-gray-900 to-gray-700 rounded-t-xl group relative hover:from-purple-600 hover:to-purple-500 transition-colors cursor-pointer" style={{ height: `${height}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${height * 12}k
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 uppercase">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Users Chart Placeholder */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 h-96 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">User Acquisition</h2>
            <select className="bg-gray-50 border border-gray-200 font-bold text-sm uppercase px-4 py-2 rounded-xl">
              <option>Last 30 Days</option>
              <option>YTD 2026</option>
            </select>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="flex items-center justify-center w-full h-full p-8 relative z-10 gap-12">
              <div className="relative w-48 h-48">
                {/* SVG Donut Chart Mockup */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="20" />
                  {/* Shippers - 65% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2D1B69" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="87.92" className="transition-all duration-1000 ease-out" />
                  {/* Carriers - 35% */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FBBF24" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="163.28" className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-[900] text-gray-900 tracking-tighter">12.4k</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#2D1B69]"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Shippers</div>
                    <div className="text-xs text-gray-500 font-medium">65% (8,060)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#FBBF24]"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Carriers</div>
                    <div className="text-xs text-gray-500 font-medium">35% (4,340)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide mb-6">Top Performing Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Vehicles & Auto', 'Heavy Equipment', 'Home & Furniture'].map((cat, i) => (
            <div key={i} className="border border-gray-100 bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{i === 0 ? '🚗' : i === 1 ? '🚜' : '🛋️'}</div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">+1{i * 2}%</span>
              </div>
              <div className="font-[900] text-gray-900 uppercase tracking-wide">{cat}</div>
              <div className="text-sm text-gray-500 font-bold mt-1">{1240 - (i * 200)} Bookings</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
