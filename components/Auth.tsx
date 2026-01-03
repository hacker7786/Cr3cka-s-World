
import React, { useState, useEffect } from 'react';
import { LOGO_URL } from '../constants';

interface AuthProps {
  onLogin: (email: string, password: string) => { success: boolean; error?: string };
  onSignup: (email: string, password: string, username: string) => { success: boolean; error?: string };
  initialMode?: 'signin' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ onLogin, onSignup, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [pendingSignup, setPendingSignup] = useState<{e: string, p: string, u: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cr3cka_saved_credentials');
    if (saved) {
      try {
        const { email: savedEmail, password: savedPass } = JSON.parse(saved);
        if (savedEmail && mode === 'signin') {
          setEmail(savedEmail);
          setPassword(savedPass);
        }
      } catch (e) {
        console.error("Failed to parse saved credentials");
      }
    }
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (mode === 'signup') {
      if (!username) {
        setError('Username is required for signup');
        return;
      }
      setPendingSignup({ e: email, p: password, u: username });
      setShowSaveModal(true);
    } else if (mode === 'forgot') {
      setLoading(true);
      // Mock reset email sent
      setTimeout(() => {
        setSuccess('A recovery link has been sent to your email.');
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);
      setTimeout(() => {
        const result = onLogin(email, password);
        if (!result.success) {
          setError(result.error || 'Login failed');
          setLoading(false);
        }
      }, 600);
    }
  };

  const handleFinalSignup = (save: boolean) => {
    if (!pendingSignup) return;
    
    setLoading(true);
    setShowSaveModal(false);

    if (save) {
      localStorage.setItem('cr3cka_saved_credentials', JSON.stringify({
        email: pendingSignup.e,
        password: pendingSignup.p
      }));
    }

    setTimeout(() => {
      const result = onSignup(pendingSignup.e, pendingSignup.p, pendingSignup.u);
      if (!result.success) {
        setError(result.error || 'Signup failed');
        setLoading(false);
      }
    }, 600);
  };

  const toggleMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    setError('');
    setSuccess('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-white to-[#f0fff4] flex flex-col items-center pt-16 px-4 relative overflow-hidden">
      {/* Pastel Aurora Background Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-100/40 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>

      <div className={`mb-10 ${loading ? 'animate-pulse' : 'hover:scale-110 transition-transform duration-500'}`}>
        <img src={LOGO_URL} alt="cr3cka world" className="w-20 h-20 rounded-2xl shadow-2xl shadow-orange-100 border-4 border-white" />
      </div>
      
      <div className="w-full max-w-[380px] animate-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl text-center font-black text-[#1a202c] mb-8 tracking-tighter">
          {mode === 'signin' ? 'Sign in to cr3cka world' : mode === 'signup' ? 'Create your account' : 'Recover your account'}
        </h1>

        {error && (
          <div className="bg-red-50 border-2 border-red-100 text-red-600 px-5 py-3 rounded-2xl mb-6 text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-300 flex items-center shadow-sm">
            <i className="fa-solid fa-circle-exclamation mr-3 text-lg"></i>
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-2 border-green-100 text-green-600 px-5 py-3 rounded-2xl mb-6 text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-300 flex items-center shadow-sm">
            <i className="fa-solid fa-circle-check mr-3 text-lg"></i>
            {success}
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-xl border border-black/5 rounded-[2rem] p-8 mb-6 shadow-2xl shadow-gray-200/50 relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Username</label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none transition-all disabled:opacity-50 font-bold shadow-inner"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Email address</label>
              <input
                type="email"
                required
                disabled={loading}
                className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none transition-all disabled:opacity-50 font-bold shadow-inner"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#718096]">Password</label>
                  {mode === 'signin' && (
                    <button 
                      type="button"
                      onClick={() => toggleMode('forgot')}
                      className="text-[10px] font-black uppercase text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  disabled={loading}
                  className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none transition-all disabled:opacity-50 font-bold shadow-inner"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all mt-4 shadow-xl shadow-orange-100 disabled:opacity-50 flex items-center justify-center transform active:scale-95 text-sm uppercase tracking-widest"
            >
              {loading && <i className="fa-solid fa-circle-notch animate-spin mr-3"></i>}
              {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send Reset Link'}
            </button>
            {mode === 'forgot' && (
              <button 
                type="button"
                onClick={() => toggleMode('signin')}
                className="w-full text-center text-xs font-black uppercase text-[#718096] hover:text-[#1a202c] mt-2 transition-colors"
              >
                Back to Sign in
              </button>
            )}
          </form>
        </div>

        <div className="border border-black/5 rounded-2xl p-5 text-center text-sm bg-white/40 backdrop-blur-md">
          {mode === 'signin' ? (
            <p className="text-[#718096] font-bold">
              New to cr3cka world?{' '}
              <button onClick={() => toggleMode('signup')} className="text-orange-500 hover:text-orange-600 hover:underline font-black transition-colors uppercase tracking-tight ml-1">
                Create an account
              </button>
            </p>
          ) : (
            <p className="text-[#718096] font-bold">
              Already have an account?{' '}
              <button onClick={() => toggleMode('signin')} className="text-orange-500 hover:text-orange-600 hover:underline font-black transition-colors uppercase tracking-tight ml-1">
                Sign in
              </button>
            </p>
          )}
        </div>

        <div className="mt-12 flex justify-center space-x-8 text-[10px] font-black uppercase tracking-widest text-[#a0aec0]">
          <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Docs</a>
          <a href="#" className="hover:text-[#1a202c] transition-colors">Contact</a>
        </div>
      </div>

      {showSaveModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white border border-black/5 w-full max-w-[340px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-orange-100 shadow-inner">
                <i className="fa-solid fa-key text-orange-500 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-black text-[#1a202c] mb-3">Save info?</h3>
              <p className="text-sm text-[#718096] mb-10 leading-relaxed font-bold">
                Automatically login as <span className="text-orange-600">@{pendingSignup?.u}</span> on your next visit?
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => handleFinalSignup(true)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-green-100 transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  YES, SAVE INFO
                </button>
                <button 
                  onClick={() => handleFinalSignup(false)}
                  className="w-full bg-gray-50 text-[#718096] hover:bg-gray-100 py-4 rounded-2xl font-black transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  NOT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
