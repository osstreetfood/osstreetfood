/* ============================================================
   O's Streetfood – menydata
   Landala är transkriberad från menybilden. Utby härleds ur
   Landala (hela STREET FOOD ersätts av en enda rätt).
   TacO's är återgiven exakt från menyer/Tacos_meny_ny.txt.
   ============================================================ */

const LANDALA_MENU = [
  {
    id: "burgers",
    title: "Burgers",
    tag: "100 g",
    items: [
      { name: "Cheese", price: "99:-", desc: "Premium Högrev, Cheddarost, Ketchup, Senap, Mayo, Gullök, Burgerdudes Dillpicklade Gurka." },
      { name: "Truffle", price: "109:-", desc: "Premium Högrev, Cheddarost, PepperJackost, Tryffel Mayo, Burgerdudes Dillpicklade Gurka, Rostad lök, Picklad Rödlök." },
      { name: "@burgare_goteborg", price: "109:-", desc: "Premium Högrev, Cheddarost, Mayo, BBQ-Sauce, Röda Jalapeños, Rostad Lök, Baconjam (kalv)" },
      { name: "Spicy Candy", price: "109:-", desc: "Premium Högrev, Cheddarost, Sweet Adobo, Smokey Cheddar, Candied Jalapeños, Gullök, Chili Cheese" },
      { name: "Chili n' Honey", price: "109:-", desc: "Premium Högrev, Cheddarost, Chili N' Honey Mayo, Candied Bacon (kalv), Rödlök" },
      { name: "The Classic", price: "109:-", desc: "Premium Högrev, Cheddarost, O's Feast Sauce, Isbergssallat, Färsk Tomat, Gullök" },
      { name: "O's Maco", price: "109:-", desc: "Premium Högrev, Cheddarost, O's Feast Sauce, Sweet Salsa, Isbergssallat, Färsk Tomat, Gullök, Nachos" },
      { name: "First of the Month", price: "119:-", desc: "Ingredienserna finns på en skylt vid kassan." }
    ],
    notes: [
      { text: "Alla våra burgare går att få vegetariska", veggie: true },
      { text: "Glutenfritt bröd +10:-" }
    ]
  },
  {
    id: "streetfood",
    title: "Street Food",
    items: [
      { name: "Steak Sandwich", price: "189:-", desc: "Marinerad Premium Entrecoté, Grön Paprika, Smält Cheddar/Mozzarella, Rödlök, Saltgurka, Herb N' Garlic Mayo, Salsa Picante" },
      { name: "Wings", price: "109:-", desc: "BBQ Sauce, Gräslök. Inkl. Valfri Dipp" },
      { name: "Nacho Plate", price: "149:-", desc: "Taco-kryddad Premium Högrev, Nacho Chips, Ostsås, Cheddar/Mozzarellamix, Rödlök, Smokey Sour Cream, Avocado Mayo, Salsa Picante" },
      { name: "Cornribs", price: "79:-", desc: "Sriracha Glaze, Habanero Mayo, Feta Ost & Gräslök" }
    ]
  },
  {
    id: "fries",
    title: "Fries & Sides",
    items: [
      { name: "Regular Fries", price: "40:-" },
      { name: "Mixed Fries", price: "45:-" },
      { name: "Sweet Fries", price: "50:-" },
      { name: "Fries Box Magical", price: "65:-", desc: "Fries, GPS, RO'sA, Ostsås, Rödlök, Gräslök" },
      { name: "Fries Box Spicy", price: "65:-", desc: "Fries, Habanero, RO'sA, Ostsås, Röda Jalapeños" },
      { name: "Chicken Cajun Box", price: "90:-", desc: "Fries, Chili N' Honey Mayo, Chicken Pops, Ostsås, Gräslök" },
      { name: "Chicken Nuggets (6) + Dip", price: "50:-" },
      { name: "Chicken Pops (8)", price: "50:-" },
      { name: "Chili Cheese (5)", price: "35:-" },
      { name: "Black Chili Cheese (5)", price: "45:-" },
      { name: "Habanero Cheese (5)", price: "45:-" },
      { name: "Onion Rings (6)", price: "50:-" },
      { name: "FB First of the Month", price: "80:-" }
    ]
  },
  {
    id: "laggtill",
    title: "Lägg till",
    compact: true,
    items: [
      { name: "Extra Kött + Ost", price: "35:-" },
      { name: "Chili Cheese", price: "20:-" },
      { name: "Candied Bacon", price: "20:-" },
      { name: "Baconjam", price: "20:-" },
      { name: "Feta Ost på FB", price: "20:-" },
      { name: "Candied Jalapeños", price: "20:-" }
    ]
  },
  {
    id: "kids",
    title: "Kids Menu",
    items: [
      { name: "Lil O's", price: "79:-", desc: "Hamburgare/Cheeseburgare/Chicken Nuggets (4). Inkl. Fries & MER" }
    ]
  },
  {
    id: "drinks",
    title: "Drinks",
    compact: true,
    items: [
      { name: "Läsk", price: "25:-" },
      { name: "MER 20 cl", price: "20:-" }
    ]
  },
  {
    id: "sauces",
    title: "Sauces",
    compact: true,
    items: [
      { name: "RO'sA", price: "15:-" },
      { name: "GPS", price: "15:-" },
      { name: "Cheddar", price: "15:-" },
      { name: "Smokey Cheddar", price: "15:-" },
      { name: "Honey N' Chili", price: "15:-" },
      { name: "Sweet Adobo", price: "15:-" },
      { name: "BBQ", price: "15:-" },
      { name: "Mayo", price: "15:-" },
      { name: "Truffle", price: "19:-" },
      { name: "Habanero", price: "19:-" },
      { name: "Herb N' Garlic", price: "19:-" },
      { name: "Avocado Mayo", price: "19:-" },
      { name: "Salsa Picante", price: "19:-" },
      { name: "First of the Month", price: "19:-" },
      { name: "Wildcard", price: "19:-" }
    ]
  },
  {
    id: "soda",
    title: "Sparkling Pop Soda",
    items: [
      { name: "Blue Lemonade", price: "45:-" },
      { name: "Pomegranate Blast", price: "45:-" },
      { name: "Peach on the Beach", price: "45:-" }
    ]
  }
];

/* Utby = Landala, men hela STREET FOOD ersätts med en enda rätt. */
const UTBY_MENU = LANDALA_MENU.map((section) => {
  if (section.id !== "streetfood") return section;
  return {
    ...section,
    items: [
      {
        name: "O's Fried Chicken Burger",
        price: "149:-",
        desc: "Friterad kyckling, Isbergssallat, Rödlök, Chili-Mayo, Saltgurka, Cheddar",
        note: "Endast tillgänglig på onsdag och söndag"
      }
    ]
  };
});

/* TacO's – innehåll enligt menyer/Tacos_meny_ny.txt */
const TACOS_MENU = [
  {
    id: "birria",
    title: "Birria Tacos",
    intro: "Choose between 2 or 3 tacos: 139 kr (2 tacos) / 179 kr (3 tacos)",
    items: [
      { name: "Birriavic", price: "139 kr / 179 kr", desc: "Tortilla, Beef, Mozzarella, Kaymak Mayo, Ajvar, Onion & Parsley" },
      { name: "O's Special", price: "139 kr / 179 kr", desc: "Tortilla, Beef, Mozzarella, Chili & Honey, Red Onion & Parsley" },
      { name: "Spicy Candy", price: "139 kr / 179 kr", desc: "Tortilla, Beef, Mozzarella, Candied Jalapeños, Sweet Adobo, Onion & Cilantro" },
      { name: "The Mesopotamian", price: "139 kr / 179 kr", desc: "Tortilla, Beef, Mozzarella, Pickled Cucumber, Harissa & Tahini, Garlic Mayo, Pomegranate Molasses, Sumac Red Onion & Parsley" },
      { name: "El Pollo", price: "139 kr / 179 kr", desc: "Tortilla, Chicken, Mozzarella, Chipotle-Mayo, Red Onion, Pickled Cucumber" }
    ],
    notes: [
      { text: "Extra taco – 49 kr", em: true },
      { text: "Choose between salted nachos or chili nachos. Consommé and lime included." },
      { text: "For your information – the consommé is for dipping your taco." }
    ]
  },
  {
    id: "burritos",
    title: "Burritos",
    items: [
      { name: "Pollo Supremo", price: "139 kr", desc: "Burrito Tortilla, Chicken, Flavoured Rice, Mozzarella, Black Beans, Chipotle Mayo, Chipotle Corn, Guacamole, Red Onion, Jalaverde Mayo, Lettuce, Hot Honey & Cilantro" },
      { name: "Beef Bandido", price: "139 kr", desc: "Burrito Tortilla, Beef, Flavoured Rice, Mozzarella, Black Beans, Red Onions, Guacamole, Crushed Nachos, Jalaverde Mayo, Coriander & Parsley" }
    ]
  },
  {
    id: "bowls",
    title: "Bowls",
    items: [
      { name: "Birriavic", price: "129 kr", desc: "Salad, Beef, Mozzarella, Kaymak, Ajvar, Onion & Parsley" },
      { name: "O's Special", price: "129 kr", desc: "Salad, Beef, Mozzarella, Chili & Honey, Red Onion & Parsley" },
      { name: "Spicy Candy", price: "129 kr", desc: "Salad, Beef, Mozzarella, Candied Jalapeños, Sweet Adobo, Onion & Cilantro" },
      { name: "The Mesopotamian", price: "129 kr", desc: "Salad, Beef, Mozzarella, Pickled Cucumber, Harissa & Tahini, Garlic Mayo, Pomegranate Molasses, Sumac Red Onion & Parsley" },
      { name: "El Pollo", price: "129 kr", desc: "Salad, Chicken, Mozzarella, Chipotle-Mayo, Red Onion, Pickled Cucumber" }
    ],
    notes: [
      { text: "Everything on the menu can be ordered with beef, chicken, or a vegetarian alternative.", veggie: true }
    ]
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      { name: "O's Creamy Corn", price: "49 kr", meta: "warm", desc: "Creamy corn with taste of butter and salt topped with Jalaverde Mayo, Chives" },
      { name: "O's Chipotle Corn", price: "49 kr", meta: "cold", desc: "Chipotle flavoured corn topped with Feta Cheese, Chives" },
      { name: "O's Garlic Corn", price: "49 kr", meta: "cold", desc: "Garlic flavoured corn topped with Feta Cheese, Chives" },
      { name: "O's Guac", price: "49 kr", desc: "Our homemade guacamole" },
      { name: "Nacho Chips", price: "29 kr", desc: "Regular nacho chips. Choose between salty or chili" }
    ]
  },
  {
    id: "sauces",
    title: "Sauces",
    compact: true,
    items: [
      { name: "Cheddar", price: "19 kr" },
      { name: "Honey & Chili", price: "19 kr" },
      { name: "Sweet Adobo", price: "19 kr" },
      { name: "Garlic Mayo", price: "19 kr" },
      { name: "Salsa Picante", price: "19 kr" },
      { name: "Harissa & Tahini", price: "19 kr" },
      { name: "Sweet Jalapeño", price: "19 kr" },
      { name: "Ajvar", price: "19 kr" },
      { name: "Kaymak Mayo", price: "19 kr" }
    ]
  },
  {
    id: "drinks",
    title: "Drinks",
    compact: true,
    items: [
      { name: "Soft Drink", price: "25 kr" },
      { name: "Coffee", price: "25 kr" }
    ]
  },
  {
    id: "soda",
    title: "Sparkling Pop Soda",
    compact: true,
    items: [
      { name: "Blue Lemonade", price: "45 kr" },
      { name: "Pomegranate Blast", price: "45 kr" },
      { name: "Peach on the Beach", price: "45 kr" }
    ],
    notes: [
      { text: "Got any allergies? Don't hesitate to ask us. We're here to help." }
    ]
  }
];

const LINKS = {
  orderUtby: "https://os-streetfood.yabie.online/",
  orderLandala: "https://osstreetfoodlandala.yabie.online",
  foodora: "https://www.foodora.se/restaurant/obt8/os-street-food",
  foodoraLandala: "https://www.foodora.se/restaurant/ud2h/os-street-food-landala",
  mapsUtby: "https://www.google.com/maps/place/O%E2%80%99s+Street+Food/@57.7407066,12.0768519,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff5538a0332ff:0xec9b750895edf884!8m2!3d57.7407066!4d12.0794268!16s%2Fg%2F11kq9l9q3d?entry=ttu",
  mapsLandala: "https://maps.app.goo.gl/M5MbHSyYvG5X7ZVm7",
  mapsTacos: "https://maps.app.goo.gl/T4KLPFg5Uqsrh1fZ9",
  instagram: "https://www.instagram.com/os_streetfood/"
};

const OPENING_NOTE =
  "Ni hittar öppettider för respektive restaurang på Google och Instagram";

const LUNCH_INFO = {
  title: "Lunch 129 kr",
  sub: "Tisdag–fredag 11–14",
  detail: "Under lunchen serveras endast burgare och Regular Fries.",
  extras: ["Meny (Regular Fries + dricka) +45:-", "Meny (Fries Box + dricka) +70:-"]
};

/* Utby har samma lunch som Landala, men öppnar 11:30. */
const UTBY_LUNCH = { ...LUNCH_INFO, sub: "Tisdag–fredag 11:30–14" };

const TACOS_LUNCH = {
  title: "Lunch 139 kr",
  detail: "Choose between tacos, burritos & bowls. Drink and coffee incl."
};

const RESTAURANTS = {
  utby: {
    key: "utby",
    theme: "os",
    name: "O's Streetfood Utby",
    shortName: "Utby",
    seo: {
      title: "O's Streetfood Utby – Smash burgers & street food i Göteborg",
      description: "O's Streetfood i Utby, Göteborg – smash burgers, street food och fries. Beställ online för avhämtning eller få det levererat via Foodora."
    },
    navLabel: "Utby",
    heroKicker: "O's Streetfood Utby",
    logo: { src: "assets/logos/os.webp", alt: "O's Streetfood logotyp" },
    hero: {
      img: "hero-utby",
      alt: "O's friterade kycklingburgare med smält cheddar",
      title: ["GREAT VIBES", "AT O's"],
      cta: { label: "Beställ nu", href: "https://os-streetfood.yabie.online/", external: true },
      cta2: { label: "Foodora", href: "https://www.foodora.se/restaurant/obt8/os-street-food" }
    },
    marquee: ["Burgers", "Streetfood", "Fries & Sides"],
    menu: UTBY_MENU,
    lunch: UTBY_LUNCH,
    allergyNote: true,
    maps: LINKS.mapsUtby,
    order: [
      { label: "Beställ här – Utby", href: LINKS.orderUtby, primary: true },
      { label: "Foodora", href: LINKS.foodora }
    ]
  },
  landala: {
    key: "landala",
    theme: "os",
    name: "O's Streetfood Landala",
    shortName: "Landala",
    seo: {
      title: "O's Streetfood Landala – Smash burgers & street food i Göteborg",
      description: "O's Streetfood i Landala, Göteborg – smash burgers, street food och fries. Beställ online för avhämtning eller få det levererat via Foodora."
    },
    navLabel: "Landala",
    heroKicker: "O's Streetfood Landala",
    logo: { src: "assets/logos/os.webp", alt: "O's Streetfood logotyp" },
    hero: {
      img: "hero-landala",
      alt: "Smashburgare i papper från O's Streetfood",
      title: ["GREAT VIBES", "AT O's"],
      cta: { label: "Beställ nu", href: "https://osstreetfoodlandala.yabie.online", external: true },
      cta2: { label: "Foodora", href: "https://www.foodora.se/restaurant/ud2h/os-street-food-landala" }
    },
    marquee: ["Burgers", "Streetfood", "Fries & Sides"],
    menu: LANDALA_MENU,
    lunch: LUNCH_INFO,
    allergyNote: true,
    maps: LINKS.mapsLandala,
    order: [
      { label: "Beställ här – Landala", href: LINKS.orderLandala, primary: true },
      { label: "Foodora", href: LINKS.foodoraLandala }
    ]
  },
  tacos: {
    key: "tacos",
    theme: "tacos",
    name: "TacO's",
    shortName: "TacO's",
    seo: {
      title: "TacO's Lindholmen – Birria tacos & burritos i Göteborg",
      description: "TacO's på Lindholmen i Göteborg – birria tacos med consommé, burritos och bowls. En del av O's Streetfood."
    },
    navLabel: "Lindholmen",
    heroKicker: "TacO's Lindholmen",
    logo: { src: "assets/logos/tacos.webp", alt: "TacO's logotyp" },
    hero: {
      img: "hero-tacos",
      alt: "Birria tacos med consommé och lime från TacO's",
      title: ["GREAT VIBES", "AT TacO's"],
      cta: { label: "Se menyn", href: "#menu-anchor", scrollTo: true }
    },
    marquee: ["Birria Tacos", "Burritos", "Bowls"],
    menu: TACOS_MENU,
    lunch: TACOS_LUNCH,
    footerName: "TacO's Lindholmen",
    maps: LINKS.mapsTacos,
    order: null
  }
};
