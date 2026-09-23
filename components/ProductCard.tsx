import { site } from "@/lib/site";
import { popFor } from "@/lib/pops";
import { affiliateHref, canShowImage } from "@/lib/affiliate";
import type { Product } from "@/lib/types";
import GarmentIcon from "./GarmentIcon";
import AffiliateLink from "./AffiliateLink";

export default function ProductCard({ product }: { product: Product }) {
  // Was two oatmeal tints split by category, which made a shop page of thirty
  // products read as one large beige rectangle. Now a bright per-product
  // colour, and the icon goes ink on all of them — a tinted icon on a tinted
  // tile was the other half of why these disappeared.
  const iconBg = popFor(product.id);
  const iconColor = "#4A372A";
  const price = product.onSale && product.salePrice ? product.salePrice : product.price;

  return (
    <div className="bg-card rounded-2xl p-5 flex flex-col gap-3.5 transition-transform hover:-translate-y-1 hover:shadow-lg">
      {/* The retailer's own photograph, served from the retailer's own server.
          Deliberately a plain <img> rather than next/image: optimising it would
          copy the file through our server, and the whole point is that we are
          displaying their picture from where they host it, which they can stop
          at any time. The garment icon stays as the fallback for anything
          without a photo yet. */}
      <div className={`w-full h-[190px] rounded-xl ${iconBg} flex items-center justify-center relative overflow-hidden`}>
        {site.showProductImages && canShowImage(product.retailer) && product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        ) : (
          <GarmentIcon type={product.type} color={iconColor} size={44} />
        )}
        {product.onSale && (
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-pill bg-ink text-cream">
            Sale
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <span className="inline-block w-fit text-xs font-bold tracking-wide px-3 py-1 rounded-pill bg-footer text-ink-soft">
          {product.category}
        </span>
        <h3 className="font-display text-[17px] font-semibold text-ink flex-1">{product.name}</h3>
        <span className="text-[15px] font-bold text-ink">
          £{price.toFixed(2)}
          {product.onSale && product.salePrice && (
            <span className="ml-2 text-sm font-medium text-ink-faint line-through">
              £{product.price.toFixed(2)}
            </span>
          )}
        </span>
      </div>
      <AffiliateLink href={affiliateHref(product)} retailer={product.retailer} />
    </div>
  );
}
