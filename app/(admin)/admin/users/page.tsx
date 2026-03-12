import React from 'react';

export default function UsersManagementPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">User Management</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            className="bg-white border-2 border-gray-200 px-6 py-3 rounded-xl transition-all font-medium min-w-[300px]"
          />
          <button className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2 shadow-sm">
            Search
          </button>
          <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
            <span>⚙️</span> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">User Details</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Metrics</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-gray-500">
                        U{i}
                      </div>
                      <div>
                        <div className="font-[900] text-gray-900 text-lg mb-0.5">{i % 2 === 0 ? 'Cooper Motors LLC' : 'Sarah Jenkins'}</div>
                        <div className="text-sm font-bold text-gray-400 text-xs tracking-widest">user_{10482 + i}@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${i % 2 === 0 ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                      {i % 2 === 0 ? 'Carrier' : 'Shipper'}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-bold text-gray-900">
                      {i % 2 === 0 ? '142 Jobs • 4.9 ★' : '12 Listed • $4k Spent'}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${i === 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${i === 5 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                      {i === 5 ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-gray-500 uppercase tracking-widest">
          <button className="hover:text-gray-900 transition-colors">← Previous</button>
          <span>Page 1 of 420</span>
          <button className="hover:text-gray-900 transition-colors">Next →</button>
        </div>
      </div>
    </div>
  );
}
