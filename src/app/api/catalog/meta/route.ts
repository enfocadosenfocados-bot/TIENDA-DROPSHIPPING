import { NextResponse } from "next/server";
import { productConfig, storeConfig } from "@/config/product";

export async function GET() {
  const domain = storeConfig.domain.replace(/\/$/, "");

  // Generar XML con formato estándar Meta Commerce Manager (Facebook / Instagram Shop)
  const itemsXml = productConfig.variants.map((v) => `
    <item>
      <g:id>${v.sku}</g:id>
      <g:title><![CDATA[${productConfig.name} - ${v.name}]]></g:title>
      <g:description><![CDATA[${productConfig.tagline}. High-density ergonomic memory foam, 3D cooling cover. 30-night trial.]]></g:description>
      <g:link>${domain}?variant=${v.id}</g:link>
      <g:image_link>${v.image}</g:image_link>
      <g:brand><![CDATA[${storeConfig.storeName}]]></g:brand>
      <g:condition>new</g:condition>
      <g:availability>${v.inStock ? "in stock" : "out of stock"}</g:availability>
      <g:price>${productConfig.originalPrice.toFixed(2)} USD</g:price>
      <g:sale_price>${productConfig.price.toFixed(2)} USD</g:sale_price>
      <g:item_group_id>${productConfig.id}</g:item_group_id>
      <g:google_product_category><![CDATA[${productConfig.googleCategoryId}]]></g:google_product_category>
      <g:fb_product_category><![CDATA[Health & Beauty > Sleeping Aids > Pillows]]></g:fb_product_category>
    </item>`).join("");

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${storeConfig.storeName} Meta Product Catalog</title>
    <link>${domain}</link>
    <description>Catalog feed for Facebook &amp; Instagram Shop</description>
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
