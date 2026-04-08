export default function Page({ searchParams }: { searchParams: { id?: string } }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>/shipper/dashboard/shipments/edit/details?id={searchParams.id}</h1>
    </div>
  );
}
