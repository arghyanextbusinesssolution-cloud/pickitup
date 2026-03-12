import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-purple-900 py-32 border-b border-purple-800 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <span className="text-sm font-[900] text-yellow-400 uppercase tracking-widest mb-6 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-[1000] tracking-tighter uppercase mb-6 leading-none">
            Driven by <span className="text-purple-400">efficiency.</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed font-medium">
            Based in Austin, Texas, pickItUp is the world's largest marketplace connecting people with large shipments to transport professionals with extra truck space.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-20 -mt-16 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-2xl p-12 grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="text-center pt-8 md:pt-0">
            <div className="text-5xl font-[1000] text-gray-900 mb-2">9M+</div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Shipments Listed</div>
          </div>
          <div className="text-center pt-8 md:pt-0">
            <div className="text-5xl font-[1000] text-purple-600 mb-2">80k+</div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Carriers</div>
          </div>
          <div className="text-center pt-8 md:pt-0">
            <div className="text-5xl font-[1000] text-yellow-400 mb-2">$1B+</div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Carrier Earnings</div>
          </div>
          <div className="text-center pt-8 md:pt-0">
            <div className="text-5xl font-[1000] text-gray-900 mb-2">150+</div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Team Members</div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 bg-[#fafaff]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-[900] text-gray-900 mb-6 uppercase tracking-tight">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We believe that no truck should ever drive empty. By utilizing existing capacity on the road, we make the logistics industry more efficient, more profitable for drivers, and more affordable for consumers.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform brings transparency to an industry traditionally clouded by middlemen and opaque pricing structures, creating a win-win standard for everyone involved.
              </p>
            </div>
            <div className="md:w-1/2 p-12 bg-white rounded-[3xl] shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-20 h-20 bg-yellow-100 text-yellow-500 text-4xl flex items-center justify-center rounded-2xl mb-8">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Environmental Impact</h3>
              <p className="text-gray-600">By filling empty truck space, pickItUp has prevented millions of pounds of CO2 emissions from entering the atmosphere through reduced "deadhead" miles.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-400 py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-[900] text-gray-900 mb-8 uppercase">Join the Movement</h2>
          <Link href="/register" className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-12 py-5 rounded-full transition-all text-xl shadow-xl hover:-translate-y-1 inline-block">
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}
