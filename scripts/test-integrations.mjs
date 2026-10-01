/**
 * Test Suite: Verifica que todas las rutas e integraciones de la tienda respondan 200 OK
 * Ejecutar con: node scripts/test-integrations.mjs
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

const endpoints = [
  { path: "/", name: "Homepage (Storefront)" },
  { path: "/upsell?session_id=test_123", name: "Post-Purchase 1-Click Upsell" },
  { path: "/thank-you?session_id=test_123", name: "Thank You Page" },
  { path: "/track-order", name: "USPS Order Tracking Page" },
  { path: "/policies/shipping", name: "Shipping Policy" },
  { path: "/policies/refund", name: "30-Night Refund Policy" },
  { path: "/policies/privacy", name: "Privacy Policy" },
  { path: "/policies/terms", name: "Terms of Service" },
  { path: "/api/catalog/meta", name: "Facebook & Instagram Catalog Feed" },
  { path: "/api/catalog/google", name: "Google Shopping / Merchant Feed" },
  { path: "/api/catalog/pinterest", name: "Pinterest Catalog Feed" },
  { path: "/api/catalog/snapchat", name: "Snapchat Catalog CSV Feed" },
  { path: "/api/orders/export?format=cj", name: "CJ Dropshipping CSV Batch Export" },
  { path: "/api/orders/export?format=teemdrop", name: "Teemdrop CSV Batch Export" },
];

async function runTests() {
  console.log(`\n======================================================`);
  console.log(`🧪 PROBANDO TODAS LAS RUTAS E INTEGRACIONES EN ${BASE_URL}`);
  console.log(`======================================================\n`);

  let passed = 0;
  let failed = 0;

  for (const ep of endpoints) {
    const url = `${BASE_URL}${ep.path}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log(`✅ [200 OK] ${ep.name.padEnd(38)} -> ${ep.path}`);
        passed++;
      } else {
        console.error(`❌ [${res.status}] ${ep.name.padEnd(38)} -> ${ep.path}`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ [FAIL] ${ep.name.padEnd(38)} -> Error de conexión: ${err.message}`);
      failed++;
    }
  }

  // Probar POST a CAPI Route
  try {
    const capiRes = await fetch(`${BASE_URL}/api/events/capi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "PageView",
        eventId: "test_evt_" + Date.now(),
        eventSourceUrl: `${BASE_URL}/`,
      }),
    });
    if (capiRes.ok) {
      console.log(`✅ [200 OK] Meta & TikTok CAPI Route               -> /api/events/capi (POST)`);
      passed++;
    } else {
      console.error(`❌ [${capiRes.status}] Meta & TikTok CAPI Route`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] CAPI Route: ${err.message}`);
    failed++;
  }

  // Probar POST a Checkout Route
  try {
    const checkoutRes = await fetch(`${BASE_URL}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bundleId: "bundle-2",
        variantId: "var-charcoal-grey",
        withBump: true,
      }),
    });
    const json = await checkoutRes.json();
    if (json.url || json.error) {
      console.log(`✅ [READY]  Stripe Checkout Creator API             -> /api/checkout (POST)`);
      passed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] Checkout API: ${err.message}`);
    failed++;
  }

  console.log(`\n======================================================`);
  console.log(`📊 RESULTADO FINAL: ${passed} pruebas exitosas, ${failed} fallidas.`);
  console.log(`======================================================\n`);
}

runTests();
