import domo from 'ryuu.js';

const COLLECTION = 'products';
const BASE_URL   = '/domo/datastores/v1';

// ─────────────────────────────────────────────
// STEP 3 — Convert JS product → flat DB strings
// (manifest requires all STRING columns)
// ─────────────────────────────────────────────
const toDbRow = (p) => ({
  name:          p.name,
  subtitle:      p.subtitle       ?? '',
  price:         String(p.price),           // 349      → "349"
  originalPrice: String(p.originalPrice),   // 399      → "399"
  rating:        String(p.rating),          // 4.8      → "4.8"
  reviewCount:   String(p.reviewCount),     // 12840    → "12840"
  category:      p.category       ?? '',
  badge:         p.badge          ?? '',
  image:         p.image          ?? '',
  bgFrom:        p.bgFrom         ?? '',
  bgTo:          p.bgTo           ?? '',
  accentText:    p.accentText     ?? '',
  description:   p.description    ?? '',
  tags:          Array.isArray(p.tags)
                   ? p.tags.join(',')        // ["a","b"] → "a,b"
                   : '',
  inStock:       String(p.inStock),          // true     → "true"
});

// ─────────────────────────────────────────────
// STEP 5 — Map doc.content → usable JS object
// (converts strings back to correct types)
// ─────────────────────────────────────────────
const fromDbRow = (doc) => {
  const c = doc.content;
  return {
    id:            doc.id,                              // Domo's auto-assigned ID
    name:          c.name,
    subtitle:      c.subtitle,
    price:         parseFloat(c.price),                 // "349"   → 349
    originalPrice: parseFloat(c.originalPrice),         // "399"   → 399
    rating:        parseFloat(c.rating),                // "4.8"   → 4.8
    reviewCount:   parseInt(c.reviewCount, 10),         // "12840" → 12840
    category:      c.category,
    badge:         c.badge,
    image:         c.image,
    bgFrom:        c.bgFrom,
    bgTo:          c.bgTo,
    accentText:    c.accentText,
    description:   c.description,
    tags:          c.tags ? c.tags.split(',') : [],     // "a,b"   → ["a","b"]
    inStock:       c.inStock === 'true',                // "true"  → true
  };
};

// ─────────────────────────────────────────────
// STEP 4 — Fetch all products using domo.get
// ─────────────────────────────────────────────
export const getProducts = async () => {
  const docs = await domo.get(
    `${BASE_URL}/collections/${COLLECTION}/documents/`
  );
  return docs.map(fromDbRow);    // STEP 5 — map every doc.content
};

// ─────────────────────────────────────────────
// STEP 3 — Insert one product using domo.post
// ─────────────────────────────────────────────
export const createProduct = async (product) => {
  const doc = await domo.post(
    `${BASE_URL}/collections/${COLLECTION}/documents/`,
    { content: toDbRow(product) }
  );
  return fromDbRow(doc);
};

export const updateProduct = async (id, product) => {
  const doc = await domo.put(
    `${BASE_URL}/collections/${COLLECTION}/documents/${id}`,
    { content: toDbRow(product) }
  );
  return fromDbRow(doc);
};

export const deleteProduct = async (id) => {
  return domo.delete(
    `${BASE_URL}/collections/${COLLECTION}/documents/${id}`
  );
};