export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: '1' }];
}

import React from 'react';
import InvoiceClient from './InvoiceClient';

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <InvoiceClient params={resolvedParams} />;
}
