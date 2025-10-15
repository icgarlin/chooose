'use client';

import { useState } from 'react';

export default function PurchaseAttributesCard() {
  const [estimatedReductions, setEstimatedReductions] = useState('0');
  const [nextSafVolume, setNextSafVolume] = useState('0');

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl text-black font-semibold mb-6">Purchase SAF attributes</h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm text-gray-700">Estimated GHG reductions</label>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={estimatedReductions}
              onChange={(e) => setEstimatedReductions(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-600 text-sm">tCO₂e</span>
            <span className="text-2xl text-gray-300">=</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm text-gray-700">Next SAF volume</label>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={nextSafVolume}
              onChange={(e) => setNextSafVolume(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-600 text-sm">L</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">USD 0.00</span>
          </div>

          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors">
            Purchase attributes
          </button>

          <div className="flex justify-between items-center mt-3 text-xs">
            <span className="text-gray-600">You can pay with a credit card or invoice</span>
            <a href="#" className="text-blue-700 hover:text-blue-800 font-medium">
              How is this calculated?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
