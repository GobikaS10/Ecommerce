import React from "react";
import { useApp } from "../../../store";

export default function OrderSuccessPage() {
  const { navigate } = useApp();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600" />

        <div className="px-6 py-10 sm:px-10">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-emerald-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl font-black text-slate-900">
            Order Placed Successfully 🎉
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your order has been confirmed and will be delivered soon.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("home")}
              className="flex-1 rounded-2xl bg-slate-900 text-white py-3.5 font-bold hover:bg-slate-800 transition"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("cart")}
              className="flex-1 rounded-2xl border border-slate-300 text-slate-700 py-3.5 font-bold hover:bg-slate-50 transition"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}