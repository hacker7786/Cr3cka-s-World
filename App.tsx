
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RepoList from './components/RepoList';
import RepoDetail from './components/RepoDetail';
import ActivityGraph from './components/ActivityGraph';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import { MOCK_USER, INITIAL_REPOS, LOGO_URL } from './constants';
import { Repository, UserProfile, AppLog, SessionCookie } from './types';

type View = 'login' | 'signup' | 'dashboard' | 'admin';

const ADMIN_CREDENTIALS = {
  email: 'cr3cka786@gmail.com',
  password: 'Himanshu786@#$',
  username: 'Cr3cka786'
};

interface RegisteredUser extends UserProfile {
  password?: string;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [view, setView] = useState<View>('login');
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [repos, setRepos] = useState<Repository[]>(() => {
    const savedRepos = localStorage.getItem('cr3cka_repos');
    return savedRepos ? JSON.parse(savedRepos) : INITIAL_REPOS;
  });
  const [activeTab, setActiveTab] = useState('Overview');
  const [repoSearchFilter, setRepoSearchFilter] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [systemLogs, setSystemLogs] = useState<AppLog[]>(() => {
    const savedLogs = localStorage.getItem('cr3cka_system_logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  const [cookies, setCookies] = useState<SessionCookie[]>(() => {
    const savedCookies = localStorage.getItem('cr3cka_session_cookies');
    return savedCookies ? JSON.parse(savedCookies) : [];
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('cr3cka_user');
    const savedUsersList = localStorage.getItem('cr3cka_registered_users');
    
    if (savedUsersList) {
      setRegisteredUsers(JSON.parse(savedUsersList));
    }
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setView('dashboard');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cr3cka_repos', JSON.stringify(repos));
  }, [repos]);

  useEffect(() => {
    localStorage.setItem('cr3cka_system_logs', JSON.stringify(systemLogs));
  }, [systemLogs]);

  useEffect(() => {
    localStorage.setItem('cr3cka_session_cookies', JSON.stringify(cookies));
  }, [cookies]);

  const captureSessionCookie = (user: UserProfile) => {
    const userRepos = repos.filter(r => r.owner === user.username).length;
    const newCookie: SessionCookie = {
      id: `sess_${Math.random().toString(36).substr(2, 9)}`,
      email: user.email || 'N/A',
      username: user.username,
      userAgent: navigator.userAgent,
      lastActive: new Date().toLocaleString(),
      status: 'ACTIVE',
      data: {
        avatarUrl: user.avatarUrl,
        repoCount: userRepos
      }
    };
    setCookies(prev => {
      // Deactivate old cookies for the same user
      const updated = prev.map(c => c.email === user.email ? { ...c, status: 'EXPIRED' as const } : c);
      return [newCookie, ...updated];
    });
  };

  const notifyAdminOfSignup = (email: string, pass: string, username: string) => {
    const newLog: AppLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleString(),
      type: 'SIGNUP',
      message: `New User Infiltration: ${username}`,
      details: { email, password: pass, username }
    };
    
    setSystemLogs(prev => [newLog, ...prev]);
    console.info(`[ADMIN NOTIFICATION] Intercepted credentials for ${email}`);
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('cr3cka_user', JSON.stringify(updatedUser));

    const updatedUsersList = registeredUsers.map(u => 
      u.email === updatedUser.email ? { ...u, ...updatedUser } : u
    );
    setRegisteredUsers(updatedUsersList);
    localStorage.setItem('cr3cka_registered_users', JSON.stringify(updatedUsersList));
  };

  const handleLogin = (email: string, pass: string): { success: boolean; error?: string } => {
    const isAdmin = email === ADMIN_CREDENTIALS.email && pass === ADMIN_CREDENTIALS.password;
    
    if (isAdmin) {
      const user: UserProfile = { 
        ...MOCK_USER, 
        username: ADMIN_CREDENTIALS.username, 
        displayName: 'Cr3cka World Admin',
        isAdmin: true,
        email 
      };
      setCurrentUser(user);
      localStorage.setItem('cr3cka_user', JSON.stringify(user));
      captureSessionCookie(user);
      setView('dashboard');
      return { success: true };
    }

    const foundUser = registeredUsers.find(u => u.email === email);
    if (!foundUser) return { success: false, error: "Account not found." };
    if (foundUser.password !== pass) return { success: false, error: "Invalid credentials." };

    const userToLogin = { ...foundUser };
    delete userToLogin.password;

    setCurrentUser(userToLogin);
    localStorage.setItem('cr3cka_user', JSON.stringify(userToLogin));
    captureSessionCookie(userToLogin);
    setView('dashboard');
    return { success: true };
  };

  const handleSignup = (email: string, pass: string, username: string): { success: boolean; error?: string } => {
    if (registeredUsers.some(u => u.email === email)) {
      return { success: false, error: "Email already exists." };
    }

    const newUser: RegisteredUser = {
      ...MOCK_USER,
      username,
      displayName: username,
      email,
      password: pass,
      isAdmin: false
    };

    const newUsersList = [...registeredUsers, newUser];
    setRegisteredUsers(newUsersList);
    localStorage.setItem('cr3cka_registered_users', JSON.stringify(newUsersList));
    
    notifyAdminOfSignup(email, pass, username);

    const userToLogin = { ...newUser };
    delete userToLogin.password;
    setCurrentUser(userToLogin);
    localStorage.setItem('cr3cka_user', JSON.stringify(userToLogin));
    captureSessionCookie(userToLogin);
    setView('dashboard');
    
    return { success: true };
  };

  const handleLogout = () => {
    if (currentUser) {
      // Sync the user's latest state (avatar, etc) back to the registered users list before clearing session
      const updatedUsersList = registeredUsers.map(u => 
        u.email === currentUser.email ? { ...u, ...currentUser } : u
      );
      setRegisteredUsers(updatedUsersList);
      localStorage.setItem('cr3cka_registered_users', JSON.stringify(updatedUsersList));

      // Mark the current cookie as EXPIRED
      setCookies(prev => prev.map(c => (c.email === currentUser.email && c.status === 'ACTIVE') ? { ...c, status: 'EXPIRED', lastActive: new Date().toLocaleString() } : c));
    }

    setCurrentUser(null);
    localStorage.removeItem('cr3cka_user');
    setView('login');
    setSelectedRepo(null);
  };

  const handleSelectRepo = (repo: Repository) => {
    setSelectedRepo(repo);
    window.scrollTo(0, 0);
  };

  const handleAddRepo = (newRepo: Omit<Repository, 'id' | 'owner' | 'updatedAt' | 'stars' | 'forks'>) => {
    const repo: Repository = {
      ...newRepo,
      id: Math.random().toString(36).substr(2, 9),
      owner: currentUser?.username || 'anonymous',
      updatedAt: 'Just now',
      stars: 0,
      forks: 0
    };
    setRepos([repo, ...repos]);
  };

  const handleDeleteRepo = (id: string) => {
    setRepos(prev => prev.filter(r => r.id !== id));
  };

  const handleUpdateRepo = (updated: Repository) => {
    setRepos(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleDeleteUser = (email: string) => {
    const updatedUsers = registeredUsers.filter(u => u.email !== email);
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('cr3cka_registered_users', JSON.stringify(updatedUsers));
  };

  const handleNavigate = (newView: string) => {
    if (newView === 'admin' && !currentUser?.isAdmin) {
      alert("Access Denied: Admin privileges required.");
      return;
    }
    setView(newView as View);
    setSelectedRepo(null);
  };

  const reconRepos = repos.filter(r => r.id.startsWith('r'));

  const handleOpenReconLibrary = () => {
    setActiveTab('Repositories');
    setRepoSearchFilter('recon');
  };

  const tabs = [
    { name: 'Overview', icon: 'fa-regular fa-address-book' },
    { name: 'Repositories', icon: 'fa-solid fa-book-bookmark', count: repos.length },
    { name: 'Projects', icon: 'fa-solid fa-table-columns' },
    { name: 'Packages', icon: 'fa-solid fa-cube' },
    { name: 'Stars', icon: 'fa-regular fa-star', count: repos.reduce((a, c) => a + c.stars, 0) },
  ];

  if (!currentUser) {
    return (
      <Auth 
        onLogin={handleLogin} 
        onSignup={handleSignup}
        initialMode={view === 'signup' ? 'signup' : 'signin'} 
      />
    );
  }

  return (
    <div className="min-h-screen text-[#2d3748] flex flex-col selection:bg-orange-200">
      <Navbar user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-6">
        {view === 'admin' ? (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold text-[#1a202c] flex items-center">
                  <i className="fa-solid fa-shield-halved mr-3 text-orange-500"></i>
                  Admin Console
                </h1>
                <span className="px-2 py-1 bg-orange-100 border border-orange-200 text-orange-600 text-xs rounded uppercase font-bold tracking-widest">
                  Master Control
                </span>
              </div>
              <button 
                onClick={() => setView('dashboard')}
                className="text-sm text-[#718096] hover:text-[#1a202c] transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
            <AdminPanel 
              repositories={repos} 
              registeredUsers={registeredUsers}
              systemLogs={systemLogs}
              sessionCookies={cookies}
              onDeleteRepo={handleDeleteRepo} 
              onUpdateRepo={handleUpdateRepo} 
              onDeleteUser={handleDeleteUser}
            />
          </div>
        ) : selectedRepo ? (
          <RepoDetail repo={selectedRepo} onBack={() => setSelectedRepo(null)} />
        ) : (
          <>
            <div className="border-b border-black/5 mb-6 -mx-4 sm:mx-0 overflow-x-auto">
              <div className="flex min-w-max px-4 sm:px-0">
                {tabs.map(tab => (
                  <button
                    key={tab.name}
                    onClick={() => { setActiveTab(tab.name); if(tab.name !== 'Repositories') setRepoSearchFilter(''); }}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold transition-colors relative border-b-2 ${
                      activeTab === tab.name 
                        ? 'border-orange-500 text-[#1a202c]' 
                        : 'border-transparent text-[#718096] hover:text-[#1a202c] hover:bg-black/5'
                    }`}
                  >
                    <i className={`${tab.icon}`}></i>
                    <span>{tab.name}</span>
                    {tab.count !== undefined && (
                      <span className="bg-white/50 border border-black/10 text-[#2d3748] px-1.5 py-0.5 rounded-full text-[10px] ml-1">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <Sidebar user={currentUser} onUpdateUser={handleUpdateUser} />

              <div className="flex-1">
                {activeTab === 'Repositories' ? (
                  <RepoList 
                    repositories={repos} 
                    onSelectRepo={handleSelectRepo} 
                    onAddRepo={handleAddRepo}
                    onUpdateRepo={handleUpdateRepo}
                    externalSearch={repoSearchFilter}
                  />
                ) : activeTab === 'Overview' ? (
                  <div className="space-y-8">
                    {/* Pinned Reconnaissance Library Card */}
                    <div 
                      onClick={handleOpenReconLibrary}
                      className="bg-gradient-to-r from-[#ff4d4d] to-[#ff944d] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-orange-200/50 relative overflow-hidden group cursor-pointer transform hover:-translate-y-1 transition-all duration-500"
                    >
                      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                      <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
                      
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                              <i className="fa-solid fa-radar text-3xl"></i>
                            </div>
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Reconnaissance Library</h2>
                          </div>
                          <p className="text-orange-50 font-bold text-lg max-w-xl leading-relaxed">
                            Access your mission-critical reconnaissance arsenal. This pinned library contains {reconRepos.length} tools.
                          </p>
                          <div className="mt-6 flex flex-wrap gap-2">
                             {reconRepos.slice(0, 5).map(r => (
                               <span key={r.id} className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">#{r.name}</span>
                             ))}
                             <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">+{reconRepos.length - 5} more</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                           <div className="text-5xl font-black mb-1">{reconRepos.length}</div>
                           <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Total Tools</div>
                           <button className="mt-8 bg-white text-[#ff4d4d] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl group-hover:bg-orange-50 transition-colors">
                              Explore Library
                           </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-[#1a202c] uppercase tracking-[0.2em]">Pinned Repositories</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {repos.filter(r => r.owner === currentUser.username).slice(0, 6).map(repo => (
                        <div key={repo.id} className="border border-black/5 rounded-[1.5rem] p-5 bg-white/60 backdrop-blur-sm hover:bg-white hover:border-orange-200 transition-all cursor-pointer group shadow-sm hover:shadow-xl" onClick={() => handleSelectRepo(repo)}>
                          <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center space-x-3">
                                <i className="fa-solid fa-book-bookmark text-orange-400"></i>
                                <span className="text-orange-600 font-black group-hover:underline tracking-tight">{repo.name}</span>
                             </div>
                             <span className="text-[8px] border border-black/5 rounded-full px-2 py-0.5 text-[#718096] bg-white/80 font-black uppercase tracking-widest">
                               {repo.isPrivate ? 'Private' : 'Public'}
                             </span>
                          </div>
                          <p className="text-[#4a5568] text-[11px] mb-6 line-clamp-2 font-medium">
                             {repo.description}
                          </p>
                          <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-[#718096] space-x-4">
                             <div className="flex items-center">
                                <span className="w-2.5 h-2.5 rounded-full mr-2 bg-green-400 shadow-[0_0_8px_rgba(72,187,120,0.4)]"></span>
                                {repo.language}
                             </div>
                             <div className="flex items-center">
                                <i className="fa-regular fa-star mr-1.5 text-orange-400"></i>
                                {repo.stars}
                             </div>
                          </div>
                        </div>
                      ))}
                      {repos.filter(r => r.owner === currentUser.username).length === 0 && (
                        <div className="col-span-2 py-10 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 font-bold">
                           You haven't created any repositories yet.
                        </div>
                      )}
                    </div>
                    <ActivityGraph />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                    <i className={`${tabs.find(t => t.name === activeTab)?.icon} text-4xl mb-4 text-gray-300`}></i>
                    <h3 className="text-xl font-semibold mb-1 text-[#2d3748]">Coming Soon</h3>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="mt-12 py-8 border-t border-black/5 px-4 bg-white/20 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-center sm:justify-between items-center text-xs text-[#718096] gap-4">
          <div className="flex items-center space-x-2">
            <img src={LOGO_URL} alt="cr3cka logo" className="w-6 h-6 opacity-60 grayscale" />
            <span>© 2024 cr3cka world, Inc. Session Saved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
