import { NextResponse } from "next/server";
import { productConfig, storeConfig } from "@/config/product";

export async function GET() {
  const domain = storeConfig.domain.replace(/\/$/, "");

  const toAbsoluteUrl = (img: string) => {
    let url = img;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      const cleanPath = url.startsWith("/") ? url : `/${url}`;
      url = `${domain}${cleanPath}`;
    }
    return url.replace(/&/g, "&amp;");
  };

  const escapeXmlUrl = (url: string) => url.replace(/&/g, "&amp;");

  // 1. Variantes individuales
  const variantsXml = productConfig.variants.map((v) => `
    <item>
      <g:id>${v.sku}</g:id>
      <g:title><![CDATA[${productConfig.name} - ${v.name}]]></g:title>
      <g:description><![CDATA[Release 8 Hours of Desk Strain in 10 Minutes: Restores Natural C1-C7 Curvature & Melts Upper Trap Tension. High-density ergonomic memory foam, 3D cooling cover. 30-night trial.]]></g:description>
      <g:link>${escapeXmlUrl(`${domain}?variant=${v.id}`)}</g:link>
      <g:image_link>${toAbsoluteUrl(v.image)}</g:image_link>
      <g:brand><![CDATA[${storeConfig.storeName}]]></g:brand>
      <g:condition>new</g:condition>
      <g:availability>${v.inStock ? "in stock" : "out of stock"}</g:availability>
      <g:price>${productConfig.originalPrice.toFixed(2)} USD</g:price>
      <g:sale_price>${productConfig.price.toFixed(2)} USD</g:sale_price>
      <g:item_group_id>${productConfig.id}</g:item_group_id>
      <g:google_product_category><![CDATA[${productConfig.googleCategoryId}]]></g:google_product_category>
      <g:fb_product_category><![CDATA[Health & Beauty > Sleeping Aids > Pillows]]></g:fb_product_category>
    </item>`).join("");

  // 2. Paquetes de Ahorro (Bundles 2x y 3x)
  const bundlesXml = productConfig.bundles.slice(1).map((b) => `
    <item>
      <g:id>OCL-BDL-${b.quantity}X</g:id>
      <g:title><![CDATA[${productConfig.name} (${b.title})]]></g:title>
      <g:description><![CDATA[Special multi-pack bundle for home & office. ${b.freeBonus || "Free USPS Priority Shipping"}. Restores healthy cervical spine lordosis naturally.]]></g:description>
      <g:link>${escapeXmlUrl(`${domain}#buy-section`)}</g:link>
      <g:image_link>${toAbsoluteUrl(productConfig.images[1] || productConfig.images[0])}</g:image_link>
      <g:brand><![CDATA[${storeConfig.storeName}]]></g:brand>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${b.originalPrice.toFixed(2)} USD</g:price>
      <g:sale_price>${b.totalPrice.toFixed(2)} USD</g:sale_price>
      <g:item_group_id>${productConfig.id}-bundles</g:item_group_id>
      <g:google_product_category><![CDATA[${productConfig.googleCategoryId}]]></g:google_product_category>
      <g:fb_product_category><![CDATA[Health & Beauty > Sleeping Aids > Pillows]]></g:fb_product_category>
    </item>`).join("");

  // 3. Accesorio Post-Purchase Upsell (Funda de Seda)
  const upsell = productConfig.postPurchaseUpsell;
  const upsellXml = `
    <item>
      <g:id>OCL-SLK-SLV-01</g:id>
      <g:title><![CDATA[OrthoCloud™ ${upsell.title}]]></g:title>
      <g:description><![CDATA[${upsell.description} 100% Pure Mulberry Silk designed exclusively for OrthoCloud cervical contours.]]></g:description>
      <g:link>${escapeXmlUrl(domain)}</g:link>
      <g:image_link>${toAbsoluteUrl(upsell.image)}</g:image_link>
      <g:brand><![CDATA[${storeConfig.storeName}]]></g:brand>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${upsell.originalPrice.toFixed(2)} USD</g:price>
      <g:sale_price>${upsell.salePrice.toFixed(2)} USD</g:sale_price>
      <g:item_group_id>orthocloud-accessories</g:item_group_id>
      <g:google_product_category><![CDATA[Home & Garden > Linens & Bedding > Bedding > Pillowcases]]></g:google_product_category>
      <g:fb_product_category><![CDATA[Home & Garden > Linens & Bedding > Bedding > Pillowcases]]></g:fb_product_category>
    </item>`;

  const itemsXml = variantsXml + bundlesXml + upsellXml;

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
