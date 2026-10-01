import { NextRequest, NextResponse } from "next/server";
import { exportToCjDropshippingCsv, exportToTeemdropCsv, ExportableOrder } from "@/lib/csv-export";
import { productConfig } from "@/config/product";

// Muestra de órdenes para descarga directa o conectable a base de datos
const sampleOrders: ExportableOrder[] = [
  {
    orderId: "DSP-" + Math.floor(100000 + Math.random() * 900000),
    orderDate: new Date().toISOString(),
    sku: productConfig.variants[0].sku,
    productName: productConfig.name,
    quantity: 2,
    customerName: "Jessica Parker",
    email: "jessica.parker@example.com",
    phone: "13105550192",
    addressLine1: "742 Evergreen Terrace",
    addressLine2: "Apt 4B",
    city: "Springfield",
    state: "OR",
    zipCode: "97477",
    country: "US",
    totalPaid: 79.98,
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") || "cj"; // "cj" | "teemdrop"

  if (format === "teemdrop") {
    const csvContent = exportToTeemdropCsv(sampleOrders);
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="teemdrop-orders-${Date.now()}.csv"`,
      },
    });
  } else {
    const csvContent = exportToCjDropshippingCsv(sampleOrders);
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="cj-dropshipping-orders-${Date.now()}.csv"`,
      },
    });
  }
}
