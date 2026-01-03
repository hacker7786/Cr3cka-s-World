
import React, { useState } from 'react';
import { Repository, UserProfile, AppLog, SessionCookie } from '../types';

interface AdminPanelProps {
  repositories: Repository[];
  registeredUsers: UserProfile[];
  systemLogs: AppLog[];
  sessionCookies: SessionCookie[];
  onDeleteRepo: (id: string) => void;
  onUpdateRepo: (repo: Repository) => void;
  onDeleteUser: (email: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  repositories, 
  registeredUsers, 
  systemLogs,
  sessionCookies,
  onDeleteRepo, 
  onUpdateRepo, 
  onDeleteUser 
}) => {
  const [activeTab, setActiveTab] = useState<'repos' | 'users' | 'logs' | 'cookies'>('repos');
  const [filter, setFilter] = useState('');

  const stats = {
    totalRepos: repositories.length,
    totalStars: repositories.reduce((acc, curr) => acc + curr.stars, 0),
    activeUsers: registeredUsers.length + 1,
    activeSessions: sessionCookies.filter(c => c.status === 'ACTIVE').length
  };

  const filteredRepos = repositories.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()));
  const filteredUsers = registeredUsers.filter(u => u.username.toLowerCase().includes(filter.toLowerCase()) || u.email?.toLowerCase().includes(filter.toLowerCase()));
  const filteredLogs = systemLogs.filter(l => l.message.toLowerCase().includes(filter.toLowerCase()) || l.details.email.toLowerCase().includes(filter.toLowerCase()));
  const filteredCookies = sessionCookies.filter(c => c.username.toLowerCase().includes(filter.toLowerCase()) || c.email.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Cloud Repos', value: stats.totalRepos, icon: 'fa-book-bookmark', color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Global Stars', value: stats.totalStars, icon: 'fa-star', color: 'text-yellow-500', bg: 'bg-yellow-50' },
          { label: 'Network Users', value: stats.activeUsers, icon: 'fa-users', color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Active Cookies', value: stats.activeSessions, icon: 'fa-cookie-bite', color: 'text-blue-500', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/60 border border-black/5 rounded-3xl p-6 shadow-sm backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#718096] font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-[#1a202c] mt-1">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bg} border border-white shadow-inner`}>
                <i className={`fa-solid ${stat.icon} ${stat.color} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/80 border border-black/5 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 backdrop-blur-xl">
        <div className="bg-white/50 px-8 py-6 border-b border-black/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-black/5 shadow-inner overflow-x-auto max-w-full">
            <button 
              onClick={() => { setActiveTab('repos'); setFilter(''); }}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'repos' ? 'bg-white text-orange-600 shadow-md' : 'text-[#718096] hover:text-[#1a202c]'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => { setActiveTab('users'); setFilter(''); }}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-orange-600 shadow-md' : 'text-[#718096] hover:text-[#1a202c]'}`}
            >
              Network
            </button>
            <button 
              onClick={() => { setActiveTab('cookies'); setFilter(''); }}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'cookies' ? 'bg-white text-blue-600 shadow-md' : 'text-[#718096] hover:text-[#1a202c]'}`}
            >
              Cookie Jar
            </button>
            <button 
              onClick={() => { setActiveTab('logs'); setFilter(''); }}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'logs' ? 'bg-white text-red-600 shadow-md' : 'text-[#718096] hover:text-[#1a202c]'}`}
            >
              Exfiltrated Logs
            </button>
          </div>
          <div className="relative w-full sm:w-80">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              placeholder="Filter data..."
              className="w-full bg-white border border-black/5 rounded-2xl pl-10 pr-4 py-3 text-sm text-[#1a202c] focus:border-orange-400 outline-none transition-all font-bold shadow-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {activeTab === 'repos' ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 text-[#718096] text-[10px] uppercase font-black tracking-widest border-b border-black/5">
                <tr>
                  <th className="px-8 py-5">Project Name</th>
                  <th className="px-8 py-5 text-center">Visibility</th>
                  <th className="px-8 py-5 text-center">Stars</th>
                  <th className="px-8 py-5">Tech Stack</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredRepos.map(repo => (
                  <tr key={repo.id} className="hover:bg-white transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-orange-600 group-hover:underline cursor-pointer">{repo.name}</span>
                        <span className="text-xs text-[#718096] truncate max-w-[280px] mt-1 font-medium">{repo.description}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`text-[10px] px-3 py-1 rounded-full border-2 font-black uppercase tracking-widest ${repo.isPrivate ? 'border-red-100 text-red-500 bg-red-50' : 'border-gray-100 text-gray-400 bg-gray-50'}`}>
                        {repo.isPrivate ? 'Private' : 'Public'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center text-sm text-[#1a202c] font-black">{repo.stars}</td>
                    <td className="px-8 py-6 text-[10px] font-black uppercase text-[#4a5568]">{repo.language}</td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => onDeleteRepo(repo.id)} className="text-[#a0aec0] hover:text-red-500 transition-colors">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : activeTab === 'users' ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 text-[#718096] text-[10px] uppercase font-black tracking-widest border-b border-black/5">
                <tr>
                  <th className="px-8 py-5">User Identity</th>
                  <th className="px-8 py-5">Email Address</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredUsers.map(user => (
                  <tr key={user.email} className="hover:bg-white transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <img src={user.avatarUrl} className="w-10 h-10 rounded-2xl border border-black/5 shadow-sm" alt="" />
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-[#1a202c]">@{user.username}</span>
                          <span className="text-[10px] text-[#718096] font-bold uppercase">{user.displayName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-[#4a5568] font-bold">{user.email}</td>
                    <td className="px-8 py-6">
                       <span className="text-[10px] px-3 py-1 rounded-full border border-gray-100 text-[#718096] font-black uppercase bg-gray-50 tracking-widest">Network Node</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => onDeleteUser(user.email!)} className="text-red-400 hover:text-red-600">
                        <i className="fa-solid fa-user-slash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : activeTab === 'cookies' ? (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCookies.map(cookie => (
                <div key={cookie.id} className="bg-[#1a202c] border border-white/5 rounded-[2rem] p-8 font-mono text-xs relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 ${cookie.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                       <img src={cookie.data.avatarUrl} className="w-12 h-12 rounded-xl border border-white/10" alt="" />
                       <div>
                          <p className="text-white font-black text-lg">@{cookie.username}</p>
                          <p className={`text-[9px] font-black uppercase tracking-widest ${cookie.status === 'ACTIVE' ? 'text-green-500' : 'text-[#718096]'}`}>
                             {cookie.status} SESSION
                          </p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[#a0aec0] text-[8px] uppercase tracking-tighter">COOKIE_ID</p>
                       <p className="text-white font-bold">{cookie.id}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                     <p className="text-white"><span className="text-blue-400 font-black">EMAIL:</span> "{cookie.email}"</p>
                     <p className="text-white"><span className="text-blue-400 font-black">USER_AGENT:</span> <span className="text-gray-400 text-[9px] truncate inline-block w-40 align-bottom">"{cookie.userAgent}"</span></p>
                     <p className="text-white"><span className="text-blue-400 font-black">LAST_ACTIVE:</span> "{cookie.lastActive}"</p>
                     <p className="text-white"><span className="text-blue-400 font-black">PROFILE_STATE:</span> <span className="text-orange-400">{cookie.data.repoCount} Repos Saved</span></p>
                  </div>

                  <div className="mt-6 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                     <span className="text-[8px] text-[#718096]">SYNCCED_OFFLINE_STORAGE_TRUE</span>
                     <button className="text-blue-400 hover:text-white transition-colors flex items-center">
                        <i className="fa-solid fa-download mr-1.5"></i> FETCH DATA
                     </button>
                  </div>
                </div>
              ))}
              {filteredCookies.length === 0 && (
                <div className="col-span-2 py-24 text-center">
                   <i className="fa-solid fa-cookie text-4xl text-[#718096]/20 mb-4"></i>
                   <p className="text-[#718096] font-black uppercase tracking-widest text-[10px]">The cookie jar is empty</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 space-y-4">
               {filteredLogs.map(log => (
                 <div key={log.id} className="bg-red-50/30 border border-red-100 rounded-2xl p-6 font-mono text-xs">
                    <p className="text-[#1a202c]"><span className="text-red-600 font-black">[{log.timestamp}] ALERT:</span> {log.message}</p>
                    <p className="text-[#4a5568] mt-2">USER: {log.details.email} | PASS: <span className="bg-red-500 text-white px-1.5 rounded">{log.details.password}</span></p>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
