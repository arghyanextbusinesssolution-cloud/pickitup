import React from 'react';
import CarrierShipmentDetailClient from './CarrierShipmentDetailClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default async function CareerShipmentStatusPage({ params }: { params: Promise<{ id: string }> }) {
  await params;
  
  return <CarrierShipmentDetailClient />;
}
