
import { Recipe } from './types';

export const INITIAL_RECIPES: Recipe[] = [
  // --- DZIKIE ŚNIADANIA (20) ---
  // GRUPPA A: NA LEKKO (10)
  {
    id: 1101,
    title: "Waflowy Komandos",
    description: "Węglowodany, które nic nie ważą. Chrupiesz i rośniesz bez uczucia ciężkości.",
    protein: 50,
    carbs: 125,
    fat: 8,
    time: 2,
    price_est: 12,
    store: 'Biedronka',
    ingredients: [
      { item: "Wafle ryżowe (100g)", amount: "1 paka" },
      { item: "Sok pomarańczowy", amount: "500ml" },
      { item: "Odżywka białkowa (Izolat)", amount: "1.5 miarki" }
    ],
    instructions: ["Wymieszaj białko z sokiem w shakerze.", "Zjedz wafle popijając miksturą. To najszybsze 125g węgli w historii."],
    image_url: "https://images.unsplash.com/photo-1598214817158-ab35539d0446?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'SZYBKA AKCJA']
  },
  {
    id: 1102,
    title: "Daktylowy Strzał",
    description: "Финики — это сахарный концентрат. Ешь их как конфеты, запивая белковым коктейлем на соке.",
    protein: 52,
    carbs: 130,
    fat: 5,
    time: 1,
    price_est: 18,
    store: 'Lidl',
    ingredients: [
      { item: "Daktyle suszone", amount: "100g" },
      { item: "Sok owocowy", amount: "300ml" },
      { item: "Odżywka białkowa", amount: "2 miarki" }
    ],
    instructions: ["Zjedz daktyle (naturalna glukoza) i popij szejkiem proteinowym zrobionym na soku."],
    image_url: "https://images.unsplash.com/photo-1596500582235-961d15c8e31b?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'PŁYNNE PALIWO']
  },
  {
    id: 1103,
    title: "Miodowy Atak",
    description: "Чистая глюкоза в мышцы. Намажь мед на тосты толстым слоем.",
    protein: 50,
    carbs: 135,
    fat: 6,
    time: 5,
    price_est: 14,
    store: 'Biedronka',
    ingredients: [
      { item: "Tosty białe", amount: "2 szt" },
      { item: "Miód", amount: "4 łyżki" },
      { item: "Sok pomarańczowy", amount: "500ml" },
      { item: "Odżywka białkowa", amount: "1.5 miarki" }
    ],
    instructions: ["Tosty posmaruj miodem.", "Białko wymieszaj z sokiem. Słodko, ale skutecznie."],
    image_url: "https://images.unsplash.com/photo-1589733901241-5e391270dd91?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'BIAŁE WĘGLE']
  },
  {
    id: 1104,
    title: "Zefir Power",
    description: "Зефир — это угли без жира. Залетает даже когда не хочется. Запивай белковым шейком.",
    protein: 51,
    carbs: 128,
    fat: 2,
    time: 2,
    price_est: 10,
    store: 'Lidl',
    ingredients: [
      { item: "Zefiry / Pianki", amount: "150g" },
      { item: "Sok owocowy", amount: "400ml" },
      { item: "Odżywka białkowa", amount: "1.5 miarki" }
    ],
    instructions: ["Zjedz pianki jako źródło szybkich węgli.", "Popij szejkiem proteinowym."],
    image_url: "https://images.unsplash.com/photo-1582050058244-4e18045f4535?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'SZYBKA AKCJA']
  },
  {
    id: 1105,
    title: "Płynny Geyner (Home Made)",
    description: "Всё в блендер. Выпил за 30 секунд — получил полноценное корыто.",
    protein: 50,
    carbs: 130,
    fat: 10,
    time: 3,
    price_est: 11,
    store: 'Biedronka',
    ingredients: [
      { item: "Płatki owsiane (mąka)", amount: "100g" },
      { item: "Banan", amount: "1 szt" },
      { item: "Sok jabłkowy", amount: "300ml" },
      { item: "Odżywka białkowa", amount: "1.5 miarki" }
    ],
    instructions: ["Wszystko do blendera.", "Wypij duszkiem. To 130g węgli, których żołądek prawie nie poczuje."],
    image_url: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'PŁYNNE PALIWO']
  },
  {
    id: 1106,
    title: "Marmoladowy Bieg",
    description: "Мажь джем на хлебцы не жалея. Протеин докинь в шейк.",
    protein: 53,
    carbs: 122,
    fat: 4,
    time: 3,
    price_est: 15,
    store: 'Lidl',
    ingredients: [
      { item: "Chlebki Wasa / Kupiec", amount: "1 paka" },
      { item: "Dżem owocowy", amount: "200g (pół słoika)" },
      { item: "Gotowy szejk proteinowy", amount: "1 szt" },
      { item: "Dodatkowa miarka białka", amount: "1 szt" }
    ],
    instructions: ["Chlebki posmaruj grubo dżemem.", "Białko wmieszaj w gotowego szejka ze sklepu."],
    image_url: "https://images.unsplash.com/photo-1588717854411-ae3e630a91e4?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'SZYBKA AKCJA']
  },
  {
    id: 1107,
    title: "Żelkowy Pompa",
    description: "Мармелад — это быстрый гликоген. Идеально для утренней загрузки.",
    protein: 50,
    carbs: 120,
    fat: 1,
    time: 1,
    price_est: 12,
    store: 'Biedronka',
    ingredients: [
      { item: "Żelki (Haribo/Misie)", amount: "100g" },
      { item: "Sok / Izotonik", amount: "500ml" },
      { item: "Odżywka białkowa", amount: "2 miarki" }
    ],
    instructions: ["Zjedz żelki.", "Wypij białko wymieszane z izotonikiem lub sokiem."],
    image_url: "https://images.unsplash.com/photo-1582050058244-4e18045f4535?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'BIAŁE WĘGLE']
  },
  {
    id: 1108,
    title: "Owocowy Mus",
    description: "Пюре усваивается мгновенно. Протеин мешай с соком.",
    protein: 48,
    carbs: 125,
    fat: 2,
    time: 1,
    price_est: 16,
    store: 'Lidl',
    ingredients: [
      { item: "Musy owocowe (paucze)", amount: "2 x 200g" },
      { item: "Gotowy szejk proteinowy", amount: "1 szt" },
      { item: "Odżywka białkowa", amount: "1.5 miarki" }
    ],
    instructions: ["Wciągnij musy owocowe.", "Popij szejkiem z dodatkowym białkiem."],
    image_url: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'PŁYNNE PALIWO']
  },
  {
    id: 1109,
    title: "Słodka Drożdżówka",
    description: "Булку съел, соком с протеином залил. Просто и эффективно.",
    protein: 50,
    carbs: 130,
    fat: 12,
    time: 2,
    price_est: 9,
    store: 'Biedronka',
    ingredients: [
      { item: "Drożdżówka z dżemem", amount: "1 duża" },
      { item: "Sok owocowy", amount: "500ml" },
      { item: "Odżywka białkowa", amount: "1.5 miarki" }
    ],
    instructions: ["Zjedz bułkę.", "Białko wypij wymieszane w soku."],
    image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'SZYBKA AKCJA']
  },
  {
    id: 1110,
    title: "Ryżowa Papka (Instant)",
    description: "Залей кашу кипятком, добавь сахар. Протеин вмешай прямо в кашу.",
    protein: 52,
    carbs: 125,
    fat: 5,
    time: 5,
    price_est: 8,
    store: 'Biedronka',
    ingredients: [
      { item: "Kaszka ryżowa błyskawiczna", amount: "2 opak." },
      { item: "Cukier", amount: "2 łyżki" },
      { item: "Odżywka białkowa", amount: "2 miarki" }
    ],
    instructions: ["Zalej kaszkę wrzątkiem.", "Dodaj cukier i białko. Wymieszaj na gładką masę."],
    image_url: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA']
  },

  // GRUPPA B: BUTERBRODNO-PŁOTNE (10)
  {
    id: 1111,
    title: "Kajzerka z Szynką + Shake",
    description: "Делай бутеры. Ветчины там на 20г белка, поэтому шейк обязателен.",
    protein: 52,
    carbs: 125,
    fat: 15,
    time: 5,
    price_est: 13,
    store: 'Lidl',
    ingredients: [
      { item: "Bułka kajzerka", amount: "3 szt" },
      { item: "Szynka z indyka", amount: "100g" },
      { item: "Szejk proteinowy (sklepowy)", amount: "1 szt" }
    ],
    instructions: ["Zrób kanapki z szynką.", "Zapij gotowym szejkiem dla domknięcia białka."],
    image_url: "https://images.unsplash.com/photo-1539252554454-31d626304679?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'DUŻO MIĘSA']
  },
  {
    id: 1112,
    title: "Bagietka z serem + Sok",
    description: "Сыр дает жир и белок, багет — угли. Сок с протеином добирает остальное.",
    protein: 49,
    carbs: 130,
    fat: 22,
    time: 5,
    price_est: 17,
    store: 'Biedronka',
    ingredients: [
      { item: "Bagietka pszenna", amount: "pół sztuki" },
      { item: "Ser żółty (Gouda/Edam)", amount: "50g" },
      { item: "Sok owocowy", amount: "500ml" },
      { item: "Odżywka białkowa", amount: "1 miarka" }
    ],
    instructions: ["Zrób bagietkę z serem.", "Wypij białko wymieszane z sokiem."],
    image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA']
  },
  {
    id: 1113,
    title: "Twarogowy Koks",
    description: "Творог мешай с джемом и на булки. Запивай шейком.",
    protein: 52,
    carbs: 131,
    fat: 8,
    time: 5,
    price_est: 14,
    store: 'Biedronka',
    ingredients: [
      { item: "Twaróg chudy", amount: "100g" },
      { item: "Bułka kajzerka", amount: "3 szt" },
      { item: "Dżem owocowy", amount: "4 łyżki" },
      { item: "Gotowy szejk proteinowy", amount: "1 szt" }
    ],
    instructions: ["Twaróg wymieszaj z dżemem.", "Nałóż na bułki. Popij szejkiem."],
    image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA']
  },
  {
    id: 1114,
    title: "Serek Wiejski + Wafle",
    description: "Творог ешь прямо из банки, вафли вместо хлеба. Сок для углей.",
    protein: 50,
    carbs: 125,
    fat: 10,
    time: 2,
    price_est: 12,
    store: 'Lidl',
    ingredients: [
      { item: "Serek wiejski", amount: "1 szt (200g)" },
      { item: "Wafle ryżowe", amount: "1 paka (100g)" },
      { item: "Sok owocowy", amount: "300ml" }
    ],
    instructions: ["Zjedz serek, zagryzaj waflami.", "Dopij sokiem dla brakujących węglowodanów."],
    image_url: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA']
  },
  {
    id: 1115,
    title: "Tosty z Masłem Orzechowym",
    description: "Тосты с пастой и бананом — это сытно. Протеин на воде.",
    protein: 50,
    carbs: 125,
    fat: 25,
    time: 6,
    price_est: 15,
    store: 'Biedronka',
    ingredients: [
      { item: "Chleb tostowy", amount: "4 kromki" },
      { item: "Masło orzechowe", amount: "2 łyżki" },
      { item: "Banan", amount: "1 szt" },
      { item: "Odżywka białkowa", amount: "1.5 miarki" }
    ],
    instructions: ["Zrób tosty z masłem i bananem.", "Wypij szejka proteinowego na wodzie."],
    image_url: "https://images.unsplash.com/photo-1528825876-2d58a98814d8?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'SZTOS']
  },
  {
    id: 1116,
    title: "Jajecznica Power",
    description: "Яичница даст около 25г белка. Остальное добирай протеином.",
    protein: 51,
    carbs: 120,
    fat: 28,
    time: 10,
    price_est: 14,
    store: 'Lidl',
    ingredients: [
      { item: "Jaja kl. L", amount: "3 szt" },
      { item: "Bułka kajzerka", amount: "3 szt" },
      { item: "Sok owocowy", amount: "400ml" },
      { item: "Odżywka białkowa", amount: "1 miarka" }
    ],
    instructions: ["Usmaż jajecznicę.", "Zjedz z bułkami. Popij szejkiem na soku."],
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA']
  },
  {
    id: 1117,
    title: "Naleśniki (Gotowce)",
    description: "Блины разогрел (или съел холодными), шейком запил.",
    protein: 48,
    carbs: 130,
    fat: 20,
    time: 5,
    price_est: 16,
    store: 'Biedronka',
    ingredients: [
      { item: "Gotowe naleśniki z serem/dżemem", amount: "1 opak." },
      { item: "Gotowy szejk proteinowy", amount: "1 szt" },
      { item: "Sok owocowy", amount: "200ml" }
    ],
    instructions: ["Zjedz naleśniki.", "Zapij szejkiem i sokiem."],
    image_url: "https://images.unsplash.com/photo-1522744402445-29da5187c931?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'GOTOWCE']
  },
  {
    id: 1118,
    title: "Jogurt Pitny + Rogal",
    description: "В йогурт всыпь протеин и взболтай. Заедай круассанами.",
    protein: 52,
    carbs: 125,
    fat: 18,
    time: 2,
    price_est: 18,
    store: 'Lidl',
    ingredients: [
      { item: "Jogurt pitny High Protein", amount: "1 duży" },
      { item: "Rogale typu 7-days", amount: "2 szt" },
      { item: "Dodatkowa miarka białka", amount: "1 szt" }
    ],
    instructions: ["Wsyp białko do jogurtu i wstrząśnij.", "Zjedz rogale popijając jogurtem."],
    image_url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA', 'SZYBKA AKCJA']
  },
  {
    id: 1119,
    title: "Kanapka z Pasztetem",
    description: "Паштет мажь густо. Белок всё равно добирай коктейлем.",
    protein: 50,
    carbs: 130,
    fat: 22,
    time: 5,
    price_est: 12,
    store: 'Biedronka',
    ingredients: [
      { item: "Pasztet drobiowy", amount: "1 puszka" },
      { item: "Bułka kajzerka", amount: "4 szt" },
      { item: "Sok owocowy", amount: "500ml" },
      { item: "Odżywka białkowa", amount: "1.5 miarki" }
    ],
    instructions: ["Bułki posmaruj pasztetem.", "Wypij szejka na soku."],
    image_url: "https://images.unsplash.com/photo-1539252554454-31d626304679?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA']
  },
  {
    id: 1120,
    title: "Parówki na Szybko",
    description: "Сосиски отвари или закинь в микроволновку. Ешь с булками, шейк на десерт.",
    protein: 54,
    carbs: 122,
    fat: 30,
    time: 8,
    price_est: 15,
    store: 'Biedronka',
    ingredients: [
      { item: "Parówki drobiowe (wysoki % mięsa)", amount: "4 szt" },
      { item: "Bułka kajzerka", amount: "3 szt" },
      { item: "Gotowy szejk proteinowy", amount: "1 szt" }
    ],
    instructions: ["Ugotuj parówki.", "Zjedz z bułkami. Szejka wypij na koniec."],
    image_url: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=800",
    tags: ['DZIKIE ŚNIADANIA']
  },

  // --- OBIADY DLA SZEFA (HOME EDITION) (20) ---
  {
    id: 4001,
    title: "Dzik-Sandwich (Kurczak w bułkach)",
    description: "Konkretny zrzut mięsa v białych bułach. Jeśli buła jest za duża do japy – trenuj szczękę, to też mięśnie.",
    protein: 62,
    carbs: 127,
    fat: 18,
    time: 15,
    price_est: 18,
    store: 'Biedronka',
    ingredients: [
      { item: "Pierś z kurczaka (45g B)", amount: "200g" },
      { item: "Kajzerka (12g B / 90g W)", amount: "4 szt" },
      { item: "Skir (sos czosnkowy)", amount: "100g" }
    ],
    instructions: ["Rozbij pierś, dopraw, smaż 4 min z każdej strony.", "Kajzerki przekrój, posmaruj sosem.", "Włóż mięso do środka."],
    image_url: "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&q=80&w=800",
    tags: ['OBIADY', 'DUŻO MIĘSA']
  },
  {
    id: 4002,
    title: "Kurczak z Ryżem i Passatą",
    description: "Sucha kura to zbrodnia, więc nie żałuj passaty. Standardowy budowniczy masy.",
    protein: 59,
    carbs: 128,
    fat: 10,
    time: 20,
    price_est: 14,
    store: 'Lidl',
    ingredients: [
      { item: "Pierś z kurczaka", amount: "200g" },
      { item: "Ryż basmati (120g W)", amount: "160g" },
      { item: "Passata pomidorowa", amount: "150ml" }
    ],
    instructions: ["Ugotuj ryż.", "Kurczaka w kostkę podsmaż, zalej passatą.", "Wymieszaj wszystko razem."],
    image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800",
    tags: ['OBIADY', 'BIAŁE WĘGLE']
  },
  {
    // Fix: Completed incomplete recipe from previous cut-off
    id: 4003,
    title: "Makaron Bolognese z Indyka",
    description: "Chudy indyk i dużo makaronu. Klasyka, która buduje potężne nogi i klatę.",
    protein: 58,
    carbs: 125,
    fat: 12,
    time: 20,
    price_est: 16,
    store: 'Biedronka',
    ingredients: [
      { item: "Mięso mielone z indyka", amount: "200g" },
      { item: "Makaron spaghetti (120g W)", amount: "160g" },
      { item: "Passata pomidorowa", amount: "200ml" }
    ],
    instructions: [
      "Ugotuj makaron al dente.",
      "Podsmaż mięso na patelni.",
      "Dodaj passatę i gotuj 5 min. Wymieszaj z makaronem."
    ],
    image_url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
    tags: ['OBIADY', 'DUŻO MIĘSA']
  }
];
