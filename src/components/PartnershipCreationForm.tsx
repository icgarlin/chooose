'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PartnershipCreation } from '@/lib/types/partnership';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'NOK', 'SEK', 'DKK'];

export default function PartnershipCreationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PartnershipCreation>({
    name: '',
    internalName: '',
    currency: 'USD',
    companyName: '',
    portalUrl: ''
  });

  const handleChange = (field: keyof PartnershipCreation, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-generate internalName from name
    if (field === 'name' && !formData.internalName) {
      const internalName = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, internalName }));
    }

    // Auto-generate portalUrl from internalName
    if (field === 'internalName' && value) {
      const portalUrl = `https://${value}.portal.chooose.today`;
      setFormData(prev => ({ ...prev, portalUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create partnership');
      }

      const partnership = await response.json();

      // Redirect to the newly created dashboard
      router.push(`/dashboard/${partnership.internalName}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
          Partnership Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., Chooose SAF Demo"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Display name for the partnership
        </p>
      </div>

      <div>
        <label htmlFor="internalName" className="block text-sm font-medium text-gray-900 mb-2">
          Internal Name (URL identifier) *
        </label>
        <input
          type="text"
          id="internalName"
          value={formData.internalName}
          onChange={(e) => handleChange('internalName', e.target.value)}
          placeholder="e.g., safdemo"
          pattern="[a-z0-9-]+"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Lowercase letters, numbers, and hyphens only
        </p>
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          id="companyName"
          value={formData.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
          placeholder="e.g., Training Inc."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Organization or company name
        </p>
      </div>

      <div>
        <label htmlFor="currency" className="block text-sm font-medium text-gray-900 mb-2">
          Currency *
        </label>
        <select
          id="currency"
          value={formData.currency}
          onChange={(e) => handleChange('currency', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          required
        >
          {CURRENCIES.map(curr => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Default currency for transactions
        </p>
      </div>

      <div>
        <label htmlFor="portalUrl" className="block text-sm font-medium text-gray-900 mb-2">
          Portal URL *
        </label>
        <input
          type="url"
          id="portalUrl"
          value={formData.portalUrl}
          onChange={(e) => handleChange('portalUrl', e.target.value)}
          placeholder="e.g., https://safdemo.portal.chooose.today"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Unique portal URL for this partnership
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Creating...' : 'Create Partnership'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
