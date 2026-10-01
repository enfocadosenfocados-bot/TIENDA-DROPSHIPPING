import { NextResponse } from "next/server";
import { productConfig, storeConfig } from "@/config/product";

export async function GET() {
  const domain = storeConfig.domain.replace(/\/$/, "");

  // Formato CSV estándar para Snapchat Catalog
  const header = "id,title,description,availability,condition,price,link,image_link,brand,item_group_id\n";
  const rows = productConfig.variants.map((v) => {
    const id = v.sku;
    const title = `"${productConfig.name} - ${v.name}"`;
    const desc = `"${productConfig.tagline}"`;
    const avail = v.inStock ? "in stock" : "out of stock";
    const cond = "new";
    const price = `${productConfig.price.toFixed(2)} USD`;
    const link = `"${domain}?variant=${v.id}&utm_source=snapchat"`;
    const img = `"${v.image}"`;
    const brand = `"${storeConfig.storeName}"`;
    const group = productConfig.id;
    return `${id},${title},${desc},${avail},${cond},${price},${link},${img},${brand},${group}`;
  }).join("\n");

  return new NextResponse(header + rows, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "inline; filename=\"snapchat-catalog.csv\"",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
