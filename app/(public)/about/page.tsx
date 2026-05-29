import React from 'react';
import Link from 'next/link';
import AboutGallery from '@/components/shared/AboutGallery';
import BackToTop from '@/components/shared/BackToTop';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero Section */}
      <div className="bg-purple-900 py-32 border-b border-purple-800 text-center text-white relative overflow-hidden">
        <video
          src="/video6.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <span className="text-sm font-[900] text-yellow-400 uppercase tracking-widest mb-6 block">About us</span>
          <h1 className="text-5xl md:text-7xl font-[1000] tracking-tighter uppercase mb-6 leading-none">
            Smart Shipping <span className="text-purple-400">Solutions.</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed font-medium">
            PickitUp is an intelligent shipping platform designed to make transportation throughout the United States of America easy, economical, and dependable.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            We assist businesses and people move goods swiftly and effectively by connecting them with vetted carriers who currently have additional capacity on their vehicles. PickitUp provides a quicker and more economical option to ship, whether you require furniture delivery, car transportation, or large package shipping.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed">
            By offering a user-friendly website where clients can list shipments, evaluate prices, and reserve reliable carriers with a few clicks, we hope to streamline logistics. We assist in reducing vacant truck space and overall transportation costs by matching goods with carriers currently on your route.
          </p>
        </div>
      </div>

      {/* Process Section */}
      <AboutGallery />

      {/* CTA */}
      <div className="relative bg-purple-900 py-32 text-center overflow-hidden">
        {/* Background Video */}
        <video
          src="/video3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-[900] text-white mb-8 uppercase tracking-tighter">Join the Movement</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto font-medium">
            Experience the future of intelligent shipping. Connect with reliable carriers and streamline your logistics across the USA.
          </p>
          <Link href="/register" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-[900] px-12 py-5 rounded-2xl transition-all shadow-2xl hover:-translate-y-1 inline-block uppercase tracking-widest text-sm">
            Get Started Today
          </Link>
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
