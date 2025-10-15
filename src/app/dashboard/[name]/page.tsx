import Header from '@/components/Header';
import EmissionsDashboard from '@/components/EmissionsDashboard';
import { notFound } from 'next/navigation';

async function getPartnership(name: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/partnerships/${name}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching partnership:', error);
    return null;
  }
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const partnership = await getPartnership(name);

  if (!partnership) {
    notFound();
  }

  // Default emission data - in a real app this would come from actual emissions data
  const emissionData = {
    totalEmissions: 11366.814,
    totalFlights: 1251
  };

  return (
    <>
      <Header />
      <EmissionsDashboard
        partnershipName={partnership.name}
        internalName={partnership.internalName || name}
        companyName={partnership.companyName || partnership.name}
        emissionData={emissionData}
      />
    </>
  );
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const partnership = await getPartnership(name);

  if (!partnership) {
    return {
      title: 'Dashboard Not Found',
    };
  }

  return {
    title: `${partnership.name} - Emissions Dashboard`,
    description: `View and manage emissions for ${partnership.name}`,
  };
}
