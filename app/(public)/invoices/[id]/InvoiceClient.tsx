'use client';

import React from 'react';

export default function InvoiceClient({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen bg-gray-50 py-12 print:bg-white print:py-0">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto px-6">

                <div className="flex justify-between items-center mb-8 print:hidden">
                    <button className="text-gray-500 hover:text-gray-900 font-bold uppercase tracking-widest text-sm transition-colors">
                        ← Back
                    </button>
                    <button
                        className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-2.5 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2"
                        // @ts-ignore
                        onClick={() => window.print()}
                    >
                        <span>🖨️</span> Print Invoice
                    </button>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 lg:p-16 print:shadow-none print:border-0 print:p-0">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-gray-100 pb-12 mb-12 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white text-lg">📦</span>
                                </div>
                                <span className="text-2xl font-[1000] tracking-tight text-gray-900 uppercase mt-1">pickItUp</span>
                            </div>
                            <p className="text-gray-500 font-medium">124 Logistics Blvd.</p>
                            <p className="text-gray-500 font-medium">Austin, TX 78744</p>
                            <p className="text-gray-500 font-medium">support@pickitup.com</p>
                        </div>

                        <div className="md:text-right">
                            <h1 className="text-4xl font-[900] text-gray-200 uppercase tracking-tight mb-2">Invoice</h1>
                            <p className="text-gray-900 font-[900] text-xl mb-1">INV-{params.id || '984210'}</p>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-4">Issued: Oct 12, 2026</p>
                            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                Paid in Full
                            </span>
                        </div>
                    </div>

                    {/* Bill To */}
                    <div className="mb-12">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Billed To</h3>
                        <p className="text-gray-900 font-[900] text-lg">John Doe</p>
                        <p className="text-gray-500 font-medium">456 Receiver Lane</p>
                        <p className="text-gray-500 font-medium">Miami, FL 33101</p>
                        <p className="text-gray-500 font-medium">john.doe@example.com</p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto mb-12">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-gray-900">
                                    <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                                    <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Qty</th>
                                    <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="py-6">
                                        <div className="font-[900] text-gray-900">Transport: 2019 Tesla Model 3</div>
                                        <div className="text-gray-500 text-sm mt-1">Austin, TX to Miami, FL (via Pro Haulers LLC)</div>
                                    </td>
                                    <td className="py-6 text-center font-medium">1</td>
                                    <td className="py-6 text-right font-[900] text-gray-900">$850.00</td>
                                </tr>
                                <tr>
                                    <td className="py-6">
                                        <div className="font-[900] text-gray-900">pickItUp Service Fee</div>
                                        <div className="text-gray-500 text-sm mt-1">Platform and Escrow processing</div>
                                    </td>
                                    <td className="py-6 text-center font-medium">1</td>
                                    <td className="py-6 text-right font-[900] text-gray-900">$85.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-full md:w-1/2 max-w-sm space-y-4">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Subtotal</span>
                                <span>$935.00</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-medium border-b border-gray-100 pb-4">
                                <span>Tax (0%)</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between text-gray-900 text-2xl font-[900]">
                                <span>Total</span>
                                <span>$935.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-24 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm font-medium">
                        Thank you for using pickItUp! For any questions regarding this invoice, please contact support.
                    </div>
                </div>
            </div>
        </div>
    );
}
