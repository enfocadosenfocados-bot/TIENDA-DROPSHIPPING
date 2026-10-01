# 🚀 One-Product Store Framework & Funnel Engine
### Plataforma de Venta de 1 Producto de Alta Conversión ($0/mes de cuotas fijas vs $120/mes de Amboras)

Esta tienda fue construida con **Next.js 15, TypeScript, Tailwind CSS y Stripe**, diseñada específicamente para funnels de e-commerce de 1 solo producto con optimización de tasa de conversión (CRO), feeds multicanal para redes sociales, píxeles server-side (CAPI) y despacho automático a dropshipping.

---

## 🌟 Qué incluye esta plataforma (Todo ya probado y funcionando):

1. **Storefront de Alta Conversión (CRO)**:
   - **Barra de Anuncios con Temporizador**: Urgencia en vivo con cuenta regresiva regresiva de 15 minutos y envío gratis.
   - **Hero Interactivo**: Selector de variantes de color con previsualización dinámica.
   - **Selector de Paquetes con Descuento (Quantity Breaks)**:
     - 1x Unidad: $49.99
     - 2x Unidades: $79.98 ($39.99 c/u - *Más Popular / Ahorra $130*)
     - 3x Unidades: $99.99 ($33.33 c/u - *Mejor Valor / Ahorra $200*)
   - **Pre-Purchase Order Bump**: Checkbox para agregar garantía VIP extendida por $4.99 antes de pagar.
   - **Sticky Add-to-Cart Flotante para Móviles**: Aparece automáticamente tras 500px de scroll con botón de compra instantáneo.
   - **Desglose Anatómico y de Beneficios**: Tarjetas visuales de valor y solución al dolor.
   - **Tabla Comparativa vs Competencia**: Contraste directo contra alternativas baratas.
   - **Reseñas con Fotos y Microdatos SEO JSON-LD**: Insignias de compradores verificados, votos de utilidad y esquema `schema.org/Product` para que Google muestre las estrellas doradas en búsquedas orgánicas.
   - **Acordeón de Preguntas Frecuentes (FAQ)**: Resuelve objeciones de envío, garantía y uso.
   - **Exit-Intent Pop-up Modal**: Se activa cuando el usuario va a cerrar la pestaña y le entrega el cupón `SAVE10` a cambio de su correo/SMS (conectado a Klaviyo).

2. **Pasarela Stripe + Post-Purchase 1-Click Upsell**:
   - Soporte para **Apple Pay, Google Pay y Tarjetas**.
   - **One-Click Post-Purchase Upsell (`/upsell`)**: Al pagar la orden principal, en lugar de ir directo al Thank You, se le ofrece un producto complementario (funda de seda) con 50% de descuento. Si presiona *"Añadir a mi orden"*, Stripe cobra con 1 solo clic usando el método de pago guardado **sin pedir datos de tarjeta**.

3. **Canales de Venta Directos & Feeds de Catálogo**:
   - Meta (Facebook & Instagram Shop): `http://localhost:3000/api/catalog/meta`
   - Google Shopping & Merchant Center: `http://localhost:3000/api/catalog/google`
   - Pinterest Product Pins: `http://localhost:3000/api/catalog/pinterest`
   - Snapchat Dynamic Ads: `http://localhost:3000/api/catalog/snapchat`

4. **Atribución & Píxeles CAPI Server-Side**:
   - Meta Conversions API (CAPI) + Pixel con deduplicación por `event_id` y Advanced Matching hasheado con SHA-256.
   - TikTok Events API + Pixel.
   - Google Tag / Ads Enhanced Conversions.
   - Pinterest Tag.

5. **Automatización Dropshipping**:
   - Despacho automático a **CJ Dropshipping Open API** (`createOrder`).
   - Despacho automático a **Teemdrop API**.
   - Descarga de órdenes por lote en CSV con 1 clic (`/api/orders/export?format=cj` o `?format=teemdrop`).

6. **Páginas de Confianza & Cumplimiento en USA**:
   - Tracking con logo propio (`/track-order`) para guías de USPS y AfterShip.
   - Políticas obligatorias para Meta y Google: `/policies/shipping`, `/policies/refund`, `/policies/privacy`, `/policies/terms`.

---

## 🛠️ Cómo cambiar el producto en 1 minuto

Toda la tienda se controla desde **un único archivo**:
`src/config/product.ts`

Solo abre ese archivo y modifica:
* `name`: Nombre de tu producto.
* `tagline`: Beneficio principal.
* `images`: URLs de tus fotos de alta resolución.
* `price` y `originalPrice`: Precios base.
* `variants`: Colores o tallas con sus SKUs.
* `bundles`: Los paquetes de 1x, 2x y 3x con sus descuentos.
* `dropshipping.cjSku` / `teemdropSku`: El SKU de tu proveedor.
* `reviews`: Nombres y fotos de tus testimonios.

¡La tienda, los feeds de Facebook y Google, y los webhooks se actualizarán al instante!

---

## 🔑 Configurar tus credenciales de producción

1. Copia `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Rellena tus API Keys:
   - `STRIPE_SECRET_KEY` y `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (de [dashboard.stripe.com](https://dashboard.stripe.com))
   - `META_PIXEL_ID` y `META_CAPI_ACCESS_TOKEN` (del Administrador de Eventos de Meta)
   - `KLAVIYO_API_KEY` (de [klaviyo.com](https://klaviyo.com))
   - `CJ_DROPSHIPPING_ACCESS_TOKEN` o `TEEMDROP_API_KEY`

---

## 🌐 Cómo desplegar a internet en 2 minutos (Hosting $0.00/mes)

1. Sube este proyecto a tu GitHub:
   ```bash
   git add .
   git commit -m "Tienda de 1 producto lista"
   git push origin main
   ```
2. Entra a [vercel.com](https://vercel.com) (cuenta gratuita) y dale a **"Add New Project"**.
3. Selecciona tu repositorio de GitHub.
4. En **Environment Variables**, pega las mismas variables de tu `.env.local`.
5. Dale clic a **"Deploy"**.

En menos de 60 segundos tendrás tu tienda online con:
- Servidores CDN ultra-rápidos en todo el mundo (TTFB < 50ms).
- Certificado SSL HTTPS gratuito.
- Puedes conectar tu propio dominio `.com` con 2 clics en la pestaña *Settings > Domains*.

---

## 🧪 Pruebas automáticas de rutas e integraciones

Para comprobar que todo responde correctamente:
```bash
node scripts/test-integrations.mjs
```
Verifica las 16 rutas principales, incluyendo el checkout, feeds XML de Google y Meta, y llamadas de CAPI.
