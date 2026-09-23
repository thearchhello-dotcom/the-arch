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
//
// IMAGES: THE ARCH SHOWS CLOTHES, NOT CHILDREN.
//
// Every imageUrl here must be the garment on its own — a laydown, a flat shot,
// a hanger. Never a photograph of a child wearing it.
//
// Two reasons, and the second is the one that settles it:
//
//  1. It is what the site already looks like. Every board Gemma has made is
//     cut-outs on cream, with nobody in them. A shop page full of child models
//     would not match the edits it sits beside.
//
//  2. A retailer's release from that child's parents covers the retailer's
//     use of the photograph. It does not extend to us, and no affiliate
//     approval changes that. Product feeds carry model shots too, so this
//     stays true after the programmes come through: when picking from a feed,
//     take the laydown image, never the model.
//
// If a product only exists as a model shot, use no image at all. The garment
// icon is a perfectly good fallback and always will be.
export const products: Product[] = [
  // --- The Little Pumpkins Edit · Next · added 7 Sep ---
  // Prices are Next's LOWEST size price (they rise with size), so outfit totals
  // read as a "from" figure. affiliateUrl left blank until a network is live —
  // the buttons stay inert rather than pretending to work.
  { id: "next-pumpkin-cardigan", name: "Orange Little Pumpkin Slogan Baby Cardigan", category: "Baby", retailer: "Next", price: 16.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv020275/y36496", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y36496s.jpg?im=Resize,width=600" },
  { id: "next-pumpkin-sleepsuit", name: "Orange Little Pumpkin Two Way Zip Baby Sleepsuit", category: "Baby", retailer: "Next", price: 9.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su949524/w08622", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W08622s.jpg?im=Resize,width=600" },
  // --- The Halloween Edit · Next · added 7 Sep ---
  { id: "next-ghost-tshirt", name: "Black Glow in the Dark Long Sleeve Halloween T-Shirt", category: "Boys", retailer: "Next", price: 7.50, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv154090/w16758", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W16758s.jpg?im=Resize,width=600" },
  { id: "next-black-cargos", name: "Black Denim Wide Leg Pull On Cargo Jeans", category: "Boys", retailer: "Next", price: 12.00, type: "bottom", affiliateUrl: "https://www.next.co.uk/style/su368140/e45338", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/E45338s.jpg?im=Resize,width=600" },
  { id: "next-black-trainers", name: "Black and White Touch Fastening Trainers", category: "Boys", retailer: "Next", price: 18.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su345525/h56567", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H56567s.jpg?im=Resize,width=600" },
  { id: "next-ecru-fleece", name: "Multi Bright Ecru Zip Through Fleece", category: "Boys", retailer: "Next", price: 20.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su998742/w15720", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W15720s.jpg?im=Resize,width=600" },
  { id: "next-pumpkin-booties", name: "Neutral Pumpkin Baby Sock Top Boot Shoes", category: "Baby", retailer: "Next", price: 9.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/sv260875/v60315", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V60315s.jpg?im=Resize,width=600" },
  // --- Girls · Next · added 7 Sep ---
  { id: "koko-pumpkin-sweatshirt", name: "Koko Blossom Cream Cutest Halloween Pumpkin Patch Sweatshirt", category: "Girls", retailer: "Next", price: 24.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su528818/av0223", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AV0223s.jpg?im=Resize,width=600" },
  { id: "next-pumpkin-pie-cardigan", name: "Orange Pumpkin Pie V-Neck Cardigan", category: "Girls", retailer: "Next", price: 18.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su748375/w11245", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W11245s.jpg?im=Resize,width=600" },
  { id: "next-spot-barrel-jeans", name: "Blue Spot Pull-On Barrel Jeans", category: "Girls", retailer: "Next", price: 13.00, type: "bottom", affiliateUrl: "https://www.next.co.uk/style/su758609/h52075", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H52075s.jpg?im=Resize,width=600" },
  { id: "next-white-hightops", name: "White Canvas Lace Up High Top Trainers", category: "Girls", retailer: "Next", price: 22.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su553893/h67070", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H67070s.jpg?im=Resize,width=600" },
  // --- The Little Pumpkins Edit · added 10 Sep. Five shops, so no single-delivery
  //     promise on this one — the thread is the pumpkin print, not the receipt. ---
  { id: "ms-pumpkin-sweat-set", name: "Cotton Rich Halloween Pumpkin Sweat Set (0-3 Yrs)", category: "Baby", retailer: "M&S", price: 14.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/cotton-rich-halloween-pumpkin-sweat-set-0-3-yrs-/p/clp61224966", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T78_2172E_K4_X_EC_90" },
  { id: "ms-borg-jacket-ears", name: "Hooded Borg Jacket with Ears (0-4 Yrs)", category: "Baby", retailer: "M&S", price: 18.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/hooded-borg-jacket-with-ears-0-4-yrs-/p/clp61217700", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T78_2079Y_A4_X_EC_90" },
  { id: "ms-borg-pram-boots", name: "Baby Borg Bear Pram Boots (0-18 Mths)", category: "Baby", retailer: "M&S", price: 10.00, type: "foot", affiliateUrl: "https://www.marksandspencer.com/baby-borg-bear-pram-boots-0-18-mths-/p/clp61223187", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T72_3541P_K0_X_EC_0" },
  { id: "george-pumpkin-picker-knit", name: "Cream Pumpkin Picker Chunky Knitted Jumper", category: "Girls", retailer: "George", price: 10.00, type: "top", affiliateUrl: "https://direct.asda.com/george/kids/jumpers-cardigans/cream-pumpkin-picker-chunky-knitted-jumper/G008414638,default,pd.html", imageUrl: "https://asda.scene7.com/is/image/Asda/5059206569618?hei=200&amp;wid=200&amp;qlt=85&amp;fmt=pjpg&amp;resmode=sharp2&amp;op_usm=1.1,0.5,0,0&amp;defaultimage=default_details_George_rd" },
  { id: "hm-cord-skirt", name: "Corduroy Skirt", category: "Girls", retailer: "H&M", price: 12.99, type: "bottom", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1350019003.html", imageUrl: "https://image.hm.com/assets/hm/3c/f5/3cf5c9e657c76b2c987d80be24fd74216c592ce6.jpg?imwidth=600" },
  { id: "hm-overlock-socks", name: "3 Pack Overlock Detail Socks", category: "Girls", retailer: "H&M", price: 5.99, type: "foot", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1235464011.html", imageUrl: "https://image.hm.com/assets/hm/15/cd/15cd528b33c4542e9e84af70549a68074e8e8ef1.jpg?imwidth=600" },
  { id: "ms-suede-ankle-boots", name: "Suede Pull-On Ankle Boots", category: "Girls", retailer: "M&S", price: 22.00, type: "foot", affiliateUrl: "https://www.marksandspencer.com/kids-suede-pull-on-ankle-boots-4-small-6-large-/p/clp60736203", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T72_6708N_N0_X_EC_90" },
  { id: "matalan-skating-pumpkin-sweat", name: "Stone Skating Pumpkin Sweatshirt (1-8yrs)", category: "Boys", retailer: "Matalan", price: 7.00, type: "top", onSale: true, salePrice: 6.30, affiliateUrl: "https://www.matalan.co.uk/p/childrens-clothing/boys-stone-skating-pumpkin-sweatshirt-1-8yrs/17835939/", imageUrl: "https://ml.thcdn.com/productimg/original/17835939-1755334737792139.jpg" },
  { id: "tu-checkerboard-beanie", name: "Mono Checkerboard Beanie Hat", category: "Boys", retailer: "Tu", price: 7.00, type: "head", affiliateUrl: "https://tuclothing.sainsburys.co.uk/product/tuc148238971", imageUrl: "//media.4rgos.it/s/Argos/tuc148238971_R_SET?$Main768$&amp;w=620&amp;h=620" },
  { id: "next-neutral-trainers", name: "Neutral and White Touch Fastening Trainers", category: "Boys", retailer: "Next", price: 18.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su345525/w63356", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W63356s.jpg?im=Resize,width=600" },
  { id: "next-black-wide-jeans", name: "Black Denim Wide Fit Jeans (3mths-7yrs)", category: "Boys", retailer: "Next", price: 15.00, type: "bottom", affiliateUrl: "https://www.next.co.uk/style/sv154520/g55829", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G55829s.jpg?im=Resize,width=600" },
  // --- Little Boo · added 12 Sep. Each outfit is kept to one shop, so each
  //     one is a single delivery and a single returns slip. ---
  { id: "next-neutral-halloween-sleepsuit", name: "Neutral My First Halloween Two Way Zip Baby Sleepsuit", category: "Baby", retailer: "Next", price: 9.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su949524/g57000", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G57000s.jpg?im=Resize,width=600" },
  { id: "next-pumpkin-slip-on-shoes", name: "Orange Pumpkin Baby Slip-On Shoes", category: "Baby", retailer: "Next", price: 9.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/sv278078/g63089", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G63089s.jpg?im=Resize,width=600" },
  { id: "next-blue-pumpkin-set", name: "Blue Pumpkin Top and Legging Baby Set", category: "Baby", retailer: "Next", price: 11.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv034457/g95284", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G95284s.jpg?im=Resize,width=600" },
  { id: "next-neutral-baby-trainers", name: "Neutral Touch Fastening Baby Trainers", category: "Baby", retailer: "Next", price: 7.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su807131/e70981", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/E70981s.jpg?im=Resize,width=600" },
  { id: "ms-halloween-pumpkin-sweatshirt", name: "Cotton Rich Halloween Pumpkin Sweatshirt (0-5 Yrs)", category: "Baby", retailer: "M&S", price: 8.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/cotton-rich-halloween-pumpkin-sweatshirt-0-5-yrs-/p/clp61224826", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T78_2049T_P0_X_EC_90" },
  { id: "ms-cord-trousers", name: "Pure Cotton Cord Trousers (0-5 Yrs)", category: "Baby", retailer: "M&S", price: 10.00, type: "bottom", affiliateUrl: "https://www.marksandspencer.com/pure-cotton-cord-trousers-0-5-yrs-/p/clp61232556", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T78_4033T_JP_X_EC_90" },
  { id: "ms-first-walker-trainers", name: "First Walker Suede Riptape Trainers", category: "Baby", retailer: "M&S", price: 24.00, type: "foot", affiliateUrl: "https://www.marksandspencer.com/kids-first-walker-suede-riptape-trainers-2-5-small-/p/clp60788363", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T72_1011C_E4_X_EC_90" },
  // --- Get Cosy · added 12 Sep. A shortlist edit: these are alternatives to
  //     each other, not an outfit, so the page shows a range not a total. ---
  { id: "matalan-cream-bear-coat", name: "Baby Cream Bear Coat (0-23mths)", category: "Baby", retailer: "Matalan", price: 15.00, type: "top", onSale: true, salePrice: 13.50, affiliateUrl: "https://www.matalan.co.uk/p/childrens-clothing/baby-cream-bear-coat-0-23mths/17841668/", imageUrl: "https://ml.thcdn.com/productimg/original/17841668-7575356514095572.jpg" },
  { id: "next-blue-stripe-fleece", name: "Blue Stripe Fleece Baby Zip Jacket", category: "Baby", retailer: "Next", price: 15.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv020239/g93087", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G93087s.jpg?im=Resize,width=600" },
  { id: "next-brown-spot-borg-jacket", name: "Brown and Pink Borg Spot Hooded Baby Jacket", category: "Baby", retailer: "Next", price: 16.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su982364/v39939", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V39939s.jpg?im=Resize,width=600" },
  { id: "ms-borg-colourblock-jacket", name: "Borg Colour Block Jacket (0-5 Yrs)", category: "Girls", retailer: "M&S", price: 16.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/borg-colour-block-jacket-0-5-yrs-/p/clp61217899", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T78_2081Y_K4_X_EC_90" },
  { id: "next-red-gingham-coat", name: "Red Gingham Shower Resistant Padded Coat", category: "Girls", retailer: "Next", price: 22.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su967020/w18087", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W18087s.jpg?im=Resize,width=600" },
  { id: "ms-gingham-puffer-coat", name: "Gingham Hooded Puffer Coat (2-8 Yrs)", category: "Girls", retailer: "M&S", price: 30.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/gingham-hooded-puffer-coat-2-8-yrs-/p/clp61216778", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T77_5445W_B4_X_EC_90" },
  { id: "matalan-cutsew-padded-coat", name: "Multicolour Cut and Sew Padded Coat (1-8yrs)", category: "Boys", retailer: "Matalan", price: 18.00, type: "top", onSale: true, salePrice: 16.20, affiliateUrl: "https://www.matalan.co.uk/p/childrens-clothing/boys-multicolour-cut-sew-padded-coat-1-8yrs/17835502/", imageUrl: "https://ml.thcdn.com/productimg/original/17835502-1155353954167903.jpg" },
  { id: "next-colourblock-fleece", name: "Neutral and Tan Colourblock Hooded Fleece", category: "Boys", retailer: "Next", price: 20.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su998740/w15719", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W15719s.jpg?im=Resize,width=600" },
  // Zara has no open programme — this one earns through Skimlinks, with a
  // 24-hour cookie rather than Awin's 30 days.
  { id: "zara-checkerboard-jacket", name: "Faux Shearling and Suede Checkerboard Jacket", category: "Boys", retailer: "Zara", price: 27.99, type: "top", affiliateUrl: "https://www.zara.com/gb/en/suede-faux-shearling-checkerboard-jacket-p00874574.html", imageUrl: "https://static.zara.net/assets/public/ab34/2e71/8c664ef980f9/85112f7b9dc5/00874574407-e1/00874574407-e1.jpg?ts=1787041356453&w=560&f=auto" },
  // --- The 'R Kid' Edit · added 12 Sep. The dearest board on the site by some
  //     way, and deliberately so: real adidas is the point of it. ---
  { id: "next-green-borg-parka", name: "Green Waterproof Borg Lined Parka", category: "Baby", retailer: "Next", price: 28.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su939843/v41083", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V41083s.jpg?im=Resize,width=600" },
  { id: "tu-red-beanie", name: "Red Knitted Beanie Hat", category: "Baby", retailer: "Tu", price: 5.00, type: "head", affiliateUrl: "https://tuclothing.sainsburys.co.uk/product/tuc146866552", imageUrl: "//media.4rgos.it/s/Argos/tuc146866552_R_SET?$Main768$&amp;w=620&amp;h=620" },
  { id: "adidas-denim-tee-set", name: "Denim Tee Set Kids", category: "Baby", retailer: "adidas", price: 33.00, type: "top", affiliateUrl: "https://www.adidas.co.uk/denim-tee-set-kids/JC7863.html", imageUrl: "https://assets.adidas.com/images/w_500,f_auto,q_auto/5230abbd6d2d492d81a808dffd4072ad_9366/Denim_Tee_Set_Kids_Blue_JC7863_01_laydown.jpg" },
  { id: "adidas-campus-00s-red", name: "Campus 00s Comfort Closure Shoes Kids", category: "Baby", retailer: "adidas", price: 50.00, type: "foot", onSale: true, salePrice: 35.00, affiliateUrl: "https://www.adidas.co.uk/campus-00s-comfort-closure-elastic-lace-shoes-kids/JI4336.html", imageUrl: "https://assets.adidas.com/images/w_500,f_auto,q_auto/b75e6624437a474d8b11fc1e5aa4f168_9366/Campus_00s_Comfort_Closure_Elastic_Lace_Shoes_Kids_Red_JI4336_01_standard.jpg" },
  { id: "next-stripe-rib-tshirt", name: "Black and White Stripe Cotton Rich Long Sleeve Rib T-Shirt", category: "Girls", retailer: "Next", price: 5.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/st463641/253907", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/253907s.jpg?im=Resize,width=600" },
  { id: "zara-padded-jacket", name: "Water Repellent Padded Jacket", category: "Girls", retailer: "Zara", price: 25.99, type: "top", affiliateUrl: "https://www.zara.com/gb/en/water-repellent-padded-jacket-p01255550.html", imageUrl: "https://static.zara.net/assets/public/d7d9/bf78/c79b43bc974f/dd87a79ca5d3/01255550610-e1/01255550610-e1.jpg?ts=1784021431749&w=560&f=auto" },
  { id: "ms-denim-mom-jeans", name: "Denim Mom Jeans (2-8 Yrs)", category: "Girls", retailer: "M&S", price: 12.00, type: "bottom", affiliateUrl: "https://www.marksandspencer.com/denim-mom-jeans-2-8-yrs-/p/clp60720221", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T77_3003D_CE_X_EC_90" },
  { id: "adidas-gazelle-indoor-maroon", name: "Gazelle Indoor Shoes", category: "Girls", retailer: "adidas", price: 50.00, type: "foot", affiliateUrl: "https://www.adidas.co.uk/gazelle-indoor-shoes/KI7358.html", imageUrl: "https://assets.adidas.com/images/w_500,f_auto,q_auto/b09328df12834d7999b3b4ff96d282d3_9366/GAZELLE_INDOOR_SHOES_Burgundy_KI7358_01_00_standard.jpg" },
  { id: "next-superdry-everest-parka", name: "Superdry Black Everest Parka Coat", category: "Boys", retailer: "Next", price: 68.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su994494/g68932", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G68932s.jpg?im=Resize,width=600" },
  { id: "adidas-sst-tracksuit-navy", name: "SST Tracksuit", category: "Boys", retailer: "adidas", price: 40.00, type: "top", affiliateUrl: "https://www.adidas.co.uk/sst-tracksuit/HZ6613.html", imageUrl: "https://assets.adidas.com/images/w_500,f_auto,q_auto/809de9670e46441f879cee6989da29c4_9366/SST_Tracksuit_Blue_HZ6613_01_laydown.jpg" },
  { id: "adidas-samba-og-white", name: "Samba OG Comfort Closure Shoes Kids", category: "Boys", retailer: "adidas", price: 50.00, type: "foot", affiliateUrl: "https://www.adidas.co.uk/samba-og-comfort-closure-elastic-lace-shoes-kids/JQ6391.html", imageUrl: "https://assets.adidas.com/images/w_500,f_auto,q_auto/e09d4d60344d43038bef2bcdba27ece0_9366/Samba_OG_Comfort_Closure_Elastic_Lace_Shoes_Kids_White_JQ6391_01_00_standard.jpg" },
  // --- The 'Girl Power' Edit · added 13 Sep. Five looks, one each. Nobody is
  //     in a costume: each one is translated into clothes a child would wear. ---
  { id: "adidas-denim-set", name: "Denim Set", category: "Girls", retailer: "adidas", price: 50.00, type: "top", affiliateUrl: "https://www.adidas.co.uk/denim-set/JC7871.html", imageUrl: "https://assets.adidas.com/images/w_500,f_auto,q_auto/c6bd48adde0e45b492b49b81c34b4111_9366/Denim_Set_Blue_JC7871_01_laydown.jpg" },
  { id: "adidas-liberty-spezial", name: "adidas Liberty Handball Spezial Lace Shoes", category: "Girls", retailer: "adidas", price: 50.00, type: "foot", affiliateUrl: "https://www.adidas.co.uk/adidas-liberty-handball-spezial-lace-shoes/KH9840.html", imageUrl: "https://assets.adidas.com/images/w_500,f_auto,q_auto/e268858438dc4f3a9ebf8e20b1d695ca_9366/ADIDAS_LIBERTY_HANDBALL_SPEZIAL_LACE_SHOES_Red_KH9840_01_00_standard.jpg" },
  { id: "hm-flounce-cardigan-red", name: "Flounce Detail Cardigan", category: "Girls", retailer: "H&M", price: 17.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1349102002.html", imageUrl: "https://image.hm.com/assets/hm/ab/38/ab38273fdc291955ed81d8c58bd26520cb078bc7.jpg?imwidth=600" },
  { id: "hm-leopard-denim-dress", name: "Bow Detail Denim Dress", category: "Girls", retailer: "H&M", price: 12.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1336030003.html", imageUrl: "https://image.hm.com/assets/hm/84/95/8495b46a345bebca2902688fe68f8f217640c4fc.jpg?imwidth=600" },
  { id: "hm-ribbed-cotton-top-white", name: "Ribbed Cotton Top", category: "Girls", retailer: "H&M", price: 4.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1344351001.html", imageUrl: "https://image.hm.com/assets/hm/35/85/3585837461ec33ec38c36f95df4f6914b8b19333.jpg?imwidth=600" },
  { id: "schuh-spezial-burgundy", name: "adidas Handball Spezial Junior", category: "Girls", retailer: "schuh", price: 45.00, type: "foot", affiliateUrl: "https://www.schuh.co.uk/kids/junior-adidas-handball-spezial-burgundy-trainers/2601543250/", imageUrl: "https://d2ob0iztsaxy5v.cloudfront.net/product/260154/2601543250_exlg.jpg" },
  { id: "next-ecru-peplum-tshirt", name: "Ecru Short Sleeve Peplum T-Shirt", category: "Baby", retailer: "Next", price: 3.50, type: "top", affiliateUrl: "https://www.next.co.uk/style/su374709/e51285", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/E51285s.jpg?im=Resize,width=600" },
  { id: "zara-striped-culotte-jeans", name: "Striped Culotte Jeans with Bows", category: "Baby", retailer: "Zara", price: 14.99, type: "bottom", affiliateUrl: "https://www.zara.com/gb/en/striped-culotte-jeans-with-bows-p04575004.html", imageUrl: "https://static.zara.net/assets/public/791c/59d4/1bad4f6cb7a0/9bc37788ea29/04575004664-e1/04575004664-e1.jpg?ts=1781001354764&w=560&f=auto" },
  { id: "hm-quilted-jacket-mole", name: "Pile Lined Quilted Jacket", category: "Baby", retailer: "H&M", price: 19.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1360621002.html", imageUrl: "https://image.hm.com/assets/hm/25/ca/25ca15d142bf79cc24fd8a60c0514d24753fa5c2.jpg?imwidth=600" },
  { id: "hm-ballet-pumps-pink", name: "Ballet Pumps", category: "Baby", retailer: "H&M", price: 9.99, type: "foot", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1341175001.html", imageUrl: "https://image.hm.com/assets/hm/bd/65/bd6540d006acac01007120d984595abdf04a1876.jpg?imwidth=600" },
  { id: "ms-bow-top-ivory", name: "Pure Cotton Bow Top (2-8 Yrs)", category: "Girls", retailer: "M&S", price: 12.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/pure-cotton-bow-top-2-8-yrs-/p/clp61223495", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T77_2369E_Y8_X_EC_90" },
  { id: "tu-denim-pleat-skirt", name: "Blue Soft Pleat Denim Skirt", category: "Girls", retailer: "Tu", price: 11.00, type: "bottom", affiliateUrl: "https://tuclothing.sainsburys.co.uk/product/tuc148084466", imageUrl: "//media.4rgos.it/s/Argos/tuc148084466_R_SET?$Main768$&amp;w=620&amp;h=620" },
  { id: "tu-red-frill-cardigan", name: "Red Frill Hem Sweat Cardigan", category: "Girls", retailer: "Tu", price: 5.00, type: "top", affiliateUrl: "https://tuclothing.sainsburys.co.uk/product/tuc147962407", imageUrl: "//media.4rgos.it/s/Argos/tuc147962407_R_SET?$Main768$&amp;w=620&amp;h=620" },
  { id: "next-ri-patent-maryjane", name: "River Island Black Patent Platform Mary Jane School Shoes", category: "Girls", retailer: "Next", price: 26.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/sv001233/g84002", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G84002s.jpg?im=Resize,width=600" },
  { id: "george-black-heart-pinafore", name: "Black Heart Button Pinafore", category: "Girls", retailer: "George", price: 10.00, type: "top", affiliateUrl: "https://direct.asda.com/george/kids/dresses/black-heart-button-pinafore/G008406123,default,pd.html", imageUrl: "https://asda.scene7.com/is/image/Asda/5059206416752?hei=200&amp;wid=200&amp;qlt=85&amp;fmt=pjpg&amp;resmode=sharp2&amp;op_usm=1.1,0.5,0,0&amp;defaultimage=default_details_George_rd" },
  { id: "zara-peter-pan-tshirt", name: "Ribbed Peter Pan Collar T-Shirt", category: "Girls", retailer: "Zara", price: 8.99, type: "top", affiliateUrl: "https://www.zara.com/gb/en/ribbed-peter-pan-collar-t-shirt-p01716450.html", imageUrl: "https://static.zara.net/assets/public/dadd/2202/bbd84931923d/8fb8562a93e6/01716450104-e1/01716450104-e1.jpg?ts=1787036978464&w=560&f=auto" },
  { id: "next-black-button-cardigan", name: "Black Button Up Cardigan", category: "Girls", retailer: "Next", price: 11.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su385497/e29010", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/E29010s.jpg?im=Resize,width=600" },
  { id: "next-black-velvet-maryjane", name: "Black Velvet Mary Jane Occasion Shoes", category: "Girls", retailer: "Next", price: 17.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/su778272/g67500", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G67500s.jpg?im=Resize,width=600" },
  // --- The 'Muddy Puddles' Edit · added 16 Sep. A puddlesuit and a pair of
  //     wellies each, which is the whole outfit for a day like that. ---
  { id: "next-neutral-puddlesuit", name: "Neutral Waterproof Fleece Lined Puddlesuit (3mths-7yrs)", category: "Baby", retailer: "Next", price: 22.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su148815/h34912", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H34912s.jpg?im=Resize,width=600" },
  { id: "next-lion-ankle-wellies", name: "Neutral Lion Warm Lined Ankle Wellies", category: "Baby", retailer: "Next", price: 15.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/st529486/g68171", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G68171s.jpg?im=Resize,width=600" },
  { id: "next-sage-puddlesuit", name: "Sage Green Waterproof Fleece Lined Puddlesuit (3mths-7yrs)", category: "Girls", retailer: "Next", price: 20.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su749685/h21330", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H21330s.jpg?im=Resize,width=600" },
  // Mountain Warehouse isn't on Awin — this one earns through Skimlinks or
  // Sovrn. Kept anyway: it's the right welly, which matters more.
  { id: "mw-colour-changing-wellies", name: "Grass and Air Kids Colour Changing Winter Wellies", category: "Girls", retailer: "Mountain Warehouse", price: 28.00, type: "foot", affiliateUrl: "https://www.mountainwarehouse.com/p/m78858/grass-air/kids-colour-changing-winter-wellies/orchid-pink/", imageUrl: "https://cdn11.bigcommerce.com/s-nb5it5hcrj/images/stencil/1200w/products/54047/297405/m78858_001_kidscolourchangingwinterwellies_1__80213.1758193987.jpg?compression=lossy" },
  { id: "next-cool-vibes-puddlesuit", name: "Cool Vibes Grey and Blue Waterproof Fleece Lined Puddlesuit (3mths-7yrs)", category: "Boys", retailer: "Next", price: 22.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su148815/y98860", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y98860s.jpg?im=Resize,width=600" },
  { id: "debenhams-shaun-wellies", name: "TOG24 Border Shaun the Sheep Wellies", category: "Boys", retailer: "Debenhams", price: 38.00, type: "foot", onSale: true, salePrice: 15.00, affiliateUrl: "https://www.debenhams.com/product/tog24-border-shaun-the-sheep-wellies_p-89deb736-81a1-4677-9132-a0975803f811", imageUrl: "https://mediahub.debenhams.com/m5059011389906_black_xl.jpeg" },
  // --- Wrapped Up · added 17 Sep. Pramsuits, three to choose from in each of
  //     girls, boys and unisex. A shortlist, so the page shows ranges. ---
  { id: "hm-padded-pramsuit-cherries", name: "Padded Pramsuit", category: "Baby", retailer: "H&M", price: 19.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1354914001.html", imageUrl: "https://image.hm.com/assets/hm/7c/b9/7cb914a21ae9de795b496119c9c763270e0291d8.jpg?imwidth=600" },
  { id: "next-checkerboard-allinone", name: "Pink and Red Checkerboard Borg Hooded Baby All-In-One", category: "Baby", retailer: "Next", price: 26.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/su989906/v42986", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V42986s.jpg?im=Resize,width=600" },
  { id: "george-pink-borg-snowsuit", name: "Pink Embroidered Borg Snowsuit", category: "Baby", retailer: "George", price: 18.00, type: "top", affiliateUrl: "https://direct.asda.com/george/baby/coats-pramsuits/pink-embroidered-borg-snowsuit/G008390032,default,pd.html", imageUrl: "https://asda.scene7.com/is/image/Asda/5059206141135?hei=200&amp;wid=200&amp;qlt=85&amp;fmt=pjpg&amp;resmode=sharp2&amp;op_usm=1.1,0.5,0,0&amp;defaultimage=default_details_George_rd" },
  { id: "ms-borg-double-zip-pramsuit", name: "Borg Double Zip Pramsuit (0-12 Mths)", category: "Baby", retailer: "M&S", price: 24.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/borg-double-zip-pramsuit-0-12-mths-/p/clp61218141", imageUrl: "https://assets.digitalcontent.marksandspencer.app/image/upload/q_auto,f_auto/SD_04_T92_6703Y_TH_X_EC_90" },
  { id: "hm-padded-jersey-pramsuit", name: "Padded Jersey Pramsuit", category: "Baby", retailer: "H&M", price: 19.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1239371005.html", imageUrl: "https://image.hm.com/assets/hm/ea/e9/eae9541ac02facddc4c90da403d1ee080a80edd4.jpg?imwidth=600" },
  { id: "next-blue-stripe-pramsuit", name: "Blue Stripe Borg Button Hooded Baby Pramsuit", category: "Baby", retailer: "Next", price: 22.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv020245/g93094", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G93094s.jpg?im=Resize,width=600" },
  { id: "next-little-one-pramsuit", name: "Cream Little One Back Slogan Quilted Nylon Pramsuit", category: "Baby", retailer: "Next", price: 28.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/sv020281/g93117", imageUrl: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/G93117s.jpg?im=Resize,width=600" },
  { id: "hm-pile-pramsuit-ears", name: "Pile Pram Suit with Ears", category: "Baby", retailer: "H&M", price: 14.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1230866001.html", imageUrl: "https://image.hm.com/assets/hm/c8/02/c8028bb6d8e089766c395e3f4915a18f72eba448.jpg?imwidth=600" },
  { id: "mp-faux-fur-pramsuit", name: "Faux Fur Pramsuit", category: "Baby", retailer: "Mamas & Papas", price: 45.00, onSale: true, salePrice: 33.75, type: "top", affiliateUrl: "https://www.mamasandpapas.com/products/faux-fur-pramsuit-nb-s07gn9kb0", imageUrl: "https://images2.productserve.com/?w=600&h=600&bg=white&trim=5&t=letterbox&url=ssl%3Acdn.shopify.com%2Fs%2Ffiles%2F1%2F0414%2F6023%2F6453%2Ffiles%2Fmamas-papas-pramsuits-faux-fur-pramsuit-1249087634.jpg%3Fv%3D1784050811&feedId=112637&k=f41972ec932f440900ef3849d08b1e9471295d03" },
  // ---- Knit Picks (the-knitwear-edit-26) ----------------------------------
  // Three of these are priced by size: Next steps the price up for bigger
  // feet and bigger jumpers, so they carry a priceTo and the outfits they sit
  // in read as "from" rather than pretending to a figure they cannot hold.
  { id: "ms-knit-3piece-brown", name: "3 Piece Knitted Outfit with Booties", category: "Baby", retailer: "M&S", price: 18.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/3-piece-knitted-outfit-with-booties-7lbs-12-mths-/p/clp61224290?color=Brown" },
  { id: "ms-borg-jacket-mushroom", name: "Borg Jacket with Ears", category: "Baby", retailer: "M&S", price: 16.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/borg-jacket-with-ears-0-12-mths-/p/clp61224317?color=Mushroom" },
  { id: "ms-knit-2piece-pink", name: "2 Piece Knitted Outfit with Booties", category: "Baby", retailer: "M&S", price: 18.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/2-piece-knitted-outfit-with-booties-7lbs-12-mths-/p/clp61224325?color=LightPink" },
  { id: "ms-borg-jacket-cream", name: "Borg Jacket with Ears", category: "Baby", retailer: "M&S", price: 16.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/borg-jacket-with-ears-0-12-mths-/p/clp61224317?color=Cream" },
  { id: "hm-rib-knit-set-brown", name: "2-Piece Rib-Knit Cotton Set", category: "Girls", retailer: "H&M", price: 39.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1354894001.html" },
  { id: "next-western-boots-mink", name: "Mink Brown Faux Suede Western Ankle Boots", category: "Girls", retailer: "Next", price: 36.00, priceTo: 43.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/SV021138/Y37690" },
  { id: "ms-ivory-bow", name: "Ivory Bow", category: "Girls", retailer: "M&S", price: 7.00, type: "head", affiliateUrl: "https://www.marksandspencer.com/ivory-bow/p/hbp23083548?color=Beige" },
  { id: "next-checkerboard-jumper", name: "Neutral Checkerboard Knitted Crew Neck Jumper", category: "Boys", retailer: "Next", price: 14.00, priceTo: 16.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/SU969871/G67174" },
  { id: "next-cord-barrel-trousers", name: "Brown Barrel Leg Textured Corduroy Pull On Trousers", category: "Boys", retailer: "Next", price: 10.00, priceTo: 12.00, type: "bottom", affiliateUrl: "https://www.next.co.uk/style/SU540715/G55758" },
  { id: "next-chelsea-boots-brown", name: "Neutral Brown Warm Lined Leather Chelsea Boots", category: "Boys", retailer: "Next", price: 30.00, priceTo: 34.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/ST018312/F27493" },
  // ---- After Dark (after-dark-26) ----------------------------------------
  // The Mamas & Papas pramsuit is the first product on the site that both
  // earns and shows its photograph, M&P being the only approved programme.
  // Everything else here links out untracked for now.
  { id: "ms-floral-cord-pramsuit", name: "Pure Cotton Floral Cord Pramsuit", category: "Baby", retailer: "M&S", price: 26.00, type: "top", affiliateUrl: "https://www.marksandspencer.com/pure-cotton-floral-cord-pramsuit-0-12-mths-/p/clp61218132?color=Ivory" },
  { id: "hm-knit-set-green-floral", name: "2-Piece Cotton-Knit Set", category: "Baby", retailer: "H&M", price: 18.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1302623004.html" },
  { id: "mp-colour-block-pramsuit", name: "Colour Block Pramsuit", category: "Baby", retailer: "Mamas & Papas", price: 30.00, type: "top", affiliateUrl: "https://www.mamasandpapas.com/products/colour-block-pramsuit-up-to-1-month-s07gn7nb1", imageUrl: "https://images2.productserve.com/?w=600&h=600&bg=white&trim=5&t=letterbox&url=ssl%3Acdn.shopify.com%2Fs%2Ffiles%2F1%2F0414%2F6023%2F6453%2Ffiles%2Fmamas-papas-pramsuits-colour-block-pramsuit-1249221507.jpg%3Fv%3D1784140360&feedId=112637&k=0d2c2b142b85401e55d57a9a9c7980b72740c2b0" },
  { id: "hm-knit-set-striped", name: "2-Piece Cotton-Knit Set", category: "Baby", retailer: "H&M", price: 18.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1302623009.html" },
  { id: "next-suede-pull-on-boots", name: "Tan Brown Suede Baby Pull-On Boots", category: "Baby", retailer: "Next", price: 12.00, type: "foot", affiliateUrl: "https://www.next.co.uk/style/SU962250/W15705" },
  { id: "next-waterproof-fur-lined-coat", name: "Khaki Green Waterproof Faux Fur Lined Padded Coat", category: "Girls", retailer: "Next", price: 44.00, priceTo: 54.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/SU964292/W13510" },
  { id: "next-cream-spot-set", name: "Cream Spot Sweatshirt and Leggings Set", category: "Girls", retailer: "Next", price: 12.00, priceTo: 16.00, type: "top", affiliateUrl: "https://www.next.co.uk/style/SV004113/H01905" },
  { id: "hm-chunky-chelsea-beige", name: "Chunky Chelsea Boots", category: "Girls", retailer: "H&M", price: 19.99, type: "foot", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1341135001.html" },
  { id: "hm-teddy-jacket-navy-block", name: "Teddy Jacket", category: "Boys", retailer: "H&M", price: 17.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1305893011.html" },
  { id: "hm-urban-kit-hoodie", name: "Loose-Fit Motif-Detail Hoodie", category: "Boys", retailer: "H&M", price: 12.99, type: "top", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1352502006.html" },
  { id: "hm-brushed-cargo-joggers", name: "Brushed-Inside Cargo Joggers", category: "Boys", retailer: "H&M", price: 9.99, type: "bottom", affiliateUrl: "https://www2.hm.com/en_gb/productpage.1343772004.html" },
  // Half price at the time of building. onSale drives the sale badge and means
  // the total uses 24.99, not the 56.99 it was.
  { id: "mm-levis-dereck-trainers", name: "Levi's Dereck Mid Trainers", category: "Boys", retailer: "MandM Direct", price: 56.99, onSale: true, salePrice: 24.99, type: "foot", affiliateUrl: "https://www.mandmdirect.com/gb/en/product/lv33252/levis-boys-dereck-mid-trainers-navy-khaki-light-brown" },
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
  const items = look.productIds.map(getProduct).filter(Boolean) as Product[];
  const prices = items.map(priceOf);
  // A size-priced item contributes its top price to the upper figure. A sale
  // price is already the real price, so it is never stretched by priceTo.
  const topPrices = items.map((p) =>
    p.onSale && p.salePrice ? p.salePrice : p.priceTo ?? p.price
  );

  if (!prices.length) return { kind: "outfit" as const, total: 0, from: 0, to: 0 };

  if (look.kind === "shortlist") {
    const from = Math.min(...prices);
    const to = Math.max(...prices);
    return { kind: "shortlist" as const, total: 0, from, to };
  }

  const total = prices.reduce((s, n) => s + n, 0);
  const to = topPrices.reduce((s, n) => s + n, 0);
  // `to` only differs from `total` when something in the outfit is size
  // priced. Callers use that difference to decide between "£82.99" and
  // "from £82.99", so the claim stays true either way.
  return { kind: "outfit" as const, total, from: total, to };
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
