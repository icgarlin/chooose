'use client';

import PurchaseAttributesCard from './PurchaseAttributesCard';
import FAQAccordion from './FAQAccordion';

interface EmissionsDashboardProps {
  partnershipName: string;
  internalName?: string;
  companyName?: string;
  emissionData?: {
    totalEmissions: number;
    totalFlights: number;
  };
}

export default function EmissionsDashboard({
  partnershipName,
  internalName,
  companyName = 'Training Inc.',
  emissionData = { totalEmissions: 11366.814, totalFlights: 1251 }
}: EmissionsDashboardProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-sm text-gray-600 mb-8">{companyName}</div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Left Column - Main Content */}
          <div>
            <h1 className="text-black text-4xl font-semibold mb-6 leading-tight">
              Support sustainable aviation fuel (SAF) by<br />
              purchasing environmental attributes
            </h1>

            <p className="text-gray-600 mb-8">
              Purchase SAF Scope 3 attributes and receive associated SAF documentation to incorporate in<br />
              your Scope 3 reporting.
            </p>

            {/* Steps */}
            <div className="space-y-8 mb-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-black mb-2">Make your SAF attribute purchase</h3>
                  <p className="text-gray-600">
                    Easily buy attributes based on your carbon footprint - pay instantly with a<br />
                    credit card or with an invoice.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-black mb-2">Receive a draft SAF Certificate</h3>
                  <p className="text-gray-600">
                    After payment, you receive draft SAF documents which provide an initial<br />
                    overview of your purchase.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-black mb-2">Receive your final SAF documents</h3>
                  <p className="text-gray-600">
                    Within 12 months of payment, you will receive the final SAF documents,<br />
                    confirming the allocation of the attributes to you.
                  </p>
                </div>
              </div>
            </div>

            {/* Emissions Estimates */}
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-black mb-2">Your emission estimates</h3>
                <p className="text-gray-600">
                  Your organization has emitted over <span className="font-semibold">{emissionData.totalEmissions.toLocaleString()} tCO₂e</span> from <span className="font-semibold">{emissionData.totalFlights.toLocaleString()} flights</span>
                </p>
              </div>
              <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
                View emissions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Purchase Card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PurchaseAttributesCard />
          </div>
        </div>
      </div>

      {/* Learn More Section */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-black mb-6">Learn more about SAF</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Sustainable Aviation Fuel (SAF) is a powerful tool for reducing the carbon
                footprint of your business travel. By purchasing the environmental attributes
                of SAF through our book-and-claim system, your company can credibly
                reduce Scope 3 emissions, support the scale-up of cleaner aviation fuel, and
                demonstrate climate leadership. You'll receive verified documentation of the
                emissions savings associated with SAF use—fully aligned with major
                sustainability reporting frameworks—without needing to alter your travel
                plans. It's a practical, high-impact way to contribute to decarbonizing the
                aviation sector while working towards meeting your climate goals.
              </p>
              <a href="#" className="text-blue-700 hover:text-blue-800 font-medium inline-flex items-center gap-1">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
                alt="Aircraft wing in flight"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQAccordion />
    </div>
  );
}
