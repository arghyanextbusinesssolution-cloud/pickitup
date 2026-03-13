const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "..", "app");

// ---- ALL ROUTES ----
const routes = [
  "/", "/about", "/contact", "/pricing", "/faq",
  "/how-it-works", "/terms", "/privacy",

  "/login", "/register", "/forgot-password",
  "/reset-password", "/verify-email",
  "/onboarding/shipper", "/onboarding/carrier",

  "/shipper/dashboard",
  "/shipper/dashboard/shipments",
  "/shipper/dashboard/shipments/create",
  "/shipper/dashboard/shipments/[id]",
  "/shipper/dashboard/shipments/edit/[id]",
  "/shipper/dashboard/shipments/bids/[id]",
  "/shipper/dashboard/bookings",
  "/shipper/dashboard/bookings/[id]",
  "/shipper/dashboard/payments",
  "/shipper/dashboard/payments/[id]",
  "/shipper/dashboard/disputes",
  "/shipper/dashboard/disputes/[id]",
  "/shipper/dashboard/reviews",
  "/shipper/dashboard/profile",
  "/shipper/dashboard/settings",

  "/carrier/dashboard",
  "/carrier/shipments",
  "/carrier/shipments/[id]",
  "/carrier/bids",
  "/carrier/bids/[id]",
  "/carrier/jobs",
  "/carrier/jobs/[id]",
  "/carrier/earnings",
  "/carrier/payouts",
  "/carrier/reviews",
  "/carrier/profile",
  "/carrier/settings",

  "/admin",
  "/admin/users",
  "/admin/users/[id]",
  "/admin/users/create",
  "/admin/users/edit/[id]",
  "/admin/carriers",
  "/admin/carriers/[id]",
  "/admin/carriers/verify/[id]",
  "/admin/carriers/documents/[id]",
  "/admin/shipments",
  "/admin/shipments/[id]",
  "/admin/shipments/bids/[id]",
  "/admin/shipments/tracking/[id]",
  "/admin/bookings",
  "/admin/bookings/[id]",
  "/admin/payments",
  "/admin/payments/[id]",
  "/admin/payments/refunds/[id]",
  "/admin/payments/payouts",
  "/admin/disputes",
  "/admin/disputes/[id]",
  "/admin/disputes/resolve/[id]",
  "/admin/reviews",
  "/admin/reviews/[id]",
  "/admin/reviews/moderate/[id]",
  "/admin/invoices",
  "/admin/invoices/[id]",
  "/admin/analytics",
  "/admin/analytics/revenue",
  "/admin/analytics/users",
  "/admin/analytics/carriers",
  "/admin/analytics/shipments",
  "/admin/cms",
  "/admin/cms/pages",
  "/admin/cms/blog",
  "/admin/cms/faq",
  "/admin/cms/banners",

  "/invoices/[id]",
  "/tracking/[id]",
  "/notifications"
];

// ---- PAGE TEMPLATE ----
const pageTemplate = (route) => `
export default function Page() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>${route}</h1>
    </div>
  );
}
`;

function createRoute(route) {
  const routePath = route === "/" ? "" : route;
  const fullPath = path.join(baseDir, routePath);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  const pageFile = path.join(fullPath, "page.tsx");

  if (!fs.existsSync(pageFile)) {
    fs.writeFileSync(pageFile, pageTemplate(route));
    console.log("Created:", route);
  } else {
    console.log("Skipped (exists):", route);
  }
}

// ---- RUN ----
routes.forEach(createRoute);

console.log("\n✅ Route scaffolding completed!");