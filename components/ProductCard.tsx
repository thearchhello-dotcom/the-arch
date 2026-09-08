import type { Product } from "@/lib/types";
import GarmentIcon from "./GarmentIcon";
import AffiliateLink from "./AffiliateLink";

const GIRL_SIDE: Product["category"][] = ["Baby", "Girls"];

export default function ProductCard({ product }: { product: Product }) {
  const isGirlSide = GIRL_SIDE.includes(product.category);
  const iconBg = isGirlSide ? "bg-tile1" : "bg-tile2";
  const iconColor = isGirlSide ? "#C96849" : "#8FA383";
  const price = product.onSale && product.salePrice ? product.salePrice : product.price;

  return (
    <div className="bg-card rounded-2xl p-5 flex flex-col gap-3.5 transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className={`w-full h-[150px] rounded-xl ${iconBg} flex items-center justify-center relative`}>
        <GarmentIcon type={product.type} color={iconColor} size={44} />
        {product.onSale && (
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-pill bg-terracotta text-card">
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
      <AffiliateLink href={product.affiliateUrl} retailer={product.retailer} />
    </div>
  );
}
