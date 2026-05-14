import React from 'react';
import CarrierDetailContent from './CarrierDetailContent';

// generateStaticParams is required for static export [id] routes
export function generateStaticParams() {
  return [];
}

export default function CarrierDetailPage({ params }: { params: { id: string } }) {
  return <CarrierDetailContent id={params.id} />;
}
