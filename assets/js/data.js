window.BAZZART_DATA = {
  categories: [
    { id: 'artisanat', name: 'Artisanat', icon: 'A' },
    { id: 'mode', name: 'Mode', icon: 'M' },
    { id: 'alimentaire', name: 'Alimentaire', icon: 'F' },
    { id: 'beaute', name: 'Beaute', icon: 'B' },
    { id: 'deco', name: 'Deco', icon: 'D' },
    { id: 'tech', name: 'Tech', icon: 'T' }
  ],
  boutiques: [
    { id: 'shop-1', name: 'Karama Atelier', owner: 'Fatma Ben Salah', region: 'Sfax', city: 'Sfax', rating: 4.8, reviews: 132, verified: true, description: 'Objets artisanaux modernes, faits main en Tunisie.' },
    { id: 'shop-2', name: 'Nord Style', owner: 'Sami Trabelsi', region: 'Tunis', city: 'Lac 1', rating: 4.6, reviews: 84, verified: true, description: 'Mode urbaine et pieces limitees pour jeunes createurs.' },
    { id: 'shop-3', name: 'Saveurs Medina', owner: 'Nour Gharbi', region: 'Nabeul', city: 'Hammamet', rating: 4.7, reviews: 66, verified: false, description: 'Produits gourmands locaux et paniers cadeaux.' },
    { id: 'shop-4', name: 'Rituel Naturel', owner: 'Aya Masmoudi', region: 'Sousse', city: 'Sousse', rating: 4.5, reviews: 49, verified: true, description: 'Soins beaute naturels inspires des recettes locales.' },
    { id: 'shop-5', name: 'Maison Jasmin', owner: 'Youssef Khlifi', region: 'Monastir', city: 'Monastir', rating: 4.4, reviews: 37, verified: false, description: 'Deco maison, textile et accessoires de table.' },
    { id: 'shop-6', name: 'Smart Souk', owner: 'Amine Fersi', region: 'Ariana', city: 'Ariana', rating: 4.3, reviews: 21, verified: true, description: 'Gadgets utiles, tech du quotidien et accessoires mobiles.' },
    { id: 'shop-7', name: 'Bledi Textile', owner: 'Rania Mansouri', region: 'Kairouan', city: 'Kairouan', rating: 4.5, reviews: 58, verified: true, description: 'Textiles tunisiens traditionnels et linge de maison.' },
    { id: 'shop-8', name: 'Cap Bon Delices', owner: 'Hichem Zouari', region: 'Nabeul', city: 'Korba', rating: 4.7, reviews: 94, verified: true, description: 'Confitures, huiles, sauces artisanales et produits terroir.' },
    { id: 'shop-9', name: 'Bahri Deco', owner: 'Dhia Ben Amor', region: 'Bizerte', city: 'Bizerte', rating: 4.2, reviews: 29, verified: false, description: 'Decoration cotiere, objets marins et idees cadeaux.' },
    { id: 'shop-10', name: 'Sahara Glow', owner: 'Imen Triki', region: 'Gabes', city: 'Gabes', rating: 4.6, reviews: 73, verified: true, description: 'Cosmetiques naturels a base de plantes du sud tunisien.' },
    { id: 'shop-11', name: 'Zag Tech Lab', owner: 'Marwen Aouadi', region: 'Zaghouan', city: 'Zaghouan', rating: 4.4, reviews: 41, verified: true, description: 'Accessoires connectes et solutions tech abordables.' },
    { id: 'shop-12', name: 'Jerba Handcraft', owner: 'Mouna Jlassi', region: 'Medenine', city: 'Djerba', rating: 4.9, reviews: 118, verified: true, description: 'Creation artisanale djerbienne et pieces uniques.' }
  ],
  products: [
    { id: 'p-101', shopId: 'shop-1', name: 'Mug artisanal bleu', category: 'artisanat', price: 35000, stock: 12, rating: 4.7, createdAt: '2026-03-15', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=70', description: 'Ceramique peinte a la main. Edition locale.' },
    { id: 'p-102', shopId: 'shop-1', name: 'Bougie terre cuite', category: 'artisanat', price: 29000, stock: 25, rating: 4.5, createdAt: '2026-03-05', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=70', description: 'Bougie parfumee avec pot reusable.' },
    { id: 'p-103', shopId: 'shop-2', name: 'Chemise lin beige', category: 'mode', price: 98000, stock: 16, rating: 4.8, createdAt: '2026-03-20', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=70', description: 'Coupe confortable et tissu respirant.' },
    { id: 'p-104', shopId: 'shop-2', name: 'Sac tote bicolor', category: 'mode', price: 56000, stock: 31, rating: 4.4, createdAt: '2026-02-22', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=70', description: 'Sac solide pour usage quotidien.' },
    { id: 'p-105', shopId: 'shop-3', name: 'Coffret epices premium', category: 'alimentaire', price: 64000, stock: 18, rating: 4.9, createdAt: '2026-03-11', image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=70', description: 'Selection locale pour cuisine tunisienne.' },
    { id: 'p-106', shopId: 'shop-3', name: 'Huile olive reserve', category: 'alimentaire', price: 44000, stock: 42, rating: 4.6, createdAt: '2026-01-30', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=70', description: 'Extraction a froid, bouteille 500ml.' },
    { id: 'p-107', shopId: 'shop-4', name: 'Savon argan naturel', category: 'beaute', price: 23000, stock: 60, rating: 4.5, createdAt: '2026-03-09', image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a2?auto=format&fit=crop&w=800&q=70', description: 'Formule douce pour peau sensible.' },
    { id: 'p-108', shopId: 'shop-4', name: 'Serum cactus glow', category: 'beaute', price: 78000, stock: 22, rating: 4.7, createdAt: '2026-03-21', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=70', description: 'Serum visage texture legere.' },
    { id: 'p-109', shopId: 'shop-5', name: 'Set coussins zellige', category: 'deco', price: 89000, stock: 14, rating: 4.3, createdAt: '2026-02-14', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=70', description: 'Pack 2 coussins deco style medina.' },
    { id: 'p-110', shopId: 'shop-5', name: 'Vase artisanal dorure', category: 'deco', price: 73000, stock: 10, rating: 4.6, createdAt: '2026-03-01', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=70', description: 'Vase decoratif finition doree.' },
    { id: 'p-111', shopId: 'shop-6', name: 'Support mobile magn.', category: 'tech', price: 41000, stock: 33, rating: 4.2, createdAt: '2026-03-03', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=70', description: 'Support voiture aimante rapide.' },
    { id: 'p-112', shopId: 'shop-6', name: 'Chargeur USB-C 45W', category: 'tech', price: 69000, stock: 27, rating: 4.5, createdAt: '2026-03-18', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=70', description: 'Charge rapide compatible multi devices.' },
    { id: 'p-113', shopId: 'shop-7', name: 'Nappe brodee kairouan', category: 'artisanat', price: 82000, stock: 20, rating: 4.6, createdAt: '2026-03-07', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=70', description: 'Broderie fine et finition premium.' },
    { id: 'p-114', shopId: 'shop-7', name: 'Fouta rayee coton', category: 'mode', price: 38000, stock: 45, rating: 4.4, createdAt: '2026-02-19', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=70', description: 'Fouta legere multifonction pour plage et maison.' },
    { id: 'p-115', shopId: 'shop-8', name: 'Confiture figue bio', category: 'alimentaire', price: 21000, stock: 70, rating: 4.8, createdAt: '2026-03-14', image: 'https://images.unsplash.com/photo-1471943038886-87c772c31367?auto=format&fit=crop&w=800&q=70', description: 'Recette artisanale sans conservateurs.' },
    { id: 'p-116', shopId: 'shop-8', name: 'Harissa artisanale douce', category: 'alimentaire', price: 18000, stock: 95, rating: 4.5, createdAt: '2026-03-17', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=70', description: 'Ideal pour cuisine quotidienne et sandwichs.' },
    { id: 'p-117', shopId: 'shop-9', name: 'Miroir corde marine', category: 'deco', price: 67000, stock: 11, rating: 4.1, createdAt: '2026-02-26', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=70', description: 'Inspiration bord de mer, style naturel.' },
    { id: 'p-118', shopId: 'shop-9', name: 'Lampe coquillage', category: 'deco', price: 92000, stock: 8, rating: 4.3, createdAt: '2026-03-06', image: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=800&q=70', description: 'Eclairage doux pour salon ou chambre.' },
    { id: 'p-119', shopId: 'shop-10', name: 'Masque argile rose', category: 'beaute', price: 26000, stock: 65, rating: 4.7, createdAt: '2026-03-08', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=70', description: 'Purifie la peau et reduit les brillances.' },
    { id: 'p-120', shopId: 'shop-10', name: 'Huile capillaire dattes', category: 'beaute', price: 34000, stock: 52, rating: 4.6, createdAt: '2026-03-12', image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=800&q=70', description: 'Nutrition intense pour cheveux secs.' },
    { id: 'p-121', shopId: 'shop-11', name: 'Ecouteurs sans fil mini', category: 'tech', price: 119000, stock: 26, rating: 4.4, createdAt: '2026-03-10', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=70', description: 'Compact, bonne autonomie et son equilibré.' },
    { id: 'p-122', shopId: 'shop-11', name: 'Lampe LED bureau USB', category: 'tech', price: 53000, stock: 40, rating: 4.2, createdAt: '2026-03-02', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=70', description: 'Eclairage reglable pour travail et etude.' },
    { id: 'p-123', shopId: 'shop-12', name: 'Plateau palmier grave', category: 'artisanat', price: 47000, stock: 34, rating: 4.9, createdAt: '2026-03-19', image: 'https://images.unsplash.com/photo-1516179257071-4dbac912e9cb?auto=format&fit=crop&w=800&q=70', description: 'Bois grave a la main avec motifs djerbiens.' },
    { id: 'p-124', shopId: 'shop-12', name: 'Sandales cuir djerba', category: 'mode', price: 88000, stock: 19, rating: 4.8, createdAt: '2026-03-22', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=70', description: 'Cuir souple et semelle confortable.' },
    { id: 'p-125', shopId: 'shop-1', name: 'Assiette ceramique sable', category: 'artisanat', price: 32000, stock: 28, rating: 4.6, createdAt: '2026-03-23', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=70', description: 'Ceramique artisanale finition mate.' },
    { id: 'p-126', shopId: 'shop-2', name: 'Veste denim courte', category: 'mode', price: 124000, stock: 13, rating: 4.5, createdAt: '2026-03-13', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=70', description: 'Veste urbaine coupe moderne.' },
    { id: 'p-127', shopId: 'shop-3', name: 'Datte premium deglet', category: 'alimentaire', price: 27000, stock: 88, rating: 4.8, createdAt: '2026-03-25', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=800&q=70', description: 'Selection premium du sud tunisien.' },
    { id: 'p-128', shopId: 'shop-4', name: 'Creme mains fleur oranger', category: 'beaute', price: 24000, stock: 57, rating: 4.4, createdAt: '2026-03-24', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=70', description: 'Hydratation quotidienne non grasse.' },
    { id: 'p-129', shopId: 'shop-5', name: 'Set table boheme 4p', category: 'deco', price: 113000, stock: 17, rating: 4.5, createdAt: '2026-03-20', image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=70', description: 'Style boheme chic pour salle a manger.' },
    { id: 'p-130', shopId: 'shop-6', name: 'Station charge 3-en-1', category: 'tech', price: 149000, stock: 22, rating: 4.6, createdAt: '2026-03-26', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=70', description: 'Recharge telephone, montre et ecouteurs.' },
    { id: 'p-131', shopId: 'shop-8', name: 'Pate olive verte', category: 'alimentaire', price: 19000, stock: 76, rating: 4.3, createdAt: '2026-03-21', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=70', description: 'Recette locale ideale pour aperitif.' },
    { id: 'p-132', shopId: 'shop-9', name: 'Cadre mural phare', category: 'deco', price: 58000, stock: 26, rating: 4.2, createdAt: '2026-03-18', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=70', description: 'Ambiance marine pour salon ou entree.' },
    { id: 'p-133', shopId: 'shop-10', name: 'Brume visage aloe', category: 'beaute', price: 28000, stock: 49, rating: 4.7, createdAt: '2026-03-27', image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=800&q=70', description: 'Fraicheur immediate et peau apaisee.' },
    { id: 'p-134', shopId: 'shop-12', name: 'Panier alfa djerba', category: 'artisanat', price: 52000, stock: 30, rating: 4.9, createdAt: '2026-03-28', image: 'https://images.unsplash.com/photo-1467043198406-dc953a3defa0?auto=format&fit=crop&w=800&q=70', description: 'Panier tresse main, edition saisonniere.' }
  ],
  reviews: {
    'p-101': [
      { author: 'Ines', rating: 5, text: 'Tres beau produit, finition soignee.' },
      { author: 'Walid', rating: 4, text: 'Bonne qualite, livraison rapide.' }
    ],
    'p-103': [
      { author: 'Hiba', rating: 5, text: 'Tissu top et taille correcte.' },
      { author: 'Rami', rating: 4, text: 'Style elegant, je recommande.' }
    ],
    'p-105': [
      { author: 'Meriem', rating: 5, text: 'Saveurs authentiques, excellent.' },
      { author: 'Yassine', rating: 5, text: 'Tres bon coffret pour cadeau.' }
    ],
    'p-108': [
      { author: 'Sarra', rating: 4, text: 'Texture legere et parfum agreable.' },
      { author: 'Nadine', rating: 5, text: 'Resultat visible apres quelques jours.' }
    ],
    'p-113': [
      { author: 'Maya', rating: 5, text: 'Broderie magnifique, travail propre.' },
      { author: 'Yosra', rating: 4, text: 'Produit conforme et bien emballe.' }
    ],
    'p-115': [
      { author: 'Hatem', rating: 5, text: 'Gout naturel et sucre bien dose.' },
      { author: 'Leila', rating: 4, text: 'Excellent au petit dejeuner.' }
    ],
    'p-119': [
      { author: 'Amal', rating: 5, text: 'Peau plus nette des la 2eme semaine.' },
      { author: 'Rim', rating: 4, text: 'Bon rapport qualite prix.' }
    ],
    'p-121': [
      { author: 'Karim', rating: 4, text: 'Connexion rapide, son propre.' },
      { author: 'Ahmed', rating: 5, text: 'Super autonomie pour ce prix.' }
    ],
    'p-123': [
      { author: 'Mounir', rating: 5, text: 'Tres belle piece artisanale.' },
      { author: 'Sofiene', rating: 5, text: 'Parfait pour offrir.' }
    ],
    'p-124': [
      { author: 'Asma', rating: 5, text: 'Confortables et elegantes.' },
      { author: 'Noura', rating: 4, text: 'Belle finition cuir.' }
    ],
    'p-125': [
      { author: 'Samiha', rating: 5, text: 'Design sobre et tres pratique.' }
    ],
    'p-127': [
      { author: 'Firas', rating: 5, text: 'Qualite premium, tres moelleuses.' }
    ],
    'p-130': [
      { author: 'Yasser', rating: 4, text: 'Super utile sur bureau, bonne finition.' }
    ],
    'p-134': [
      { author: 'Lina', rating: 5, text: 'Magnifique panier, tres authentique.' }
    ]
  },
  orders: [
    { id: 'ord-5001', shopId: 'shop-1', customer: 'Client A', total: 74000, status: 'Livre', date: '2026-01-12', month: 'Jan' },
    { id: 'ord-5002', shopId: 'shop-1', customer: 'Client B', total: 35000, status: 'Expedie', date: '2026-02-19', month: 'Fev' },
    { id: 'ord-5003', shopId: 'shop-2', customer: 'Client C', total: 98000, status: 'Livre', date: '2026-03-02', month: 'Mar' },
    { id: 'ord-5004', shopId: 'shop-2', customer: 'Client D', total: 156000, status: 'En cours', date: '2026-03-08', month: 'Mar' },
    { id: 'ord-5005', shopId: 'shop-3', customer: 'Client E', total: 46000, status: 'Livre', date: '2026-02-04', month: 'Fev' },
    { id: 'ord-5006', shopId: 'shop-4', customer: 'Client F', total: 23000, status: 'Livre', date: '2026-03-10', month: 'Mar' },
    { id: 'ord-5007', shopId: 'shop-5', customer: 'Client G', total: 92000, status: 'Expedie', date: '2026-03-11', month: 'Mar' },
    { id: 'ord-5008', shopId: 'shop-6', customer: 'Client H', total: 69000, status: 'Livre', date: '2026-01-28', month: 'Jan' },
    { id: 'ord-5009', shopId: 'shop-8', customer: 'Client I', total: 21000, status: 'Livre', date: '2026-03-15', month: 'Mar' },
    { id: 'ord-5010', shopId: 'shop-10', customer: 'Client J', total: 54000, status: 'En cours', date: '2026-03-16', month: 'Mar' },
    { id: 'ord-5011', shopId: 'shop-11', customer: 'Client K', total: 119000, status: 'Expedie', date: '2026-03-18', month: 'Mar' },
    { id: 'ord-5012', shopId: 'shop-12', customer: 'Client L', total: 88000, status: 'Livre', date: '2026-03-21', month: 'Mar' }
  ],
  governors: ['Tunis', 'Ariana', 'Ben Arous', 'Sousse', 'Sfax', 'Nabeul', 'Monastir', 'Bizerte', 'Kairouan', 'Gabes', 'Medenine', 'Beja', 'Zaghouan', 'Kasserine', 'Gafsa']
};
