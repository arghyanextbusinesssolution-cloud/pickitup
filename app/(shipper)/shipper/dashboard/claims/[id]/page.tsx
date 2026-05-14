export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default function Page() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>/shipper/dashboard/disputes/[id]</h1>
    </div>
  );
}
