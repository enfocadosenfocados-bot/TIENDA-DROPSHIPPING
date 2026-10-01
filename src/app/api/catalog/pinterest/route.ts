import { NextResponse } from "next/server";
import { productConfig, storeConfig } from "@/config/product";

export async function GET() {
  const domain = storeConfig.domain.replace(/\/$/, "");

  const itemsXml = productConfig.variants.map((v) => `
    <item>
      <g:id>${v.sku}</g:id>
      <g:title><![CDATA[${productConfig.name} - ${v.name}]]></g:title>
      <g:description><![CDATA[${productConfig.tagline}. Perfect for neck pain, cervical spine alignment, and deep sleep.]]></g:description>
      <g:link>${domain}?variant=${v.id}&amp;utm_source=pinterest</g:link>
      <g:image_link>${v.image}</g:image_link>
      <g:price>${productConfig.price.toFixed(2)} USD</g:price>
      <g:availability>${v.inStock ? "in stock" : "out of stock"}</g:availability>
      <g:condition>new</g:condition>
      <g:brand><![CDATA[${storeConfig.storeName}]]></g:brand>
      <g:item_group_id>${productConfig.id}</g:item_group_id>
    </item>`).join("");

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${storeConfig.storeName} Pinterest Product Catalog</title>
    <link>${domain}</link>
    <description>Catalog feed for Pinterest Shopping &amp; Product Pins</description>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(feedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
