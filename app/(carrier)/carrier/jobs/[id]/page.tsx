import React from 'react';
import CarrierJobDetailClient from './CarrierJobDetailClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default async function CareerShipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // We await params to satisfy Next.js 15+ patterns, though the Client component will also use useParams()
  await params;
  
  return <CarrierJobDetailClient />;
}
