import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { Partnership, PartnershipCreation } from '@/lib/types/partnership';

const PARTNERSHIPS_DIR = path.join(process.cwd(), 'src', 'lib', 'chooose_json_objects');

// Generate a simple Chooose ID
function generateChoooseId(): string {
  const part1 = Math.floor(Math.random() * 900 + 100);
  const part2 = Math.floor(Math.random() * 90000 + 10000);
  const part3 = Math.floor(Math.random() * 9 + 1);
  return `${part1}-${part2}-${part3}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: PartnershipCreation = await request.json();

    // Validate required fields
    if (!body.name || !body.internalName || !body.currency || !body.companyName || !body.portalUrl) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Ensure directory exists
    if (!existsSync(PARTNERSHIPS_DIR)) {
      await mkdir(PARTNERSHIPS_DIR, { recursive: true });
    }

    // Check if partnership already exists
    const filename = `${body.internalName}-partnership.json`;
    const filepath = path.join(PARTNERSHIPS_DIR, filename);

    if (existsSync(filepath)) {
      return NextResponse.json(
        { error: 'Partnership with this internal name already exists' },
        { status: 409 }
      );
    }

    // Create partnership object based on the existing structure
    const partnership = {
      clientIds: [],
      publicApiKeys: [],
      bonusRules: [],
      activeBonusRule: null,
      activeBonusRules: [],
      deleted: false,
      portfolios: [
        {
          fees: null,
          portfolioId: "6368ee05a9187a4ec3b6f838", // Default SAF portfolio
          weight: -1,
          impact: "None",
          portfolio: null,
          alias: null
        }
      ],
      choooseId: generateChoooseId(),
      customerId: null,
      currency: body.currency,
      settings: {
        public: false,
        termsAndConditions: {
          accepted: true,
          acceptedDate: new Date().toISOString(),
          acceptedByUser: "system",
          acceptedByProfile: {
            name: "System",
            preferredName: null,
            pictureUrl: null,
            gender: null,
            otherGender: null,
            dateOfBirth: null,
            language: null,
            preferredSystemOfUnits: "Metric"
          }
        },
        termsAndConditionsSupplyParagraphs: null,
        flightsRadiativeForcingFactor: null,
        enableSpecificFlightFootprintFallback: null,
        feeDisplay: null,
        defaultOrderCategory: "Flights",
        customerType: null,
        baselineCo2Price: null,
        currencyConversionFeePercentage: null,
        customerFees: null,
        externalPartnershipFees: null,
        externalChoooseFees: null,
        mail: {
          welcomeMailTemplate: "welcome",
          welcomeReminderTemplate: null,
          welcomeWithLogonTemplate: "welcomeWithLogon",
          giftMailTemplate: null,
          orderCompletedMailTemplate: "receipt",
          orderFollowup1Template: null,
          orderFollowup2Template: null,
          orderRefundedMailTemplate: null,
          orderRetirementConfirmationTemplate: "retirementConfirmation",
          billingStripeRequiresAction1Template: "cardAuthentication1",
          billingStripeRequiresAction2Template: "cardAuthentication2",
          billingStripeRequiresAction3Template: "cardAuthentication3",
          billingStripeProblemResolvedTemplate: "paymentProcessed",
          billingStatementStripePeriodicTemplate: "billingPeriodReceipt",
          billingInvoiceTemplate: "invoice",
          billingStripeProblem1Template: "paymentProblem1",
          billingStripeProblem2Template: "paymentProblem2",
          billingStripeProblem3Template: "paymentProblem3",
          customerWelcomeTemplate: "welcome",
          customerWithExistingAccountWelcomeTemplate: "welcomeMultiPartnership",
          customerFootprintsRegistrationReportTemplate: "footprintRegistrationReport",
          customerFootprintsUploadSuccessTemplate: null,
          customerFootprintsUploadErrorTemplate: null,
          userInviteTemplate: "invitation",
          subscriptionCanceledTemplate: null,
          subscriptionModifiedTemplate: null,
          subscriptionCreatedTemplate: null,
          facilitatedSubscriptionReportTemplate: "emissionsReport",
          facilitatedSubscriptionReminderTemplate: null,
          facilitatedOrderApprovalTemplate: "orderClaim",
          facilitatedOrderApprovalReminderTemplate: null,
          facilitatedOrderCompletedTemplate: null,
          customerPeriodicReportTemplate: null,
          safCertficateDraftReadyTemplate: null,
          safCertficateFinalReadyTemplate: null,
          mailAddressSettings: {
            mailFromAddress: {
              name: null,
              email: "support@chooose.today"
            },
            localizedMailAddresses: [],
            bccAddress: {
              name: null,
              email: null
            }
          },
          useBookedAmountsInBillReceipts: null,
          sendInviteMailIfEmissionsUploaded: null,
          sendCustomerMailIfFootprintsUploaded: null
        },
        certificates: null,
        powerBi: null,
        billingInterval: null,
        paymentMethod: null,
        invoice: null,
        transfer: null,
        stripeStatementDescriptorSuffix: null,
        portal: {
          apiKeys: [],
          connectFeatures: [
            "AirFreightFootprint",
            "FlightsFootprints_Upload"
          ],
          transactFeatures: null,
          features: [
            "EmissionsDashboard",
            "EmissionCompensate",
            "EmissionCompensate_AirFreight"
          ],
          safFeatures: null,
          customerType: 0,
          defaultCustomerBillingInterval: null,
          defaultCustomerInstantBilling: true,
          logoUrl: "https://assets.chooose.today/logos/chooose-logo-black.svg",
          lightLogoUrl: null,
          poweredBy: null,
          colors: null,
          styles: null,
          portalUrl: body.portalUrl,
          faviconUrl: "https://assets.chooose.today/logos/chooose-favicon.png",
          contactEmail: null,
          supportEmail: null,
          languages: null,
          paymentMethodTypes: null,
          fields: null,
          multiplier: null,
          airportDataSet: null,
          allowedAirlineCodes: null,
          programmeName: null,
          orderConfirmationDownload: true
        },
        ringfenceCodes: [],
        defaultAirlineCode: null,
        preferredSystemOfUnits: "Metric",
        reports: null,
        webhooks: null,
        featuredAirports: null,
        enabledSsoNames: null,
        isSsoEnabled: false,
        allowLocalUsersDespiteSso: null,
        ignoreTaxFactors: null,
        retirement: null,
        alertChannel: null,
        preferredDateFormat: null,
        inputFilters: null,
        refundPolicy: null,
        jetFuelSettingsId: null,
        lcfJetFuelSettingsId: null,
        footprintCalculator: null,
        deductions: null,
        strictValidationOfExternalFootprints: null,
        bookingFlow: null,
        partnerApi: null,
        maximumTemporaryOrderExpirationDays: null,
        minutesOfTemporaryReservation: null,
        disableTaxCalculation: null,
        validateSufficientSupply: null,
        customerInvitationWithInviteLink: true
      },
      name: body.name,
      internalName: body.internalName,
      companyName: body.companyName,
      affiliationCodes: [],
      parentPartnershipId: null,
      childPartnershipIds: [],
      accountId: null,
      id: crypto.randomUUID(),
      createdDate: new Date().toISOString(),
      createdBy: "system",
      createdByPrincipal: null,
      modifiedDate: new Date().toISOString(),
      modifiedBy: "system",
      modifiedByPrincipal: null
    };

    // Save to file
    await writeFile(filepath, JSON.stringify(partnership, null, 2), 'utf-8');

    return NextResponse.json(partnership, { status: 201 });
  } catch (error) {
    console.error('Error creating partnership:', error);
    return NextResponse.json(
      { error: 'Failed to create partnership' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { readdir } = await import('fs/promises');

    // List all partnership JSON files (both old and new patterns)
    const files = await readdir(PARTNERSHIPS_DIR);
    const partnershipFiles = files.filter(f =>
      f.endsWith('-partnership.json') && !f.includes('chooose-demo-partnership.json')
    );

    const partnerships = (await Promise.all(
      partnershipFiles.map(async (filename) => {
        try {
          const filepath = path.join(PARTNERSHIPS_DIR, filename);
          const content = await readFile(filepath, 'utf-8');

          // Skip empty files
          if (!content.trim()) {
            console.warn(`Skipping empty partnership file: ${filename}`);
            return null;
          }

          const data = JSON.parse(content);

          // Extract internal name from filename as fallback
          // "chooose-saf-demo-partnership.json" -> "chooose-saf-demo"
          const internalNameFromFile = filename.replace('-partnership.json', '');

          return {
            id: data.id,
            name: data.name,
            internalName: data.internalName || internalNameFromFile,
            choooseId: data.choooseId,
            currency: data.currency,
            portalUrl: data.settings?.portal?.portalUrl || '',
            companyName: data.companyName || '',
            createdDate: data.createdDate,
            filename
          };
        } catch (error) {
          console.error(`Error reading partnership file ${filename}:`, error);
          return null;
        }
      })
    )).filter(p => p !== null);

    return NextResponse.json(partnerships);
  } catch (error) {
    console.error('Error listing partnerships:', error);
    return NextResponse.json(
      { error: 'Failed to list partnerships' },
      { status: 500 }
    );
  }
}
