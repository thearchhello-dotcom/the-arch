import type { Product } from "@/lib/types";

// Sample catalogue matching the mockups. Replace with real rows once an affiliate
// network feed (Awin / Skimlinks / Sovrn — see the build brief) is connected;
// affiliateUrl and imageUrl are intentionally left blank until then.
export const products: Product[] = [
  { id: "bg-jumper", name: "Cable-Knit Jumper", category: "Baby", retailer: "H&M", price: 17.99, type: "top" },
  { id: "bg-dungarees", name: "Corduroy Dungarees", category: "Baby", retailer: "H&M", price: 19.99, type: "bottom" },
  { id: "bg-bonnet", name: "Knit Bonnet", category: "Baby", retailer: "H&M", price: 7.99, type: "head" },

  { id: "bb-jumper", name: "Ribbed Jumper", category: "Baby", retailer: "H&M", price: 15.99, type: "top" },
  { id: "bb-trousers", name: "Fleece-Lined Trousers", category: "Baby", retailer: "H&M", price: 14.99, type: "bottom" },
  { id: "bb-booties", name: "Knit Booties", category: "Baby", retailer: "H&M", price: 6.99, type: "foot" },

  { id: "g-cardigan", name: "Chunky Knit Cardigan", category: "Girls", retailer: "H&M", price: 22.99, type: "top" },
  { id: "g-skirt", name: "Pleated Midi Skirt", category: "Girls", retailer: "H&M", price: 16.99, type: "bottom" },
  { id: "g-shoes", name: "Mary-Jane Shoes", category: "Girls", retailer: "H&M", price: 24.99, type: "foot" },

  { id: "b-jumper", name: "Wool-Blend Jumper", category: "Boys", retailer: "M&S", price: 18.00, type: "top" },
  { id: "b-trousers", name: "Tapered Trousers", category: "Boys", retailer: "M&S", price: 16.00, type: "bottom" },
  { id: "b-beanie", name: "Knit Beanie", category: "Boys", retailer: "H&M", price: 8.99, type: "head" },
  { id: "b-boots", name: "Leather-Look Boots", category: "Boys", retailer: "Next", price: 28.00, type: "foot" },
  // --- The Little Pumpkins Edit · Next · added 7 Sep ---
  // Prices are Next's LOWEST size price (they rise with size), so outfit totals
  // read as a "from" figure. affiliateUrl left blank until a network is live —
  // the buttons stay inert rather than pretending to work.
  { id: "next-pumpkin-cardigan", name: "Orange Little Pumpkin Slogan Baby Cardigan", category: "Baby", retailer: "Next", price: 16.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv020275/y36496" },
  { id: "next-pumpkin-sleepsuit", name: "Orange Little Pumpkin Two Way Zip Baby Sleepsuit", category: "Baby", retailer: "Next", price: 9.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su949524/w08622" },
  { id: "next-ghost-sleepsuit", name: "Glow In The Dark Two Way Zip Baby Sleepsuit", category: "Baby", retailer: "Next", price: 9.00, type: "top" },
  // --- The Halloween Edit · Next · added 7 Sep ---
  { id: "next-ghost-tshirt", name: "Black Glow in the Dark Long Sleeve Halloween T-Shirt", category: "Boys", retailer: "Next", price: 7.50, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv154090/w16758" },
  { id: "next-black-cargos", name: "Black Denim Wide Leg Pull On Cargo Jeans", category: "Boys", retailer: "Next", price: 12.00, type: "bottom", affiliateUrl: "https://www.next.co.uk/style/su368140/e45338" },
  { id: "next-black-trainers", name: "Black and White Touch Fastening Trainers", category: "Boys", retailer: "Next", price: 18.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su345525/h56567" },
  { id: "next-ecru-fleece", name: "Multi Bright Ecru Zip Through Fleece", category: "Boys", retailer: "Next", price: 20.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su998742/w15720" },
  { id: "next-pumpkin-booties", name: "Neutral Pumpkin Baby Sock Top Boot Shoes", category: "Baby", retailer: "Next", price: 9.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/sv260875/v60315" },
  // --- Girls · Next · added 7 Sep ---
  { id: "koko-pumpkin-sweatshirt", name: "Koko Blossom Cream Cutest Halloween Pumpkin Patch Sweatshirt", category: "Girls", retailer: "Next", price: 24.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su528818/av0223" },
  { id: "next-pumpkin-pie-cardigan", name: "Orange Pumpkin Pie V-Neck Cardigan", category: "Girls", retailer: "Next", price: 18.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su748375/w11245" },
  { id: "next-spot-barrel-jeans", name: "Blue Spot Pull-On Barrel Jeans", category: "Girls", retailer: "Next", price: 13.00, type: "bottom", affiliateUrl: "https://www.next.co.uk/style/su758609/h52075" },
  { id: "next-white-hightops", name: "White Canvas Lace Up High Top Trainers", category: "Girls", retailer: "Next", price: 22.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su553893/h67070" },
  // --- The Little Pumpkins Edit · added 10 Sep. Five shops, so no single-delivery
  //     promise on this one — the thread is the pumpkin print, not the receipt. ---
  { id: "ms-pumpkin-sweat-set", name: "Cotton Rich Halloween Pumpkin Sweat Set (0-3 Yrs)", category: "Baby", retailer: "M&S", price: 14.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/cotton-rich-halloween-pumpkin-sweat-set-0-3-yrs-/p/clp61224966" },
  { id: "ms-borg-jacket-ears", name: "Hooded Borg Jacket with Ears (0-4 Yrs)", category: "Baby", retailer: "M&S", price: 18.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/hooded-borg-jacket-with-ears-0-4-yrs-/p/clp61217700" },
  { id: "ms-borg-pram-boots", name: "Baby Borg Bear Pram Boots (0-18 Mths)", category: "Baby", retailer: "M&S", price: 10.00, type: "foot", affiliateUrl: "https://www.marksandspencer.com/baby-borg-bear-pram-boots-0-18-mths-/p/clp61223187" },
  { id: "george-pumpkin-picker-knit", name: "Cream Pumpkin Picker Chunky Knitted Jumper", category: "Girls", retailer: "George", price: 10.00, type: "top", affiliateUrl: "https://direct.asda.com/george/kids/jumpers-cardigans/cream-pumpkin-picker-chunky-knitted-jumper/G008414638,default,pd.html" },
  { id: "hm-cord-skirt", name: "Corduroy Skirt", category: "Girls", retailer: "H&M", price: 12.99, type: "bottom", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1350019003.html" },
  { id: "hm-overlock-socks", name: "3 Pack Overlock Detail Socks", category: "Girls", retailer: "H&M", price: 5.99, type: "foot", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1235464011.html" },
  { id: "ms-suede-ankle-boots", name: "Suede Pull-On Ankle Boots", category: "Girls", retailer: "M&S", price: 22.00, type: "foot", affiliateUrl: "https://www.marksandspencer.com/kids-suede-pull-on-ankle-boots-4-small-6-large-/p/clp60736203" },
  { id: "matalan-skating-pumpkin-sweat", name: "Stone Skating Pumpkin Sweatshirt (1-8yrs)", category: "Boys", retailer: "Matalan", price: 7.00, type: "top", onSale: true, salePrice: 6.30, affiliateUrl: "https://www.matalan.co.uk/p/childrens-clothing/boys-stone-skating-pumpkin-sweatshirt-1-8yrs/17835939/" },
  { id: "tu-checkerboard-beanie", name: "Mono Checkerboard Beanie Hat", category: "Boys", retailer: "Tu", price: 7.00, type: "head", affiliateUrl: "https://tuclothing.sainsburys.co.uk/product/tuc148238971" },
  { id: "next-neutral-trainers", name: "Neutral and White Touch Fastening Trainers", category: "Boys", retailer: "Next", price: 18.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su345525/w63356" },
  { id: "next-black-wide-jeans", name: "Black Denim Wide Fit Jeans (3mths-7yrs)", category: "Boys", retailer: "Next", price: 15.00, type: "bottom", affiliateUrl: "https://www.next.co.uk/style/sv154520/g55829" },
  // --- Little Boo · added 12 Sep. Each outfit is kept to one shop, so each
  //     one is a single delivery and a single returns slip. ---
  { id: "next-neutral-halloween-sleepsuit", name: "Neutral My First Halloween Two Way Zip Baby Sleepsuit", category: "Baby", retailer: "Next", price: 9.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su949524/g57000" },
  { id: "next-pumpkin-slip-on-shoes", name: "Orange Pumpkin Baby Slip-On Shoes", category: "Baby", retailer: "Next", price: 9.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/sv278078/g63089" },
  { id: "next-blue-pumpkin-set", name: "Blue Pumpkin Top and Legging Baby Set", category: "Baby", retailer: "Next", price: 11.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv034457/g95284" },
  { id: "next-neutral-baby-trainers", name: "Neutral Touch Fastening Baby Trainers", category: "Baby", retailer: "Next", price: 7.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su807131/e70981" },
  { id: "ms-halloween-pumpkin-sweatshirt", name: "Cotton Rich Halloween Pumpkin Sweatshirt (0-5 Yrs)", category: "Baby", retailer: "M&S", price: 8.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/cotton-rich-halloween-pumpkin-sweatshirt-0-5-yrs-/p/clp61224826" },
  { id: "ms-cord-trousers", name: "Pure Cotton Cord Trousers (0-5 Yrs)", category: "Baby", retailer: "M&S", price: 10.00, type: "bottom", affiliateUrl: "https://www.marksandspencer.com/pure-cotton-cord-trousers-0-5-yrs-/p/clp61232556" },
  { id: "ms-first-walker-trainers", name: "First Walker Suede Riptape Trainers", category: "Baby", retailer: "M&S", price: 24.00, type: "foot", affiliateUrl: "https://www.marksandspencer.com/kids-first-walker-suede-riptape-trainers-2-5-small-/p/clp60788363" },
];

/** What a piece actually costs today — the sale price when there is one.
 *  Outfit totals must agree with the price on the card, and with the figure
 *  printed on the board. */
export function priceOf(p: Product): number {
  return p.onSale && p.salePrice ? p.salePrice : p.price;
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
