import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-6">
        <span className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-4 block">Legal Center</span>
        <h1 className="text-4xl md:text-5xl font-[1000] text-gray-900 tracking-tight uppercase mb-12">
          Privacy Policy
        </h1>

        <div className="prose prose-lg prose-purple max-w-none text-gray-600">
          <p className="text-xl font-medium text-gray-900 mb-8">
            Last Updated: February 21, 2026
          </p>

          <p className="mb-8 leading-relaxed">
            At pickItUp, we recognize that privacy is important. This Privacy Policy outlines the types of personal information we receive and collect when you use our services, as well as some of the steps we take to safeguard information. We hope this will help you make an informed decision about sharing personal information with us.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Information We Collect</h2>
          <p className="mb-4">We collect information in the following ways:</p>
          <ul className="list-disc pl-6 space-y-3 mb-8">
            <li><strong>Information you give us:</strong> When you sign up for a pickItUp account, we ask for personal information like your name, email address, telephone number, and payment information.</li>
            <li><strong>Location data:</strong> For Carriers using our mobile app, we collect background location data to provide Shippers with real-time tracking of their active shipments.</li>
            <li><strong>Platform usage:</strong> We collect details about how you use our marketplace, including your search queries, bidding history, and messaging between users.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How We Use Information</h2>
          <p className="mb-6">
            We use the information we collect to provide, maintain, protect, and improve our services. Specifically, we use it to:
          </p>
          <ul className="list-disc pl-6 space-y-3 mb-8">
            <li>Facilitate the matching of Shippers with Carriers.</li>
            <li>Process secure payments and deposits.</li>
            <li>Verify carrier credentials and licensing.</li>
            <li>Send critical service updates and promotional offers (which you can opt out of).</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Information Sharing</h2>
          <p className="mb-6">
            We do not share personal information with companies, organizations, and individuals outside of pickItUp unless one of the following circumstances applies:
          </p>
          <div className="bg-purple-50 p-6 rounded-xl my-8">
            <p className="font-medium text-purple-900 m-0">
              <strong>To facilitate shipments:</strong> When a bid is accepted, we share the Shipper's pickup/delivery location and contact information with the Carrier, and the Carrier's contact details with the Shipper.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Data Security</h2>
          <p className="mb-6">
            We encrypt our services using SSL and maintain strict internal policies restricting access to personal information to pickItUp employees who need to know that information in order to process it for us.
          </p>
        </div>
      </div>
    </div>
  );
}
