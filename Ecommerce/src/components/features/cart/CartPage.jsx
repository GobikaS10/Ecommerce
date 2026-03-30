import React, { useState } from "react";
import { useApp } from "../../../store";
import { useOrderSummary } from "../../../hooks";
import QuantityStepper from "../../ui/QuantityStepper";
import { Divider, EmptyState } from "../../ui/shared.jsx";
import { createDocument } from "../../../API/domoAPI";

// ── CartItem ───────────────────────────────────────────────────
function CartItem({ item }) {
  const { removeFromCart, updateCartQty, navigate } = useApp();
  const [removing, setRemoving] = useState(false);

  function handleRemove() {
    setRemoving(true);
    setTimeout(() => removeFromCart(item.id), 300);
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 shadow-card p-5 transition-all duration-300 ${
        removing ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex gap-5">
        <div
          onClick={() => navigate("product", item)}
          className="w-24 h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer border border-slate-100 hover:border-sky-300 transition-colors"
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${item.bgFrom} ${item.bgTo} flex items-center justify-center`}
            >
              <svg
                className="w-8 h-8 text-white/40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                onClick={() => navigate("product", item)}
                className="font-bold text-slate-900 text-sm leading-snug cursor-pointer hover:text-sky-600 transition-colors"
              >
                {item.name}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
            </div>

            <button
              onClick={handleRemove}
              title="Remove item"
              className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 text-red-400 hover:bg-red-100 hover:text-red-600 hover:border-red-200 flex items-center justify-center shrink-0 transition-all duration-200"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2 flex-wrap gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">
                ₹{(item.price * item.qty).toFixed(2)}
              </span>
              <span className="text-xs text-slate-400">
                ₹{item.price} × {item.qty}
              </span>
              {item.originalPrice > item.price && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <QuantityStepper
              value={item.qty}
              onChange={(qty) => updateCartQty(item.id, qty)}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PromoCode ──────────────────────────────────────────────────
function PromoCode() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  function applyCode() {
    if (code.toUpperCase() === "SHOPX10") {
      setApplied(true);
      setError("");
    } else {
      setError("Invalid promo code. Try SHOPX10");
      setApplied(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
      <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
        <span className="text-base">🏷️</span>
        Promo Code
      </h3>

      {applied ? (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <span className="text-emerald-500 text-base">✅</span>
          <div>
            <p className="text-xs font-bold text-emerald-700">
              SHOPX10 applied!
            </p>
            <p className="text-[10px] text-emerald-600">
              10% discount added to your order
            </p>
          </div>
          <button
            onClick={() => {
              setApplied(false);
              setCode("");
            }}
            className="ml-auto text-xs text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder="Enter promo code"
              className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all uppercase font-mono tracking-widest"
              onKeyDown={(e) => e.key === "Enter" && applyCode()}
            />
            <button
              onClick={applyCode}
              disabled={!code.trim()}
              className="px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Apply
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>
          )}
          <p className="text-[10px] text-slate-400 mt-1.5">
            Try:{" "}
            <span className="font-mono font-bold tracking-widest">SHOPX10</span>
          </p>
        </>
      )}
    </div>
  );
}

// ── SummaryRow ─────────────────────────────────────────────────
function SummaryRow({
  label,
  value,
  valueClass = "text-slate-900",
  bold = false,
  sub,
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <span
          className={`text-sm ${bold ? "font-black text-slate-900" : "text-slate-500"}`}
        >
          {label}
        </span>
        {sub && <p className="text-[10px] text-slate-400">{sub}</p>}
      </div>
      <span
        className={`text-sm font-semibold ${bold ? "text-lg font-black" : ""} ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

// ── OrderSummary ───────────────────────────────────────────────
function OrderSummary({ cart }) {
  const { user, navigate, showToast, clearCart } = useApp();
  const { subtotal, shipping, tax, total, freeShipRemaining } =
    useOrderSummary(cart);

  const totalSaved = cart.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.qty,
    0,
  );

  async function checkout() {
    if (!user) {
      navigate("login");
      return;
    }

    try {
      const orderPayload = {
        orderId: `ORD-${Date.now()}`,
        userEmail: user.email,
        userName: user.name,
        items: JSON.stringify(
          cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty,
            image: item.image || "",
            category: item.category || "",
          })),
        ),
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        status: "Placed",
        createdAt: new Date().toISOString(),
      };

      console.log("Order Payload:", orderPayload);

     await createDocument("orders", orderPayload);

// clear cart
clearCart();

// navigate to success page
navigate("order-success");

      
    } catch (error) {
      console.error("Checkout failed:", error);
      showToast("❌ Failed to place order. Please try again.", "error");
    }
  }

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <h2 className="text-base font-black text-slate-900 mb-5 flex items-center gap-2">
          <span className="text-lg">🛒</span>
          Order Summary
        </h2>

        <div className="flex flex-col gap-3.5">
          <SummaryRow label="Subtotal" value={`₹${subtotal.toFixed(2)}`} />

          <SummaryRow
            label="Shipping"
            value={shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
            valueClass={
              shipping === 0 ? "text-emerald-600 font-black" : "text-slate-900"
            }
            sub={shipping === 0 ? "Free delivery applied" : undefined}
          />

          <SummaryRow label="Estimated Tax (8%)" value={`₹${tax.toFixed(2)}`} />

          {freeShipRemaining > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">🚚</span>
                <span className="text-xs font-bold text-amber-800">
                  Add ₹{freeShipRemaining.toFixed(2)} more for FREE shipping!
                </span>
              </div>

              <div className="h-1.5 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / 49) * 100)}%` }}
                />
              </div>
            </div>
          )}

          <Divider className="my-1" />

          <SummaryRow label="Order Total" value={`₹${total.toFixed(2)}`} bold />
        </div>

        {totalSaved > 0 && (
          <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
            <span className="text-base">💰</span>
            <div>
              <p className="text-xs font-bold text-emerald-700">
                You're saving ₹{totalSaved.toFixed(2)}!
              </p>
              <p className="text-[10px] text-emerald-600">
                Great deals on your selected items
              </p>
            </div>
          </div>
        )}

        <button
          onClick={checkout}
          className="w-full mt-5 py-4 rounded-2xl text-sm font-black tracking-wide text-white
            bg-gradient-to-r from-slate-800 to-slate-900
            hover:from-slate-700 hover:to-slate-800
            flex items-center justify-center gap-2.5
            transition-all duration-200 active:scale-95 shadow-lg"
        >
          {user ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Proceed to Checkout — ₹{total.toFixed(2)}
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
              Sign In to Checkout
            </>
          )}
        </button>

        <button
          onClick={() => navigate("home")}
          className="w-full mt-2.5 py-3 rounded-2xl text-xs font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
        >
          ← Continue Shopping
        </button>
      </div>
    </div>
  );
}

// ── CartPage ───────────────────────────────────────────────────
export default function CartPage() {
  const { cart, navigate } = useApp();
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalSaved = cart.reduce(
    (s, i) => s + (i.originalPrice - i.price) * i.qty,
    0,
  );

  if (!cart.length) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        subtitle="Looks like you haven't added anything yet. Start shopping!"
        action={{ label: "Browse Products", onClick: () => navigate("home") }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
            {totalSaved > 0 && (
              <span className="ml-2 text-emerald-600 font-semibold">
                · Saving ₹{totalSaved.toFixed(2)}
              </span>
            )}
          </p>
        </div>

        <button
          onClick={() => navigate("home")}
          className="text-xs font-semibold text-sky-500 hover:text-slate-900 transition-colors flex items-center gap-1"
        >
          ← Continue Shopping
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <PromoCode />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
