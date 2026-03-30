import { getDocuments, createDocument, updateDocument } from '../API/domoAPI';

export async function saveCartToDomo(userEmail, cart) {
  const carts = await getDocuments('carts');

  const existingCart = carts.find(
    (doc) =>
      doc.content.userEmail?.trim().toLowerCase() ===
      userEmail.trim().toLowerCase()
  );

  const compactCart = cart.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    qty: item.qty,
  }));

  const payload = {
    userEmail,
    items: JSON.stringify(compactCart),
    updatedAt: new Date().toISOString(),
  };

  if (existingCart) {
    await updateDocument('carts', existingCart.id, payload);
  } else {
    await createDocument('carts', payload);
  }
}
export async function loadCartFromDomo(userEmail) {
  const carts = await getDocuments('carts');

  const existingCart = carts.find(
    (doc) =>
      doc.content.userEmail?.trim().toLowerCase() ===
      userEmail.trim().toLowerCase()
  );

  if (!existingCart) return [];

  return JSON.parse(existingCart.content.items || '[]');
}