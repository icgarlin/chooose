// Simplified partnership type with 5 most important fields
export interface PartnershipCreation {
  name: string;              // Display name (e.g., "Chooose SAF Demo")
  internalName: string;      // URL-friendly identifier (e.g., "safdemo")
  currency: string;          // Currency code (e.g., "USD", "EUR")
  companyName: string;       // Company/organization name
  portalUrl: string;         // Unique portal URL
}

export interface Partnership extends PartnershipCreation {
  id: string;
  choooseId: string;
  createdDate: string;
  createdBy: string;
}
