import React, { useState } from 'react';
import { useFormField } from '../../../hooks';
import { getDocuments, updateDocumentPassword } from '../../../API/domoAPI';
import AuthCard from './AuthCard';
import InputField from './InputField';
import EyeToggle from './EyeToggle';

const validateEmail = (v) =>
  !v.trim() ? 'Email is required' : !v.includes('@') ? 'Enter a valid email' : '';

export default function ForgotPasswordForm({ onBackToLogin }) {
  const forgotEmailField = useFormField('', validateEmail);

  const [submitErr, setSubmitErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetUserId, setResetUserId] = useState(null);
  const [resetSuccess, setResetSuccess] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showResetPass, setShowResetPass] = useState(false);
  const [showResetConfirmPass, setShowResetConfirmPass] = useState(false);

  async function handleForgotCheckEmail() {
    const eOk = forgotEmailField.validate();

    if (!eOk) {
      setSubmitErr('Please enter a valid email.');
      return;
    }

    setSubmitErr('');
    setResetSuccess('');
    setLoading(true);

    try {
      const users = await getDocuments('testing');

      const existingUser = users.find(
        (u) =>
          u.content.email?.trim().toLowerCase() ===
          forgotEmailField.value.trim().toLowerCase()
      );

      if (!existingUser) {
        setSubmitErr('Email not registered');
        setLoading(false);
        return;
      }

      setResetUserId(existingUser.id);
      setResetStep(2);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setSubmitErr('Failed to verify email');
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!newPassword.trim()) {
      setSubmitErr('New password is required');
      return;
    }

    if (newPassword.length < 6) {
      setSubmitErr('Password must be at least 6 characters');
      return;
    }

    if (!confirmPassword.trim()) {
      setSubmitErr('Confirm password is required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setSubmitErr('Passwords do not match');
      return;
    }

    setSubmitErr('');
    setResetSuccess('');
    setLoading(true);

    try {
      const users = await getDocuments('testing');
      const existingUser = users.find((u) => u.id === resetUserId);

      if (!existingUser) {
        setSubmitErr('User not found');
        setLoading(false);
        return;
      }

      await updateDocumentPassword('testing', resetUserId, {
        ...existingUser.content,
        password: newPassword,
      });

      setLoading(false);
      setResetSuccess('Password updated successfully ✅');

      setTimeout(() => {
        onBackToLogin();
      }, 1500);
    } catch (error) {
      console.error(error);
      setSubmitErr('Failed to update password');
      setLoading(false);
    }
  }

  return (
    <AuthCard
      icon={
        <svg
          className="w-8 h-8 text-sky-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 17h.01" />
          <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 3-3 3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      }
      title="Forgot password?"
      subtitle={
        resetStep === 1
          ? 'Enter your registered email to continue'
          : 'Set a new password for your account'
      }
    >
      <div className="flex flex-col gap-4">
        {resetStep === 1 && (
          <>
            <div className="bg-sky-50 border border-sky-200 text-sky-700 text-xs font-medium px-4 py-3 rounded-xl">
              Enter the email address linked to your account.
            </div>

            <InputField
              label="Registered Email"
              type="email"
              value={forgotEmailField.value}
              onChange={(e) => {
                forgotEmailField.onChange(e);
                setSubmitErr('');
                setResetSuccess('');
              }}
              onBlur={forgotEmailField.onBlur}
              placeholder="you@example.com"
              error={forgotEmailField.error}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />

            {submitErr && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-3 rounded-xl">
                <span>⚠️</span> {submitErr}
              </div>
            )}

            <button
              onClick={handleForgotCheckEmail}
              disabled={loading}
              className="w-full py-4 mt-1 rounded-2xl text-sm font-black tracking-wide text-white bg-slate-900 hover:bg-slate-700 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Checking...' : 'Continue'}
            </button>
          </>
        )}

        {resetStep === 2 && (
          <>
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-4 py-3 rounded-xl">
              Email verified. Set your new password below.
            </div>

            <InputField
              label="New Password"
              type={showResetPass ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setSubmitErr('');
                setResetSuccess('');
              }}
              placeholder="Enter new password"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              rightEl={
                <EyeToggle
                  show={showResetPass}
                  onToggle={() => setShowResetPass(!showResetPass)}
                />
              }
            />

            <InputField
              label="Confirm Password"
              type={showResetConfirmPass ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setSubmitErr('');
                setResetSuccess('');
              }}
              placeholder="Confirm new password"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              rightEl={
                <EyeToggle
                  show={showResetConfirmPass}
                  onToggle={() => setShowResetConfirmPass(!showResetConfirmPass)}
                />
              }
            />

            {submitErr && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-3 rounded-xl">
                <span>⚠️</span> {submitErr}
              </div>
            )}

            {resetSuccess && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-4 py-3 rounded-xl">
                <span>✅</span> {resetSuccess}
              </div>
            )}

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full py-4 mt-1 rounded-2xl text-sm font-black tracking-wide text-white bg-slate-900 hover:bg-slate-700 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Updating...' : 'Reset Password'}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full py-3 rounded-2xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all"
        >
          ← Back to Sign In
        </button>
      </div>
    </AuthCard>
  );
}