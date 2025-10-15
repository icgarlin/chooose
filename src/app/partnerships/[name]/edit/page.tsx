'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface Portfolio {
  id: string;
  title: string;
  subtitle: string;
  internalTitle: string;
  theme: string;
  impact: string;
  containsSaf: boolean;
  type: string;
}

interface PartnershipData {
  name: string;
  internalName: string;
  currency: string;
  companyName: string;
  portalUrl: string;
  choooseId: string;
  id: string;
  portfolios: Array<{ portfolioId: string; weight: number }>;
  connectFeatures: string[];
  features: string[];
}

const CURRENCIES = ['USD', 'EUR', 'GBP', 'NOK', 'SEK', 'DKK'];

const AVAILABLE_CONNECT_FEATURES = [
  'AirFreightFootprint',
  'FlightsFootprints_Upload',
  'Carbon',
  'Flights_Upload',
  'AirFreight'
];

const AVAILABLE_FEATURES = [
  'EmissionsDashboard',
  'EmissionCompensate',
  'EmissionCompensate_AirFreight',
  'EmissionCompensate_Flights',
  'Flights_FromTo',
  'Flights_ByDistance',
  'Flights_Upload',
  'Carbon'
];

export default function EditPartnershipPage({ params }: { params: Promise<{ name: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [partnershipName, setPartnershipName] = useState<string>('');
  const [availablePortfolios, setAvailablePortfolios] = useState<Portfolio[]>([]);
  const [formData, setFormData] = useState<PartnershipData>({
    name: '',
    internalName: '',
    currency: 'USD',
    companyName: '',
    portalUrl: '',
    choooseId: '',
    id: '',
    portfolios: [],
    connectFeatures: [],
    features: []
  });

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setPartnershipName(resolvedParams.name);
    };
    initializeParams();
  }, [params]);

  useEffect(() => {
    if (partnershipName) {
      fetchData();
    }
  }, [partnershipName]);

  const fetchData = async () => {
    try {
      // Fetch partnership and portfolios in parallel
      const [partnershipRes, portfoliosRes] = await Promise.all([
        fetch(`/api/partnerships/${partnershipName}`),
        fetch('/api/portfolios')
      ]);

      if (!partnershipRes.ok) throw new Error('Failed to fetch partnership');
      if (!portfoliosRes.ok) throw new Error('Failed to fetch portfolios');

      const partnershipData = await partnershipRes.json();
      const portfoliosData = await portfoliosRes.json();

      setAvailablePortfolios(portfoliosData);
      setFormData({
        name: partnershipData.name,
        internalName: partnershipData.internalName,
        currency: partnershipData.currency,
        companyName: partnershipData.companyName || '',
        portalUrl: partnershipData.settings?.portal?.portalUrl || '',
        choooseId: partnershipData.choooseId,
        id: partnershipData.id,
        portfolios: partnershipData.portfolios || [],
        connectFeatures: partnershipData.settings?.portal?.connectFeatures || [],
        features: partnershipData.settings?.portal?.features || []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof PartnershipData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePortfolio = (portfolioId: string) => {
    setFormData(prev => {
      const exists = prev.portfolios.some(p => p.portfolioId === portfolioId);

      if (exists) {
        // Remove portfolio
        return {
          ...prev,
          portfolios: prev.portfolios.filter(p => p.portfolioId !== portfolioId)
        };
      } else {
        // Add portfolio
        return {
          ...prev,
          portfolios: [
            ...prev.portfolios,
            { portfolioId, weight: -1 }
          ]
        };
      }
    });
  };

  const isPortfolioSelected = (portfolioId: string) => {
    return formData.portfolios.some(p => p.portfolioId === portfolioId);
  };

  const toggleConnectFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      connectFeatures: prev.connectFeatures.includes(feature)
        ? prev.connectFeatures.filter(f => f !== feature)
        : [...prev.connectFeatures, feature]
    }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/partnerships/${partnershipName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update partnership');
      }

      // Redirect to partnerships list
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            <p className="mt-4 text-gray-600">Loading partnership...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <button
              onClick={() => router.push('/')}
              className="hover:text-gray-900"
            >
              Partnerships
            </button>
            <span>/</span>
            <span>Edit {formData.name}</span>
          </div>
          <h1 className="text-4xl font-semibold text-black mb-2">
            Edit Partnership
          </h1>
          <p className="text-lg text-gray-600">
            Update partnership settings and configuration
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Chooose ID:</span>
                  <span className="ml-2 font-mono text-gray-900">{formData.choooseId}</span>
                </div>
                <div>
                  <span className="text-gray-600">Internal Name:</span>
                  <span className="ml-2 font-mono text-gray-900">{formData.internalName}</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Partnership Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Connect Features
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Features available for connecting emissions data
              </p>
              <div className="space-y-2">
                {AVAILABLE_CONNECT_FEATURES.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.connectFeatures.includes(feature)}
                      onChange={() => toggleConnectFeature(feature)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900 font-mono">{feature}</span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {formData.connectFeatures.length} feature{formData.connectFeatures.length !== 1 ? 's' : ''} selected
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Portal Features
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Features available in the customer portal
              </p>
              <div className="space-y-2">
                {AVAILABLE_FEATURES.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900 font-mono">{feature}</span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {formData.features.length} feature{formData.features.length !== 1 ? 's' : ''} selected
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Portfolios *
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Select which portfolios this partnership can offer to their customers
              </p>

              {availablePortfolios.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">No portfolios available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {availablePortfolios.map((portfolio) => (
                    <div
                      key={portfolio.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        isPortfolioSelected(portfolio.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      }`}
                      onClick={() => togglePortfolio(portfolio.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isPortfolioSelected(portfolio.id)
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                          }`}>
                            {isPortfolioSelected(portfolio.id) && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{portfolio.title}</h4>
                            {portfolio.containsSaf && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                SAF
                              </span>
                            )}
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                              {portfolio.type}
                            </span>
                          </div>
                          {portfolio.subtitle && (
                            <p className="text-sm text-gray-600">{portfolio.subtitle}</p>
                          )}
                          {portfolio.theme && (
                            <p className="text-xs text-gray-500 mt-1">Theme: {portfolio.theme}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-2 text-sm text-gray-500">
                {formData.portfolios.length} portfolio{formData.portfolios.length !== 1 ? 's' : ''} selected
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
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
        </div>
      </div>
    </div>
  );
}
