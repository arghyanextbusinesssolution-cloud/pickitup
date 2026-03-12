import React from 'react';

export default function AdminSettingsPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">System Configuration</h1>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-8 lg:p-12 border-b border-gray-100">
                    <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide mb-6">Platform Fees & Rules</h2>
                    <form className="space-y-6 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Standard Booking Fee (%)</label>
                                <input type="number" defaultValue="10.0" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-red-500 sm:text-lg transition-colors font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Escrow Release Delay (Days)</label>
                                <input type="number" defaultValue="3" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-red-500 sm:text-lg transition-colors font-medium" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="auto_approve" className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-600" defaultChecked />
                            <label htmlFor="auto_approve" className="font-bold text-gray-700">Auto-approve Carrier verify applications (Not recommended)</label>
                        </div>

                        <button type="button" className="bg-gray-900 hover:bg-black text-white font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide">
                            Apply Core Settings
                        </button>
                    </form>
                </div>

                <div className="p-8 lg:p-12 bg-red-50">
                    <h2 className="text-xl font-[900] text-red-900 uppercase tracking-wide mb-2">Emergency Protocols</h2>
                    <p className="text-red-700 font-medium mb-6">These actions affect the entire marketplace immediately. Use with extreme caution.</p>
                    <div className="flex flex-wrap gap-4">
                        <button type="button" className="bg-white border-2 border-red-200 hover:bg-red-100 text-red-700 font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide shadow-sm">
                            Halt All Withdrawals
                        </button>
                        <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide shadow-sm">
                            Enable Maintenance Mode
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
