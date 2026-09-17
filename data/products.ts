import type { Product } from "@/lib/types";

// Every piece that has appeared in an edit, in the order it was added.
//
// All real, all linked. The invented rows that came with the starter files —
// "Cable-Knit Jumper", "Mary-Jane Shoes" and the rest — were removed on
// 13 September: they had no links, they were nobody's actual product, and they
// were still turning up in the shop alongside things you can genuinely buy.
//
// Prices are the LOWEST size price where a shop charges more for bigger sizes,
// so an outfit total reads as a "from" figure. Where something is reduced,
// record both: price is the original, salePrice what it costs today.
export const products: Product[] = [
  // --- The Little Pumpkins Edit · Next · added 7 Sep ---
  // Prices are Next's LOWEST size price (they rise with size), so outfit totals
  // read as a "from" figure. affiliateUrl left blank until a network is live —
  // the buttons stay inert rather than pretending to work.
  { id: "next-pumpkin-cardigan", name: "Orange Little Pumpkin Slogan Baby Cardigan", category: "Baby", retailer: "Next", price: 16.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv020275/y36496" },
  { id: "next-pumpkin-sleepsuit", name: "Orange Little Pumpkin Two Way Zip Baby Sleepsuit", category: "Baby", retailer: "Next", price: 9.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su949524/w08622" },
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
  // --- Get Cosy · added 12 Sep. A shortlist edit: these are alternatives to
  //     each other, not an outfit, so the page shows a range not a total. ---
  { id: "matalan-cream-bear-coat", name: "Baby Cream Bear Coat (0-23mths)", category: "Baby", retailer: "Matalan", price: 15.00, type: "top", onSale: true, salePrice: 13.50, affiliateUrl: "https://www.matalan.co.uk/p/childrens-clothing/baby-cream-bear-coat-0-23mths/17841668/" },
  { id: "next-blue-stripe-fleece", name: "Blue Stripe Fleece Baby Zip Jacket", category: "Baby", retailer: "Next", price: 15.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv020239/g93087" },
  { id: "next-brown-spot-borg-jacket", name: "Brown and Pink Borg Spot Hooded Baby Jacket", category: "Baby", retailer: "Next", price: 16.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su982364/v39939" },
  { id: "ms-borg-colourblock-jacket", name: "Borg Colour Block Jacket (0-5 Yrs)", category: "Girls", retailer: "M&S", price: 16.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/borg-colour-block-jacket-0-5-yrs-/p/clp61217899" },
  { id: "next-red-gingham-coat", name: "Red Gingham Shower Resistant Padded Coat", category: "Girls", retailer: "Next", price: 22.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su967020/w18087" },
  { id: "ms-gingham-puffer-coat", name: "Gingham Hooded Puffer Coat (2-8 Yrs)", category: "Girls", retailer: "M&S", price: 30.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/gingham-hooded-puffer-coat-2-8-yrs-/p/clp61216778" },
  { id: "matalan-cutsew-padded-coat", name: "Multicolour Cut and Sew Padded Coat (1-8yrs)", category: "Boys", retailer: "Matalan", price: 18.00, type: "top", onSale: true, salePrice: 16.20, affiliateUrl: "https://www.matalan.co.uk/p/childrens-clothing/boys-multicolour-cut-sew-padded-coat-1-8yrs/17835502/" },
  { id: "next-colourblock-fleece", name: "Neutral and Tan Colourblock Hooded Fleece", category: "Boys", retailer: "Next", price: 20.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su998740/w15719" },
  // Zara has no open programme — this one earns through Skimlinks, with a
  // 24-hour cookie rather than Awin's 30 days.
  { id: "zara-checkerboard-jacket", name: "Faux Shearling and Suede Checkerboard Jacket", category: "Boys", retailer: "Zara", price: 27.99, type: "top", affiliateUrl: "https://www.zara.com/gb/en/suede-faux-shearling-checkerboard-jacket-p00874574.html" },
  // --- The 'R Kid' Edit · added 12 Sep. The dearest board on the site by some
  //     way, and deliberately so: real adidas is the point of it. ---
  { id: "next-green-borg-parka", name: "Green Waterproof Borg Lined Parka", category: "Baby", retailer: "Next", price: 28.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su939843/v41083" },
  { id: "tu-red-beanie", name: "Red Knitted Beanie Hat", category: "Baby", retailer: "Tu", price: 5.00, type: "head", affiliateUrl: "https://tuclothing.sainsburys.co.uk/product/tuc146866552" },
  { id: "adidas-denim-tee-set", name: "Denim Tee Set Kids", category: "Baby", retailer: "adidas", price: 33.00, type: "top", affiliateUrl: "https://www.adidas.co.uk/denim-tee-set-kids/JC7863.html" },
  { id: "adidas-campus-00s-red", name: "Campus 00s Comfort Closure Shoes Kids", category: "Baby", retailer: "adidas", price: 50.00, type: "foot", onSale: true, salePrice: 35.00, affiliateUrl: "https://www.adidas.co.uk/campus-00s-comfort-closure-elastic-lace-shoes-kids/JI4336.html" },
  { id: "next-stripe-rib-tshirt", name: "Black and White Stripe Cotton Rich Long Sleeve Rib T-Shirt", category: "Girls", retailer: "Next", price: 5.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/st463641/253907" },
  { id: "zara-padded-jacket", name: "Water Repellent Padded Jacket", category: "Girls", retailer: "Zara", price: 25.99, type: "top", affiliateUrl: "https://www.zara.com/gb/en/water-repellent-padded-jacket-p01255550.html" },
  { id: "ms-denim-mom-jeans", name: "Denim Mom Jeans (2-8 Yrs)", category: "Girls", retailer: "M&S", price: 12.00, type: "bottom", affiliateUrl: "https://www.marksandspencer.com/denim-mom-jeans-2-8-yrs-/p/clp60720221" },
  { id: "adidas-gazelle-indoor-maroon", name: "Gazelle Indoor Shoes", category: "Girls", retailer: "adidas", price: 50.00, type: "foot", affiliateUrl: "https://www.adidas.co.uk/gazelle-indoor-shoes/KI7358.html" },
  { id: "next-superdry-everest-parka", name: "Superdry Black Everest Parka Coat", category: "Boys", retailer: "Next", price: 68.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su994494/g68932" },
  { id: "adidas-sst-tracksuit-navy", name: "SST Tracksuit", category: "Boys", retailer: "adidas", price: 40.00, type: "top", affiliateUrl: "https://www.adidas.co.uk/sst-tracksuit/HZ6613.html" },
  { id: "adidas-samba-og-white", name: "Samba OG Comfort Closure Shoes Kids", category: "Boys", retailer: "adidas", price: 50.00, type: "foot", affiliateUrl: "https://www.adidas.co.uk/samba-og-comfort-closure-elastic-lace-shoes-kids/JQ6391.html" },
  // --- The 'Girl Power' Edit · added 13 Sep. Five looks, one each. Nobody is
  //     in a costume: each one is translated into clothes a child would wear. ---
  { id: "adidas-denim-set", name: "Denim Set", category: "Girls", retailer: "adidas", price: 50.00, type: "top", affiliateUrl: "https://www.adidas.co.uk/denim-set/JC7871.html" },
  { id: "adidas-liberty-spezial", name: "adidas Liberty Handball Spezial Lace Shoes", category: "Girls", retailer: "adidas", price: 50.00, type: "foot", affiliateUrl: "https://www.adidas.co.uk/adidas-liberty-handball-spezial-lace-shoes/KH9840.html" },
  { id: "hm-flounce-cardigan-red", name: "Flounce Detail Cardigan", category: "Girls", retailer: "H&M", price: 17.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1349102002.html" },
  { id: "hm-leopard-denim-dress", name: "Bow Detail Denim Dress", category: "Girls", retailer: "H&M", price: 12.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1336030003.html" },
  { id: "hm-ribbed-cotton-top-white", name: "Ribbed Cotton Top", category: "Girls", retailer: "H&M", price: 4.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1344351001.html" },
  { id: "schuh-spezial-burgundy", name: "adidas Handball Spezial Junior", category: "Girls", retailer: "schuh", price: 45.00, type: "foot", affiliateUrl: "https://www.schuh.co.uk/kids/junior-adidas-handball-spezial-burgundy-trainers/2601543250/" },
  { id: "next-ecru-peplum-tshirt", name: "Ecru Short Sleeve Peplum T-Shirt", category: "Baby", retailer: "Next", price: 3.50, type: "top", affiliateUrl: "https://www.next.co.uk/style/su374709/e51285" },
  { id: "zara-striped-culotte-jeans", name: "Striped Culotte Jeans with Bows", category: "Baby", retailer: "Zara", price: 14.99, type: "bottom", affiliateUrl: "https://www.zara.com/gb/en/striped-culotte-jeans-with-bows-p04575004.html" },
  { id: "hm-quilted-jacket-mole", name: "Pile Lined Quilted Jacket", category: "Baby", retailer: "H&M", price: 19.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1360621002.html" },
  { id: "hm-ballet-pumps-pink", name: "Ballet Pumps", category: "Baby", retailer: "H&M", price: 9.99, type: "foot", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1341175001.html" },
  { id: "ms-bow-top-ivory", name: "Pure Cotton Bow Top (2-8 Yrs)", category: "Girls", retailer: "M&S", price: 12.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/pure-cotton-bow-top-2-8-yrs-/p/clp61223495" },
  { id: "tu-denim-pleat-skirt", name: "Blue Soft Pleat Denim Skirt", category: "Girls", retailer: "Tu", price: 11.00, type: "bottom", affiliateUrl: "https://tuclothing.sainsburys.co.uk/product/tuc148084466" },
  { id: "tu-red-frill-cardigan", name: "Red Frill Hem Sweat Cardigan", category: "Girls", retailer: "Tu", price: 5.00, type: "top", affiliateUrl: "https://tuclothing.sainsburys.co.uk/product/tuc147962407" },
  { id: "next-ri-patent-maryjane", name: "River Island Black Patent Platform Mary Jane School Shoes", category: "Girls", retailer: "Next", price: 26.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/sv001233/g84002" },
  { id: "george-black-heart-pinafore", name: "Black Heart Button Pinafore", category: "Girls", retailer: "George", price: 10.00, type: "top", affiliateUrl: "https://direct.asda.com/george/kids/dresses/black-heart-button-pinafore/G008406123,default,pd.html" },
  { id: "zara-peter-pan-tshirt", name: "Ribbed Peter Pan Collar T-Shirt", category: "Girls", retailer: "Zara", price: 8.99, type: "top", affiliateUrl: "https://www.zara.com/gb/en/ribbed-peter-pan-collar-t-shirt-p01716450.html" },
  { id: "next-black-button-cardigan", name: "Black Button Up Cardigan", category: "Girls", retailer: "Next", price: 11.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su385497/e29010" },
  { id: "next-black-velvet-maryjane", name: "Black Velvet Mary Jane Occasion Shoes", category: "Girls", retailer: "Next", price: 17.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su778272/g67500" },
  // --- The 'Muddy Puddles' Edit · added 16 Sep. A puddlesuit and a pair of
  //     wellies each, which is the whole outfit for a day like that. ---
  { id: "next-neutral-puddlesuit", name: "Neutral Waterproof Fleece Lined Puddlesuit (3mths-7yrs)", category: "Baby", retailer: "Next", price: 22.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su148815/h34912" },
  { id: "next-lion-ankle-wellies", name: "Neutral Lion Warm Lined Ankle Wellies", category: "Baby", retailer: "Next", price: 15.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/st529486/g68171" },
  { id: "next-sage-puddlesuit", name: "Sage Green Waterproof Fleece Lined Puddlesuit (3mths-7yrs)", category: "Girls", retailer: "Next", price: 20.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su749685/h21330" },
  // Mountain Warehouse isn't on Awin — this one earns through Skimlinks or
  // Sovrn. Kept anyway: it's the right welly, which matters more.
  { id: "mw-colour-changing-wellies", name: "Grass and Air Kids Colour Changing Winter Wellies", category: "Girls", retailer: "Mountain Warehouse", price: 28.00, type: "foot", affiliateUrl: "https://www.mountainwarehouse.com/p/m78858/grass-air/kids-colour-changing-winter-wellies/orchid-pink/" },
  { id: "next-cool-vibes-puddlesuit", name: "Cool Vibes Grey and Blue Waterproof Fleece Lined Puddlesuit (3mths-7yrs)", category: "Boys", retailer: "Next", price: 22.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su148815/y98860" },
  { id: "debenhams-shaun-wellies", name: "TOG24 Border Shaun the Sheep Wellies", category: "Boys", retailer: "Debenhams", price: 38.00, type: "foot", onSale: true, salePrice: 15.00, affiliateUrl: "https://www.debenhams.com/product/tog24-border-shaun-the-sheep-wellies_p-89deb736-81a1-4677-9132-a0975803f811" },
  // --- Wrapped Up · added 17 Sep. Pramsuits, three to choose from in each of
  //     girls, boys and unisex. A shortlist, so the page shows ranges. ---
  { id: "hm-padded-pramsuit-cherries", name: "Padded Pramsuit", category: "Baby", retailer: "H&M", price: 19.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1354914001.html" },
  { id: "next-checkerboard-allinone", name: "Pink and Red Checkerboard Borg Hooded Baby All-In-One", category: "Baby", retailer: "Next", price: 26.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su989906/v42986" },
  { id: "george-pink-borg-snowsuit", name: "Pink Embroidered Borg Snowsuit", category: "Baby", retailer: "George", price: 18.00, type: "top", affiliateUrl: "https://direct.asda.com/george/baby/coats-pramsuits/pink-embroidered-borg-snowsuit/G008390032,default,pd.html" },
  { id: "ms-borg-double-zip-pramsuit", name: "Borg Double Zip Pramsuit (0-12 Mths)", category: "Baby", retailer: "M&S", price: 24.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/borg-double-zip-pramsuit-0-12-mths-/p/clp61218141" },
  { id: "hm-padded-jersey-pramsuit", name: "Padded Jersey Pramsuit", category: "Baby", retailer: "H&M", price: 19.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1239371005.html" },
  { id: "next-blue-stripe-pramsuit", name: "Blue Stripe Borg Button Hooded Baby Pramsuit", category: "Baby", retailer: "Next", price: 22.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv020245/g93094" },
  { id: "next-little-one-pramsuit", name: "Cream Little One Back Slogan Quilted Nylon Pramsuit", category: "Baby", retailer: "Next", price: 28.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv020281/g93117" },
  { id: "hm-pile-pramsuit-ears", name: "Pile Pram Suit with Ears", category: "Baby", retailer: "H&M", price: 14.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1230866001.html" },
  { id: "mp-faux-fur-pramsuit", name: "Faux Fur Pramsuit", category: "Baby", retailer: "Mamas & Papas", price: 45.00, type: "top", affiliateUrl: "https://www.mamasandpapas.com/products/faux-fur-pramsuit-nb-s07gn9kb0" },
];

/** What a piece actually costs today — the sale price when there is one.
 *  Outfit totals must agree with the price on the card, and with the figure
 *  printed on the board. */
export function priceOf(p: Product): number {
  return p.onSale && p.salePrice ? p.salePrice : p.price;
}

/** What a look costs, in the terms that make sense for what it is.
 *
 *  An outfit is bought whole, so it has a total. A shortlist is a choose-one,
 *  so it has a cheapest and a dearest and no total at all. `from` is what both
 *  have in common — the least you could spend — which is what the price filter
 *  sorts on. */
export function costOf(look: { kind?: "outfit" | "shortlist"; productIds: string[] }) {
  const prices = look.productIds
    .map(getProduct)
    .filter(Boolean)
    .map((p) => priceOf(p as Product));

  if (!prices.length) return { kind: "outfit" as const, total: 0, from: 0, to: 0 };

  if (look.kind === "shortlist") {
    const from = Math.min(...prices);
    const to = Math.max(...prices);
    return { kind: "shortlist" as const, total: 0, from, to };
  }

  const total = prices.reduce((s, n) => s + n, 0);
  return { kind: "outfit" as const, total, from: total, to: total };
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
