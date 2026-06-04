import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Courier Collection near me',
    description: 'Looking for courier collection near me? Get fast, secure, and reliable pickup and delivery services for parcels, documents, and packages.',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
