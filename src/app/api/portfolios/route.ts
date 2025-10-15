import { NextResponse } from 'next/server';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

const PORTFOLIOS_DIR = path.join(process.cwd(), 'src', 'lib', 'chooose_json_objects');

export async function GET() {
  try {
    // Read all JSON files that might be portfolios
    const files = await readdir(PORTFOLIOS_DIR);
    const portfolioFiles = files.filter(f =>
      f.endsWith('.json') &&
      !f.endsWith('-partnership.json') &&
      f !== 'Customer.json'
    );

    const portfolios = await Promise.all(
      portfolioFiles.map(async (filename) => {
        const filepath = path.join(PORTFOLIOS_DIR, filename);
        const content = await readFile(filepath, 'utf-8');
        const data = JSON.parse(content);

        // Check if it's a portfolio (has specific portfolio fields)
        if (data.title && data.id) {
          return {
            id: data.id,
            title: data.title,
            subtitle: data.subtitle || '',
            internalTitle: data.internalTitle || '',
            theme: data.theme || '',
            impact: data.impact || '',
            containsSaf: data.containsSaf || false,
            type: data.type || 'Standard',
            filename
          };
        }
        return null;
      })
    );

    // Filter out null values
    const validPortfolios = portfolios.filter(p => p !== null);

    return NextResponse.json(validPortfolios);
  } catch (error) {
    console.error('Error listing portfolios:', error);
    return NextResponse.json(
      { error: 'Failed to list portfolios' },
      { status: 500 }
    );
  }
}
