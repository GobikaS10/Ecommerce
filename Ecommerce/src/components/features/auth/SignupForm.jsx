import React, { useState } from "react";
import { useApp } from "../../../store";
import { useFormField } from "../../../hooks";
import { AuthCard } from "./AuthCard";
import { createDocument, getDocuments } from "../../../API/domoAPI";

const validateName = (v) => (!v.trim() ? "Full name is required" : "");

const validateEmail = (v) =>
  !v.trim()
    ? "Email is required"
    : !v.includes("@")
      ? "Enter a valid email"
      : "";

const validatePassword = (v) =>
  !v.trim() ? "Password is required" : v.length < 6 ? "Min 6 characters" : "";

function PasswordStrength({ password }) {
  if (!password) return null;

  const checks = [
    { label: "6+ chars", pass: password.length >= 6 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];

  const score = checks.filter((c) => c.pass).length;
  const colors = ["bg-red-400", "bg-amber-400", "bg-emerald-500"];
  const labels = ["Weak", "Fair", "Strong"];

  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              i < score ? colors[score - 1] : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`text-[10px] font-bold ${
            score === 1
              ? "text-red-500"
              : score === 2
                ? "text-amber-500"
                : score === 3
                  ? "text-emerald-600"
                  : "text-slate-400"
          }`}
        >
          {score > 0 ? labels[score - 1] : ""}
        </span>

        <div className="flex gap-1.5">
          {checks.map((c) => (
            <span
              key={c.label}
              className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full transition-all ${
                c.pass
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {c.pass ? "✓" : "·"} {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  error,
  rightEl,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </label>

      <div
        className={`flex items-center bg-slate-50 border rounded-2xl overflow-hidden transition-all duration-200
        ${
          error
            ? "border-red-300 ring-2 ring-red-100"
            : focused
              ? "border-slate-400 ring-2 ring-slate-100 bg-white"
              : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <span className="pl-4 text-slate-400 shrink-0">{icon}</span>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 py-3.5 pl-3 pr-2 outline-none"
        />

        {rightEl && <span className="pr-3 shrink-0">{rightEl}</span>}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

function EyeToggle({ show, onToggle }) {
  return (
    <button
      onClick={onToggle}
      type="button"
      className="text-slate-400 hover:text-slate-700 transition-colors"
    >
      {show ? (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

export default function SignupForm() {
  const { login, navigate } = useApp();

  const nameField = useFormField("", validateName);
  const emailField = useFormField("", validateEmail);
  const passField = useFormField("", validatePassword);
  const confirmField = useFormField("", () => "");

  const [submitErr, setSubmitErr] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  async function handleSubmit() {
    if (!agreed) {
      setSubmitErr("Please agree to the Terms & Privacy Policy.");
      return;
    }

    const nOk = nameField.validate();
    const eOk = emailField.validate();
    const pOk = passField.validate();

    if (passField.value !== confirmField.value) {
      confirmField.setError("Passwords do not match");
      return;
    }

    if (!nOk || !eOk || !pOk) {
      setSubmitErr("Please fix the errors above.");
      return;
    }

    setSubmitErr("");
    setLoading(true);

    try {
      const users = await getDocuments("testing");

      const existingUser = users.find(
        (u) =>
          u.content.email?.trim().toLowerCase() ===
          emailField.value.trim().toLowerCase(),
      );

      if (existingUser) {
        setSubmitErr("Email already registered.");
        setLoading(false);
        return;
      }

      await createDocument("testing", {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        password: passField.value,
      });

      login({
        name: nameField.value.trim(),
        email: emailField.value.trim(),
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setSubmitErr("Failed to store user in Domo.");
      setLoading(false);
    }
  }

  return (
    <AuthCard
      icon={<span className="text-2xl">🚀</span>}
      title="Create account"
      subtitle="Join millions of happy ShopX customers"
    >
      <div className="flex flex-col gap-4">
        <InputField
          label="Full Name"
          value={nameField.value}
          onChange={(e) => {
            nameField.onChange(e);
            setSubmitErr("");
          }}
          onBlur={nameField.onBlur}
          placeholder="Enter your full name"
          error={nameField.error}
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />

        <InputField
          label="Email Address"
          type="email"
          value={emailField.value}
          onChange={(e) => {
            emailField.onChange(e);
            setSubmitErr("");
          }}
          onBlur={emailField.onBlur}
          placeholder="Enter your email address"
          error={emailField.error}
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />

        <div className="flex flex-col gap-0">
          <InputField
            label="Password"
            type={showPass ? "text" : "password"}
            value={passField.value}
            onChange={(e) => {
              passField.onChange(e);
              setSubmitErr("");
            }}
            onBlur={passField.onBlur}
            placeholder="Min. 6 characters"
            error={passField.error}
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
            rightEl={
              <EyeToggle
                show={showPass}
                onToggle={() => setShowPass(!showPass)}
              />
            }
          />
          <PasswordStrength password={passField.value} />
        </div>

        <InputField
          label="Confirm Password"
          type="password"
          value={confirmField.value}
          onChange={(e) => {
            confirmField.onChange(e);
            confirmField.setError("");
            setSubmitErr("");
          }}
          placeholder="Repeat password"
          error={confirmField.error}
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
          }
        />

        <label className="flex items-start gap-3 cursor-pointer group mt-1">
          <div
            onClick={() => setAgreed(!agreed)}
            className={`w-5 h-5 rounded-md border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 ${
              agreed
                ? "bg-slate-900 border-slate-900"
                : "border-slate-300 group-hover:border-slate-500"
            }`}
          >
            {agreed && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>

          <span className="text-xs text-slate-500 leading-relaxed">
            I agree to ShopX&apos;s{" "}
            <span className="text-sky-500 font-semibold cursor-pointer hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-sky-500 font-semibold cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </span>
        </label>

        {submitErr && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-3 rounded-xl">
            <span>⚠️</span> {submitErr}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 mt-1 rounded-2xl text-sm font-black tracking-wide text-white
            bg-gradient-to-r from-slate-800 to-slate-900
            hover:from-slate-700 hover:to-slate-800
            flex items-center justify-center gap-2.5
            transition-all duration-200 active:scale-95
            disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>

      <p className="text-center text-sm text-slate-400 mt-6">
        Already have an account?{" "}
        <button
          onClick={() => navigate("login")}
          className="text-sky-500 font-bold hover:text-slate-900 transition-colors"
        >
          Sign in
        </button>
      </p>
    </AuthCard>
  );
}
