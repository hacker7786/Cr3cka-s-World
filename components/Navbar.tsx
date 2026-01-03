
import React from 'react';
import { UserProfile } from '../types';
import { LOGO_URL } from '../constants';

interface NavbarProps {
  user: UserProfile | null;
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate }) => {
  if (!user) return null;

  return (
    <nav className="bg-white/70 backdrop-blur-xl border-b border-black/5 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-4">
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center text-[#1a202c] text-2xl font-black cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src={LOGO_URL} alt="cr3cka world logo" className="w-8 h-8 mr-2 rounded-lg" />
          <span className="hidden md:inline tracking-tighter">cr3cka world</span>
        </div>
        
        <div className="hidden lg:flex items-center bg-white/50 border border-black/5 rounded-xl px-3 py-1.5 text-sm text-[#718096] w-80 focus-within:bg-white focus-within:border-orange-300 transition-all shadow-inner">
          <span className="mr-2 text-orange-400 font-bold">/</span>
          <input 
            type="text" 
            placeholder="Search or jump to..." 
            className="bg-transparent border-none outline-none text-[#1a202c] w-full font-medium"
          />
          <span className="ml-2 border border-black/10 bg-white/50 px-1.5 rounded text-[10px] font-bold">/</span>
        </div>

        <ul className="hidden md:flex space-x-6 text-sm font-bold text-[#4a5568]">
          <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => onNavigate('dashboard')}>Dashboard</li>
          <li className="hover:text-orange-500 cursor-pointer transition-colors">Pull requests</li>
          <li className="hover:text-orange-500 cursor-pointer transition-colors">Issues</li>
          {user.isAdmin && (
            <li className="hover:text-orange-600 cursor-pointer text-orange-500 transition-colors flex items-center" onClick={() => onNavigate('admin')}>
              <i className="fa-solid fa-shield-halved mr-1.5"></i> Admin
            </li>
          )}
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-[#4a5568] hover:text-orange-500 transition-colors text-lg">
          <i className="fa-regular fa-bell"></i>
        </button>
        <button className="text-[#4a5568] hover:text-orange-500 hidden sm:block transition-colors">
          <i className="fa-solid fa-plus"></i> <i className="fa-solid fa-caret-down text-xs"></i>
        </button>
        
        <div className="group relative">
          <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white cursor-pointer shadow-md group-hover:ring-2 ring-orange-500/30 transition-all">
            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          
          <div className="absolute right-0 top-11 w-56 bg-white border border-black/5 rounded-2xl shadow-2xl py-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-[60] transform scale-95 group-hover:scale-100 origin-top-right">
            <div className="px-5 py-2 border-b border-black/5 mb-2">
              <p className="text-[10px] text-[#718096] font-bold uppercase tracking-widest">Logged in as</p>
              <p className="text-sm font-bold text-[#1a202c] truncate">{user.username}</p>
              {user.isAdmin && <span className="text-[9px] text-orange-600 font-black uppercase tracking-widest mt-1 block">Master Admin</span>}
            </div>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="w-full text-left px-5 py-2 text-sm text-[#4a5568] hover:bg-orange-50 hover:text-orange-600 transition-colors font-semibold"
            >
              Your profile
            </button>
            {user.isAdmin && (
              <button 
                onClick={() => onNavigate('admin')}
                className="w-full text-left px-5 py-2 text-sm text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-colors font-bold"
              >
                Admin Panel
              </button>
            )}
            <div className="border-t border-black/5 mt-2 pt-2">
              <button 
                onClick={onLogout}
                className="w-full text-left px-5 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors font-bold"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
