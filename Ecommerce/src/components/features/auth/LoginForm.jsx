import React, { useState } from 'react';
import { useApp } from '../../../store';
import { useFormField } from '../../../hooks';
import { getDocuments } from '../../../API/domoAPI';
import { loadCartFromDomo } from '../../../lib/cartStorage';
import { AuthCard } from './AuthCard';

const validateEmail = v =>
  !v.trim() ? 'Email is required' : !v.includes('@') ? 'Enter a valid email' : '';

const validatePassword = v =>
  !v.trim() ? 'Password is required' : v.length < 6 ? 'Minimum 6 characters' : '';

// ── InputField ─────────────────────────────────────────────────
function InputField({ label, type = 'text', value, onChange, onBlur, placeholder, icon, error, rightEl, extra }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {extra ? (
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</label>
          {extra}
        </div>
      ) : (
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</label>
      )}

      <div
        className={`flex items-center bg-slate-50 border rounded-2xl overflow-hidden transition-all duration-200
        ${
          error
            ? 'border-red-300 ring-2 ring-red-100'
            : focused
            ? 'border-slate-400 ring-2 ring-slate-100 bg-white'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className="pl-4 text-slate-400 shrink-0">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={e => {
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

// ── Eye toggle ─────────────────────────────────────────────────
function EyeToggle({ show, onToggle }) {
  return (
    <button onClick={onToggle} type="button" className="text-slate-400 hover:text-slate-700 transition-colors">
      {show ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

// ── LoginForm ──────────────────────────────────────────────────
export default function LoginForm() {
  const { login, navigate, setCart } = useApp();
  const emailField = useFormField('', validateEmail);
  const passField = useFormField('', validatePassword);
  const [submitErr, setSubmitErr] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const eOk = emailField.validate();
    const pOk = passField.validate();

    if (!eOk || !pOk) {
      setSubmitErr('Please fix the errors above.');
      return;
    }

    setSubmitErr('');
    setLoading(true);

    try {
      const users = await getDocuments('testing');

      const existingUser = users.find(
        u =>
          u.content.email?.trim().toLowerCase() ===
          emailField.value.trim().toLowerCase()
      );

      if (!existingUser) {
        setSubmitErr('Email not registered');
        setLoading(false);
        return;
      }

      if (existingUser.content.password !== passField.value) {
        setSubmitErr('Wrong password');
        setLoading(false);
        return;
      }

      login({
        name: existingUser.content.name,
        email: existingUser.content.email,
      });

      const savedCart = await loadCartFromDomo(existingUser.content.email);
      console.log('Saved Cart:', savedCart);
      console.log('Is Array:', Array.isArray(savedCart));

      setCart(savedCart);

      setLoading(false);
      navigate('home');
    } catch (error) {
      console.error(error);
      setSubmitErr('Failed to validate login');
      setLoading(false);
    }
  }

  return (
    <AuthCard
      icon={
        <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      }
      title="Welcome back"
      subtitle="Sign in to your ShopX account"
    >
      <div className="flex flex-col gap-4" onKeyDown={e => e.key === 'Enter' && handleSubmit()}>
        <InputField
          label="Email Address"
          type="email"
          value={emailField.value}
          onChange={e => {
            emailField.onChange(e);
            setSubmitErr('');
          }}
          onBlur={emailField.onBlur}
          placeholder="you@example.com"
          error={emailField.error}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />

        <InputField
          label="Password"
          type={showPass ? 'text' : 'password'}
          value={passField.value}
          onChange={e => {
            passField.onChange(e);
            setSubmitErr('');
          }}
          onBlur={passField.onBlur}
          placeholder="••••••••"
          error={passField.error}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
          rightEl={<EyeToggle show={showPass} onToggle={() => setShowPass(!showPass)} />}
          extra={
            <button type="button" className="text-[10px] text-sky-500 hover:text-slate-900 font-semibold transition-colors">
              Forgot password?
            </button>
          }
        />

        {submitErr && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-3 rounded-xl">
            <span>⚠️</span> {submitErr}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 mt-1 rounded-2xl text-sm font-black tracking-wide text-white
            bg-slate-900 hover:bg-slate-700
            flex items-center justify-center gap-2.5
            transition-all duration-200 active:scale-95
            disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>

        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">or continue with</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-semibold text-slate-600">
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-semibold text-slate-600">
            Apple
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-slate-400 mt-6">
        New to ShopX?{' '}
        <button onClick={() => navigate('signup')} className="text-sky-500 font-bold hover:text-slate-900 transition-colors">
          Create free account
        </button>
      </p>
    </AuthCard>
  );
}