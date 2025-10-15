import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const PARTNERSHIPS_DIR = path.join(process.cwd(), 'src', 'lib', 'chooose_json_objects');

// Helper function to find partnership file by internal name
async function findPartnershipFile(internalName: string): Promise<string | null> {
  const { readdir } = await import('fs/promises');
  const files = await readdir(PARTNERSHIPS_DIR);
  const partnershipFiles = files.filter(f =>
    f.endsWith('-partnership.json') && !f.includes('chooose-demo-partnership.json')
  );

  for (const filename of partnershipFiles) {
    try {
      const filepath = path.join(PARTNERSHIPS_DIR, filename);
      const content = await readFile(filepath, 'utf-8');

      // Skip empty files
      if (!content.trim()) {
        console.warn(`Skipping empty partnership file: ${filename}`);
        continue;
      }

      const data = JSON.parse(content);

      // Check if internalName matches or if filename matches
      const internalNameFromFile = filename.replace('-partnership.json', '');
      if (data.internalName === internalName || internalNameFromFile === internalName) {
        return filename;
      }
    } catch (error) {
      console.error(`Error reading partnership file ${filename}:`, error);
      // Continue to next file instead of failing entirely
      continue;
    }
  }

  return null;
}

// GET single partnership by internal name
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const filename = await findPartnershipFile(name);

    if (!filename) {
      return NextResponse.json(
        { error: 'Partnership not found' },
        { status: 404 }
      );
    }

    const filepath = path.join(PARTNERSHIPS_DIR, filename);
    const content = await readFile(filepath, 'utf-8');
    const partnership = JSON.parse(content);

    return NextResponse.json(partnership);
  } catch (error) {
    console.error('Error fetching partnership:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partnership' },
      { status: 500 }
    );
  }
}

// PUT update partnership
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const body = await request.json();
    const filename = await findPartnershipFile(name);

    if (!filename) {
      return NextResponse.json(
        { error: 'Partnership not found' },
        { status: 404 }
      );
    }

    const filepath = path.join(PARTNERSHIPS_DIR, filename);

    // Read existing partnership
    const content = await readFile(filepath, 'utf-8');
    const partnership = JSON.parse(content);

    // Update fields
    partnership.name = body.name;
    partnership.companyName = body.companyName;
    partnership.currency = body.currency;
    partnership.settings.portal.portalUrl = body.portalUrl;

    // Update portal features
    if (body.connectFeatures !== undefined && Array.isArray(body.connectFeatures)) {
      partnership.settings.portal.connectFeatures = body.connectFeatures;
    }
    if (body.features !== undefined && Array.isArray(body.features)) {
      partnership.settings.portal.features = body.features;
    }

    // Update portfolios - ensure proper structure
    if (body.portfolios && Array.isArray(body.portfolios)) {
      partnership.portfolios = body.portfolios.map((p: any) => ({
        fees: null,
        portfolioId: p.portfolioId,
        weight: p.weight || -1,
        impact: "None",
        portfolio: null,
        alias: null
      }));
    }

    partnership.modifiedDate = new Date().toISOString();
    partnership.modifiedBy = 'system';

    // Save updated partnership
    await writeFile(filepath, JSON.stringify(partnership, null, 2), 'utf-8');

    return NextResponse.json(partnership);
  } catch (error) {
    console.error('Error updating partnership:', error);
    return NextResponse.json(
      { error: 'Failed to update partnership' },
      { status: 500 }
    );
  }
}

// DELETE partnership
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const { unlink } = await import('fs/promises');
    const filename = await findPartnershipFile(name);

    if (!filename) {
      return NextResponse.json(
        { error: 'Partnership not found' },
        { status: 404 }
      );
    }

    const filepath = path.join(PARTNERSHIPS_DIR, filename);

    await unlink(filepath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting partnership:', error);
    return NextResponse.json(
      { error: 'Failed to delete partnership' },
      { status: 500 }
    );
  }
}
