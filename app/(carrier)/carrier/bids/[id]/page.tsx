import React from 'react';
import CarrierBidStatusClient from './CarrierBidStatusClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default function CarrierBidStatusPage() {
  return <CarrierBidStatusClient />;
}
