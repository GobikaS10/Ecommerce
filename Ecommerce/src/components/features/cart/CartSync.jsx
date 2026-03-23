import { useEffect, useRef } from 'react';
import { useApp } from '../../../store';
import { saveCartToDomo } from '../../../lib/cartStorage';

export default function CartSync() {
  const { user, cart } = useApp();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (!user) {
      firstLoad.current = true;
      return;
    }

    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    saveCartToDomo(user.email, cart).catch((err) => {
      console.error('Failed to sync cart:', err);
    });
  }, [user, cart]);

  return null;
}