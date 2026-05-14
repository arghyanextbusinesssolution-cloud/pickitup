import ShipmentDetailsClient from './ShipmentDetailsClient';

export async function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { id: string } }) {
  return <ShipmentDetailsClient id={params.id} />;
}
