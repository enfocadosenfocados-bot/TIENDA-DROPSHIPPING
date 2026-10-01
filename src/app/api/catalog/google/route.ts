import { NextResponse } from "next/server";
import { productConfig, storeConfig } from "@/config/product";

export async function GET() {
  const domain = storeConfig.domain.replace(/\/$/, "");

  const itemsXml = productConfig.variants.map((v) => `
    <item>
      <g:id>${v.sku}</g:id>
      <g:title><![CDATA[${productConfig.name} - ${v.name}]]></g:title>
      <g:description><![CDATA[${productConfig.tagline}. Chiropractor-designed ergonomic cervical alignment. 50D memory foam.]]></g:description>
      <g:link>${domain}?variant=${v.id}&amp;utm_source=google_shopping</g:link>
      <g:image_link>${v.image}</g:image_link>
      <g:brand><![CDATA[${storeConfig.storeName}]]></g:brand>
      <g:condition>new</g:condition>
      <g:availability>${v.inStock ? "in_stock" : "out_of_stock"}</g:availability>
      <g:price>${productConfig.originalPrice.toFixed(2)} USD</g:price>
      <g:sale_price>${productConfig.price.toFixed(2)} USD</g:sale_price>
      <g:google_product_category><![CDATA[${productConfig.googleCategoryId}]]></g:google_product_category>
      <g:product_type><![CDATA[${productConfig.category}]]></g:product_type>
      <g:item_group_id>${productConfig.id}</g:item_group_id>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>USPS Standard</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
    </item>`).join("");

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${storeConfig.storeName} Google Shopping Feed</title>
    <link>${domain}</link>
    <description>Automated Google Merchant Center Product Feed</description>
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
