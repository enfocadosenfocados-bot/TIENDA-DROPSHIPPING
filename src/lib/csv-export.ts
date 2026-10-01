/**
 * Helper para exportar órdenes a formatos CSV de CJ Dropshipping y Teemdrop
 * Permite hacer fulfillment masivo de 1 clic subiendo el archivo al panel de CJ o Teemdrop
 */

export interface ExportableOrder {
  orderId: string;
  orderDate: string;
  sku: string;
  productName: string;
  quantity: number;
  customerName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  totalPaid: number;
}

/**
 * Genera CSV con el formato exacto requerido por CJ Dropshipping (Excel / CSV Batch Order Template)
 */
export function exportToCjDropshippingCsv(orders: ExportableOrder[]): string {
  const headers = [
    "Your Order Number",
    "SKU",
    "Product Title",
    "Quantity",
    "Customer Name",
    "Contact Phone",
    "Address Line 1",
    "Address Line 2",
    "City",
    "Province/State",
    "Postcode",
    "Country Code",
    "Shipping Method",
    "Order Note"
  ];

  const rows = orders.map((o) => [
    `"${o.orderId}"`,
    `"${o.sku}"`,
    `"${o.productName.replace(/"/g, '""')}"`,
    o.quantity,
    `"${o.customerName}"`,
    `"${o.phone}"`,
    `"${o.addressLine1}"`,
    `"${o.addressLine2 || ""}"`,
    `"${o.city}"`,
    `"${o.state}"`,
    `"${o.zipCode}"`,
    `"${o.country || "US"}"`,
    `"USPS Priority"`,
    `"Drop shipping order - No invoice please"`
  ].join(","));

  return [headers.join(","), ...rows].join("\n");
}

/**
 * Genera CSV con el formato estándar de Teemdrop
 */
export function exportToTeemdropCsv(orders: ExportableOrder[]): string {
  const headers = [
    "Order ID",
    "Item SKU",
    "Quantity",
    "Recipient Full Name",
    "Email",
    "Phone Number",
    "Street Address",
    "Apt/Suite",
    "City",
    "State/Region",
    "Zip Code",
    "Country"
  ];

  const rows = orders.map((o) => [
    `"${o.orderId}"`,
    `"${o.sku}"`,
    o.quantity,
    `"${o.customerName}"`,
    `"${o.email}"`,
    `"${o.phone}"`,
    `"${o.addressLine1}"`,
    `"${o.addressLine2 || ""}"`,
    `"${o.city}"`,
    `"${o.state}"`,
    `"${o.zipCode}"`,
    `"${o.country || "US"}"`
  ].join(","));

  return [headers.join(","), ...rows].join("\n");
}
