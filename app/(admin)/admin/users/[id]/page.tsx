import React from 'react';
import UserDetailContent from './UserDetailContent';

// generateStaticParams is required for static export [id] routes
export function generateStaticParams() {
  return [];
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <UserDetailContent id={params.id} />;
}
