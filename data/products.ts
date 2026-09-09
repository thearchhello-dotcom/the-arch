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
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
