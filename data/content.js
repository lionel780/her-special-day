export const config = {
  name: "Marie",
  fullName: "Marie Eyenga",
  age: 22,
  birthday: "2026-11-12",
  signature: "M",
  edition: "Édition 2026",
  hint: "Un indice : c'est un chiffre qui te va à merveille.",
  finalSignature: "Avec tout mon affection"
};

export const doors = [
  {
    id: "messages",
    index: "01",
    title: "Des petits mots",
    description: "Six enveloppes, six pensées qui t'attendent sagement.",
    meta: "6 messages",
    icon: "envelope",
    tone: "blush"
  },
  {
    id: "letter",
    index: "02",
    title: "Lettre à moi",
    description: "Un mot de celle que tu étais, et une page blanche pour celle que tu deviens.",
    meta: "À écrire",
    icon: "feather",
    tone: "ivory"
  },
  {
    id: "wishlist",
    index: "03",
    title: "Mes envies",
    description: "Dix petites idées, des rêves et quelques plaisirs qui te ressemblent.",
    meta: "10 envies",
    icon: "sparkle",
    tone: "gold"
  },
  {
    id: "memories",
    index: "04",
    title: "Mes souvenirs",
    description: "Un mur de polaroïds, des rires et des instants qui restent.",
    meta: "Album photo",
    icon: "aperture",
    tone: "blush"
  },
  {
    id: "chapter",
    index: "05",
    title: "Nouveau chapitre",
    description: "Cinq promesses pour l'année qui commence, et des mots à relire.",
    meta: "Chapitre 23",
    icon: "sun",
    tone: "ivory"
  },
  {
    id: "soundtrack",
    index: "06",
    title: "Ton ambiance",
    description: "Une bande-son douce pour accompagner ce nouveau chapitre.",
    meta: "À écouter",
    icon: "music",
    tone: "gold"
  },
  {
    id: "surprises",
    index: "07",
    title: "Petites surprises",
    description: "Un bocal à vœux, un quiz et un compte à rebours.",
    meta: "3 surprises",
    icon: "jar",
    tone: "blush"
  }
];

export const messages = [
  {
    id: "birthday",
    number: "01",
    label: "Joyeux anniversaire",
    title: "Aujourd'hui, c'est ton jour",
    text: "Aujourd'hui, on ne compte pas les années. On compte les raisons de se réjouir, les fous rires, les élans, les petits matins lumineux. Et tu en es une, immense raison. Que cette journée te rende un peu de toute la douceur que tu offres autour de toi.",
    sign: "Pour toi, toujours"
  },
  {
    id: "personality",
    number: "02",
    label: "Ce que tu es",
    title: "Une présence qui change une pièce",
    text: "Tu as cette façon rare de rendre les choses plus simples et les pièces plus douces. Sans bruit, sans effort apparent. Les gens se sentent mieux quand tu es là. C'est un don, Marie. Ne le sous-estime jamais.",
    sign: "Avec admiration"
  },
  {
    id: "encouragement",
    number: "03",
    label: "Un encouragement",
    title: "Tu avances, même quand tu ne le vois pas",
    text: "Si un jour tu doutes, reviens ici. Relis cette phrase : ce que tu construis compte, même quand ça ne se voit pas encore. Les grandes choses prennent souvent la forme de petits pas répétés. Continue, à ton rythme. Tu es sur la bonne route.",
    sign: "Crois en toi"
  },
  {
    id: "future",
    number: "04",
    label: "Celle que tu deviens",
    title: "Une nouvelle version de toi",
    text: "Tu n'as pas à tout réussir pour être fière de toi. Tu peux avancer avec des doutes, des pauses et des recommencements. La personne que tu deviens est déjà en train de naître, dans chaque choix qui te rapproche de toi-même.",
    sign: "Pour l'année qui vient"
  },
  {
    id: "gratitude",
    number: "05",
    label: "Merci",
    title: "Pour tout ce que tu sèmes",
    text: "Merci pour ta présence, ta patience, ton humour parfois absurde et ta façon de prendre soin des gens. Merci de donner sans compter, même les jours où tu es fatiguée. J'espère que cette année te rendra tout cela au centuple.",
    sign: "Du fond du cœur"
  },
  {
    id: "funny",
    number: "06",
    label: "Juste pour rire",
    title: "Officiellement une légende",
    text: "Je te confirme : tu viens encore de gagner une année d'expérience, de charisme et de droits à la sieste sans justification. Le comité a délibéré, c'est validé. Aucun recours possible. Joyeux anniversaire, majesté.",
    sign: "Le comité des grandes personnes"
  }
];

export const pastLetter = {
  title: "De celle que tu étais",
  date: "Quelque part entre hier et demain",
  paragraphs: [
    "Ma chérie, si tu lis ces lignes, c'est que tu as encore grandi. Je voudrais te dire de ne pas oublier la fille qui rêvait un peu trop fort et qui avait peur de ne pas y arriver. Elle t'a portée jusqu'ici.",
    "Pardonne-lui ses maladresses. Elle faisait de son mieux avec ce qu'elle savait. Pardonne-toi, aussi, les détours. Ils t'ont appris quelque chose que le chemin droit n'aurait jamais pu t'offrir.",
    "Et maintenant, sois douce avec celle que tu deviens. Elle est encore en train d'écrire. Elle a le droit d'hésiter, de changer d'avis, de recommencer. Elle a surtout le droit d'être heureuse sans attendre la permission de qui que ce soit."
  ],
  sign: "Celle que tu étais, qui t'aime encore"
};

export const letterPrompts = [
  "Ce que je veux laisser derrière moi cette année…",
  "Une chose que je m'offre le droit de faire…",
  "Une promesse simple à me tenir…",
  "Une personne que je veux remercier…"
];

export const wishlist = [
  {
    id: "perfume",
    category: "Beauté",
    title: "Le parfum qui te ressemble",
    description: "Une note douce, un peu fleurie, qui reste quand tu passes.",
    price: "85 €",
    art: "perfume",
    tone: "blush"
  },
  {
    id: "bag",
    category: "Mode",
    title: "Le sac qui suit partout",
    description: "Assez grand pour la vie, assez joli pour les beaux jours.",
    price: "120 €",
    art: "bag",
    tone: "gold"
  },
  {
    id: "headphones",
    category: "Technologie",
    title: "Le casque du calme",
    description: "Pour écouter tes morceaux et t'isoler du bruit du monde.",
    price: "199 €",
    art: "headphones",
    tone: "ivory"
  },
  {
    id: "escape",
    category: "Voyages",
    title: "Une escapade sans programme",
    description: "Deux jours ailleurs, une valise légère et aucun réveil.",
    price: "Surprise",
    art: "plane",
    tone: "blush"
  },
  {
    id: "dinner",
    category: "Sorties",
    title: "Un dîner aux chandelles",
    description: "Une jolie table, de la lumière douce et rien à décider.",
    price: "60 €",
    art: "dinner",
    tone: "gold"
  },
  {
    id: "flowers",
    category: "Petits plaisirs",
    title: "Un bouquet de saison",
    description: "Parce qu'une maison avec des fleurs change de visage.",
    price: "35 €",
    art: "flowers",
    tone: "blush"
  },
  {
    id: "ritual",
    category: "Beauté",
    title: "Un rituel de soin",
    description: "Un soin lent, pour prendre le temps de revenir à soi.",
    price: "55 €",
    art: "serum",
    tone: "ivory"
  },
  {
    id: "book",
    category: "Lecture",
    title: "Le livre à annoter",
    description: "Un roman à corner, à souligner et à relire dans dix ans.",
    price: "22 €",
    art: "book",
    tone: "gold"
  },
  {
    id: "concert",
    category: "Sorties",
    title: "Une place au concert",
    description: "Pour chanter trop fort et rentrer avec la voix cassée.",
    price: "45 €",
    art: "concert",
    tone: "blush"
  },
  {
    id: "workshop",
    category: "Petits plaisirs",
    title: "Un atelier créatif",
    description: "Céramique, peinture ou cuisine : une après-midi pour créer.",
    price: "70 €",
    art: "palette",
    tone: "ivory"
  }
];

export const wishCategories = [
  "Tout",
  "Beauté",
  "Mode",
  "Technologie",
  "Voyages",
  "Sorties",
  "Lecture",
  "Petits plaisirs"
];

export const memories = [
  {
    id: "summer",
    caption: "Été 2024",
    note: "ce rire-là",
    symbol: "☀",
    tone: "sunset",
    tilt: -3,
    image: null,
    alt: "Souvenir d'été au coucher du soleil"
  },
  {
    id: "candles",
    caption: "L'an dernier",
    note: "la bougie soufflée",
    symbol: "✦",
    tone: "blush",
    tilt: 2,
    image: null,
    alt: "Souvenir d'anniversaire et de bougies"
  },
  {
    id: "sea",
    caption: "Notre escapade",
    note: "les pieds dans l'eau",
    symbol: "≈",
    tone: "sea",
    tilt: -1.5,
    image: null,
    alt: "Souvenir d'escapade au bord de l'eau"
  },
  {
    id: "road",
    caption: "Un soir d'été",
    note: "la route sans but",
    symbol: "→",
    tone: "gold",
    tilt: 3,
    image: null,
    alt: "Souvenir d'un soir d'été sur la route"
  },
  {
    id: "birthday",
    caption: "Ton grand jour",
    note: "22 bougies",
    symbol: "♡",
    tone: "rose",
    tilt: -2,
    image: null,
    alt: "Souvenir de ton anniversaire"
  },
  {
    id: "next",
    caption: "À venir",
    note: "notre prochain souvenir",
    symbol: "✧",
    tone: "linen",
    tilt: 2.5,
    image: null,
    alt: "Le prochain souvenir à créer"
  }
];

export const chapter = {
  eyebrow: "Chapitre 23",
  title: "A new chapter begins",
  lead: "Une année de plus, ce n'est pas une page qui se tourne. C'est un cahier tout neuf, avec de la place pour ce qui compte vraiment.",
  goals: [
    "Dire oui à ce qui te fait vibrer, même quand ça bouscule un peu.",
    "T'offrir des matins lents et des soirées sans culpabilité.",
    "Écrire une page de toi, sans te demander si elle plaira.",
    "Choisir les personnes qui te font du bien, et le leur dire.",
    "Te rappeler que tu es déjà digne, entière, et en chemin."
  ],
  affirmations: [
    "Je n'ai pas besoin d'être parfaite pour être digne d'amour.",
    "Ma douceur est une force, pas une faiblesse.",
    "Je peux avancer doucement et aller loin.",
    "Ce que je fais aujourd'hui prépare ce que je deviendrai demain.",
    "J'ai le droit de prendre de la place et de demander ce dont j'ai besoin.",
    "Les belles choses arrivent aussi à celles qui doutent.",
    "Je suis fière de la personne que je suis devenue."
  ],
  quote: "Et un jour, tu réalises que la vie que tu attends est déjà en train de pousser, là, entre tes mains."
};

export const soundtrack = {
  moods: [
    {
      id: "aube",
      name: "Aube",
      description: "Une lumière qui monte doucement.",
      note: "Pour les matins lents"
    },
    {
      id: "or",
      name: "Or",
      description: "Un éclat chaud, presque suspendu.",
      note: "Pour les beaux jours"
    },
    {
      id: "nuit",
      name: "Nuit",
      description: "Une respiration profonde, un peu veloutée.",
      note: "Pour les fins de soirée"
    }
  ],
  tracks: [
    { title: "Golden Hour", artist: "JVKE", note: "la lumière de fin de journée" },
    { title: "Best Part", artist: "Daniel Caesar", note: "pour les moments à deux" },
    { title: "Brown Skin Girl", artist: "Beyoncé", note: "la peau, la lumière, la fierté" },
    { title: "Feels Like Summer", artist: "Childish Gambino", note: "une chaleur qui traîne" },
    { title: "A Sunday Kind of Love", artist: "Etta James", note: "un dimanche au ralenti" },
    { title: "Clair de Lune", artist: "Debussy", note: "quand la nuit devient douce" }
  ]
};

export const wishes = [
  "Que cette année te donne le courage de dire oui à ce qui t'appelle.",
  "Que tu trouves des raisons de rire même les jours gris.",
  "Que tu sois entourée de personnes qui te célèbrent, pas seulement qui te tolèrent.",
  "Que tu t'accordes le droit de changer d'avis.",
  "Que les petits plaisirs prennent une grande place.",
  "Que tu cesses de t'excuser d'exister pleinement.",
  "Que tu réalises un rêve que tu gardes pour toi depuis longtemps.",
  "Que ton corps soit traité comme une maison que tu aimes habiter.",
  "Que tu reçoives autant d'amour que tu en donnes.",
  "Que tu gardes ta façon unique de voir le monde.",
  "Qu'une belle surprise arrive sans prévenir.",
  "Que tu sois fière du chemin, même s'il n'est pas encore terminé."
];

export const quiz = [
  {
    question: "Un dimanche parfait commence par…",
    options: [
      { label: "Un café et le silence", trait: "douceur" },
      { label: "Une idée un peu folle", trait: "aventure" },
      { label: "Un message d'une personne aimée", trait: "lumiere" }
    ]
  },
  {
    question: "Dans ton sac, il y a toujours…",
    options: [
      { label: "Un carnet pour tout noter", trait: "profondeur" },
      { label: "Un truc qui ne sert à rien mais qui te fait rire", trait: "lumiere" },
      { label: "Une petite attention pour quelqu'un", trait: "douceur" }
    ]
  },
  {
    question: "Une année réussie, pour toi, c'est une année où…",
    options: [
      { label: "Tu as découvert quelque chose de nouveau", trait: "aventure" },
      { label: "Tu t'es sentie alignée", trait: "profondeur" },
      { label: "Tu as fait rire les gens que tu aimes", trait: "lumiere" }
    ]
  },
  {
    question: "Ce qui te fait sourire instantanément…",
    options: [
      { label: "Une chanson qui tombe au bon moment", trait: "profondeur" },
      { label: "Un fou rire qui n'a aucun sens", trait: "lumiere" },
      { label: "Quelqu'un qui pose sa main sur la tienne", trait: "douceur" }
    ]
  },
  {
    question: "Ton prochain grand souvenir, tu le vois comment ?",
    options: [
      { label: "Avec un billet de train", trait: "aventure" },
      { label: "Avec les bonnes personnes", trait: "douceur" },
      { label: "Avec toi, simplement fière de toi", trait: "profondeur" }
    ]
  }
];

export const quizResults = {
  lumiere: {
    title: "Lumière",
    label: "Ton énergie du moment",
    text: "Tu es celle qui allume une pièce sans le vouloir. Ton humour, ton regard, ta façon de rendre les jours plus légers : c'est ta signature. Cette année, garde cette lumière, mais permets-toi aussi de ne pas toujours devoir éclairer pour les autres."
  },
  douceur: {
    title: "Douceur",
    label: "Ton énergie du moment",
    text: "Tu avances avec une attention rare aux autres et aux détails. Tu sais prendre soin, écouter, apaiser. Cette année, retourne un peu de cette douceur vers toi. Tu mérites la même délicatesse que celle que tu offres si naturellement."
  },
  aventure: {
    title: "Aventure",
    label: "Ton énergie du moment",
    text: "Il y a en toi une envie de mouvement, de grand air et d'inattendu. Tu as besoin de sentir que la vie est plus large que ce que tu connais déjà. Cette année, dis oui à une chose qui te fait un peu peur. C'est souvent là que commencent les meilleurs souvenirs."
  },
  profondeur: {
    title: "Profondeur",
    label: "Ton énergie du moment",
    text: "Tu ressens, tu penses, tu observes. Tu n'aimes pas les choses en surface, et c'est ce qui rend tes liens si précieux. Cette année, fais de la place à ce que tu ressens sans chercher à tout expliquer. Ta sensibilité n'est pas un poids : c'est une boussole."
  }
};
