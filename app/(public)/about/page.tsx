import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-purple-900 py-32 border-b border-purple-800 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
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
          <p className="text-xl text-gray-600 leading-relaxed mb-16">
            By offering a user-friendly website where clients can list shipments, evaluate prices, and reserve reliable carriers with a few clicks, we hope to streamline logistics. We assist in reducing vacant truck space and overall transportation costs by matching goods with carriers currently on your route.
          </p>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="py-24 bg-[#fafaff] border-y border-purple-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-[1000] text-gray-900 mb-6 uppercase tracking-tight">
              Smart Shipping Solutions <span className="text-purple-600">Across the U.S.A</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 text-2xl font-black flex items-center justify-center rounded-xl mb-6">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Shipment Posting</h3>
              <p className="text-gray-600 leading-relaxed">
                Provide the pickup location, delivery destination, item size, and requested delivery time when listing your shipment details in minutes. PickitUp makes the process quick and easy, whether you need to ship a car, deliver a package, or transport furniture.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 text-2xl font-black flex items-center justify-center rounded-xl mb-6">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Get Competitive Quotes</h3>
              <p className="text-gray-600 leading-relaxed">
                Verified carriers that are currently on your route can provide competitive shipping quotations once your package has been submitted. This enables consumers to evaluate costs and select reasonably priced transportation options within the United States of America.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 text-2xl font-black flex items-center justify-center rounded-xl mb-6">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Increase Shipping Savings</h3>
              <p className="text-gray-600 leading-relaxed">
                PickitUp helps cut empty miles and shipping expenses by utilizing available truck space from carriers currently on the road. When compared to regular delivery services, customers looking for a trustworthy courier collection near me in U.S.A can frequently save a large amount of money.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 text-2xl font-black flex items-center justify-center rounded-xl mb-6">4</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Simple Delivery & Pickup</h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform offers a trustworthy pickup service in U.S.A to people and companies seeking quick and practical transportation options. PickitUp guarantees a seamless shipping experience from doorstep pickup to final delivery.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-50 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 text-2xl font-black flex items-center justify-center rounded-xl mb-6">5</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">Easy Shipping Across USA</h3>
              <p className="text-gray-600 leading-relaxed">
                PickitUp is dedicated to providing reasonably priced, adaptable, and dependable shipping options across the country, whether you're looking for a professional courier collection near me in U.S.A or a reliable pickup service in U.S.A for large things.
              </p>
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
