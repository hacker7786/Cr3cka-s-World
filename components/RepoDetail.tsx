
import React, { useEffect, useState } from 'react';
import { Repository } from '../types';
import { generateReadme } from '../services/geminiService';

interface RepoDetailProps {
  repo: Repository;
  onBack: () => void;
}

type RepoTab = 'code' | 'issues' | 'prs';

const RepoDetail: React.FC<RepoDetailProps> = ({ repo, onBack }) => {
  const [readme, setReadme] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<RepoTab>('code');
  
  // Interactive button states
  const [isStarred, setIsStarred] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [starCount, setStarCount] = useState(repo.stars);
  const [forkCount, setForkCount] = useState(repo.forks);

  useEffect(() => {
    if (activeTab === 'code' && !readme) {
      const fetchReadme = async () => {
        setLoading(true);
        const content = await generateReadme(repo.name, repo.description);
        setReadme(content);
        setLoading(false);
      };
      fetchReadme();
    }
  }, [repo, activeTab, readme]);

  const toggleStar = () => {
    setIsStarred(!isStarred);
    setStarCount(prev => isStarred ? prev - 1 : prev + 1);
  };

  const handleFork = () => {
    setForkCount(prev => prev + 1);
    alert(`Forked ${repo.name} successfully to your namespace!`);
  };

  const renderCodeView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white/60 backdrop-blur-sm border border-black/5 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-black/5 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-8 h-8 rounded-xl overflow-hidden bg-orange-100 border border-white shadow-sm">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${repo.owner}`} alt="Owner" />
              </div>
              <span className="font-black text-[#1a202c] hover:underline cursor-pointer">{repo.owner}</span>
              <span className="text-[#718096] font-medium">Initial system core modules...</span>
            </div>
            <div className="text-[#a0aec0] text-[10px] font-black uppercase tracking-widest">24H ago</div>
          </div>
          <div className="divide-y divide-black/5">
             <div className="px-6 py-4 flex items-center hover:bg-white/80 transition-colors cursor-pointer group">
                <i className="fa-solid fa-folder text-orange-400 mr-4 text-lg"></i>
                <span className="text-sm text-[#1a202c] font-bold flex-1">src</span>
                <span className="text-xs text-[#a0aec0] font-medium italic">refactor workspace</span>
             </div>
             <div className="px-6 py-4 flex items-center hover:bg-white/80 transition-colors cursor-pointer group">
                <i className="fa-solid fa-folder text-orange-400 mr-4 text-lg"></i>
                <span className="text-sm text-[#1a202c] font-bold flex-1">assets</span>
                <span className="text-xs text-[#a0aec0] font-medium italic">add brand icons</span>
             </div>
             <div className="px-6 py-4 flex items-center hover:bg-white/80 transition-colors cursor-pointer group">
                <i className="fa-regular fa-file-lines text-gray-400 mr-4 text-lg"></i>
                <span className="text-sm text-[#1a202c] font-bold flex-1">package.json</span>
                <span className="text-xs text-[#a0aec0] font-medium italic">patch: v1.0.4</span>
             </div>
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-black/5 bg-gray-50/50 flex items-center justify-between sticky top-14 z-10">
            <div className="flex items-center">
              <i className="fa-solid fa-list mr-3 text-orange-500"></i>
              <span className="text-xs font-black text-[#1a202c] uppercase tracking-widest">README.md</span>
            </div>
          </div>
          <div className="p-10 prose prose-slate max-w-none">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-6">
                <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin shadow-lg shadow-orange-100"></div>
                <p className="text-[#718096] font-black uppercase tracking-widest text-[10px] animate-pulse">Consulting Gemini AI Core...</p>
              </div>
            ) : (
              <div className="whitespace-pre-wrap font-sans text-[#2d3748] leading-loose animate-in fade-in duration-700 font-medium">
                {readme}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white/40 p-6 rounded-3xl border border-white shadow-sm">
          <h3 className="text-xs font-black text-[#1a202c] uppercase tracking-widest mb-4">About</h3>
          <p className="text-sm text-[#4a5568] mb-6 font-medium leading-relaxed">
            {repo.description}
          </p>
          <div className="space-y-4">
             <div className="flex items-center text-sm text-[#718096] hover:text-orange-600 cursor-pointer group font-bold">
                <i className="fa-solid fa-link mr-3 text-orange-400 group-hover:scale-110 transition-transform"></i>
                <span className="underline truncate">cr3cka.site/{repo.name}</span>
             </div>
             <div className="flex items-center text-sm text-[#718096] font-bold">
                <i className="fa-regular fa-star mr-3 text-orange-400"></i>
                <span>{starCount} stars</span>
             </div>
          </div>
        </div>
        <div className="bg-white/40 p-6 rounded-3xl border border-white shadow-sm">
           <h3 className="text-xs font-black text-[#1a202c] uppercase tracking-widest mb-4">Languages</h3>
           <div className="h-2.5 w-full rounded-full flex overflow-hidden mb-6 shadow-inner bg-gray-100">
              <div className="h-full bg-orange-500 shadow-lg shadow-orange-100" style={{ width: '70%' }}></div>
              <div className="h-full bg-green-500" style={{ width: '30%' }}></div>
           </div>
           <ul className="space-y-3">
              <li className="flex items-center justify-between text-xs font-black uppercase tracking-tight">
                 <div className="flex items-center">
                   <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-2 shadow-sm"></span>
                   <span className="text-[#1a202c]">{repo.language}</span>
                 </div>
                 <span className="text-[#718096]">70.2%</span>
              </li>
           </ul>
        </div>
      </div>
    </div>
  );

  const renderIssuesView = () => (
    <div className="bg-white/60 backdrop-blur-sm border border-black/5 rounded-[2rem] overflow-hidden shadow-sm animate-in slide-in-from-bottom-2 duration-400">
      <div className="bg-gray-50/50 p-6 border-b border-black/5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs font-black text-[#1a202c] uppercase tracking-widest">
            <i className="fa-regular fa-circle-dot mr-2 text-green-500"></i>
            12 Open
          </div>
          <div className="flex items-center text-xs font-black text-[#a0aec0] uppercase tracking-widest">
            <i className="fa-solid fa-check mr-2"></i>
            45 Closed
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-100 transition-all active:scale-95">
          New Issue
        </button>
      </div>
      <div className="divide-y divide-black/5">
        {[
          { title: 'Vulnerability: Unauthenticated RCE in module core', id: 452, author: 'security-bot', time: '2h ago', labels: ['bug', 'critical'] },
          { title: 'Feature: Add multi-threading support to scanner', id: 451, author: 'cr3cka', time: '5h ago', labels: ['enhancement'] },
          { title: 'Update documentation for v2.0 release', id: 450, author: 'docs-master', time: '1d ago', labels: ['documentation'] },
          { title: 'Fix: Memory leak during high-intensity sweeps', id: 449, author: 'leak-hunter', time: '2d ago', labels: ['bug', 'performance'] },
        ].map((issue) => (
          <div key={issue.id} className="p-6 hover:bg-white transition-colors cursor-pointer group flex items-start space-x-4">
            <i className="fa-regular fa-circle-dot text-green-500 mt-1 text-lg"></i>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-black text-[#1a202c] text-lg group-hover:text-orange-600 transition-colors">{issue.title}</h4>
                {issue.labels.map(label => (
                  <span key={label} className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${
                    label === 'critical' ? 'bg-red-50 border-red-200 text-red-500' : 
                    label === 'bug' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-blue-50 border-blue-200 text-blue-600'
                  }`}>
                    {label}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-[#718096] font-bold uppercase tracking-tight">
                #{issue.id} opened {issue.time} by <span className="text-orange-500">@{issue.author}</span>
              </p>
            </div>
            <div className="text-[#a0aec0] hover:text-orange-500">
               <i className="fa-regular fa-comment"></i> <span className="text-xs font-black">{Math.floor(Math.random() * 5)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPRView = () => (
    <div className="bg-white/60 backdrop-blur-sm border border-black/5 rounded-[2rem] overflow-hidden shadow-sm animate-in slide-in-from-bottom-2 duration-400">
       <div className="bg-gray-50/50 p-6 border-b border-black/5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs font-black text-[#1a202c] uppercase tracking-widest">
            <i className="fa-solid fa-code-pull-request mr-2 text-green-500"></i>
            4 Open
          </div>
          <div className="flex items-center text-xs font-black text-[#a0aec0] uppercase tracking-widest">
            <i className="fa-solid fa-check mr-2"></i>
            128 Merged
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-100 transition-all active:scale-95">
          New Pull Request
        </button>
      </div>
      <div className="divide-y divide-black/5">
        {[
          { title: 'Refactor: Optimize packet processing loop', id: 89, author: 'perf-ninja', time: '3h ago', status: 'Approved' },
          { title: 'Fix: Incorrect CIDR parsing for IPv6', id: 88, author: 'network-expert', time: '12h ago', status: 'Changes Requested' },
          { title: 'Chore: Update dependencies for CVE-2024-X', id: 87, author: 'security-bot', time: '1d ago', status: 'Checks Passing' },
        ].map((pr) => (
          <div key={pr.id} className="p-6 hover:bg-white transition-colors cursor-pointer group flex items-start space-x-4">
            <i className="fa-solid fa-code-pull-request text-green-500 mt-1 text-lg"></i>
            <div className="flex-1">
              <h4 className="font-black text-[#1a202c] text-lg group-hover:text-orange-600 transition-colors mb-1">{pr.title}</h4>
              <div className="flex items-center space-x-3">
                 <p className="text-[10px] text-[#718096] font-bold uppercase tracking-tight">
                  #{pr.id} by <span className="text-orange-500">@{pr.author}</span> was opened {pr.time}
                </p>
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-tighter ${
                  pr.status === 'Approved' ? 'bg-green-50 border-green-200 text-green-600' :
                  pr.status === 'Changes Requested' ? 'bg-red-50 border-red-200 text-red-500' : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}>
                  {pr.status}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-[#a0aec0]">
               <i className="fa-regular fa-comment"></i> <span className="text-xs font-black">{Math.floor(Math.random() * 8)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <nav className="flex items-center space-x-3 text-2xl font-black text-[#1a202c] overflow-x-auto tracking-tight">
          <i className="fa-solid fa-book-bookmark text-orange-500"></i>
          <span className="text-orange-600 hover:underline cursor-pointer whitespace-nowrap" onClick={onBack}>{repo.owner}</span>
          <span className="text-gray-300">/</span>
          <span className="font-black text-[#1a202c] hover:underline cursor-pointer whitespace-nowrap">{repo.name}</span>
          <span className={`border-2 text-[10px] px-3 py-1 rounded-full ml-3 whitespace-nowrap font-black uppercase tracking-widest ${repo.isPrivate ? 'border-red-200 text-red-500 bg-red-50' : 'border-gray-100 text-gray-400 bg-gray-50'}`}>
            {repo.isPrivate ? 'Private' : 'Public'}
          </span>
        </nav>
        <div className="flex space-x-3">
           <button 
            onClick={() => setIsWatching(!isWatching)}
            className={`flex items-center border-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${isWatching ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100' : 'bg-white border-black/5 text-[#4a5568] hover:bg-gray-50'}`}
           >
            <i className={`${isWatching ? 'fa-solid' : 'fa-regular'} fa-bell mr-2`}></i> {isWatching ? 'Watching' : 'Notify'}
          </button>
           <button 
            onClick={handleFork}
            className="flex items-center bg-white border-2 border-black/5 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#4a5568] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
           >
            <i className="fa-solid fa-code-fork mr-2 text-orange-400"></i> Fork <span className="ml-2 px-2 bg-gray-100 rounded-full">{forkCount}</span>
          </button>
          <button 
            onClick={toggleStar}
            className={`flex items-center border-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${isStarred ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100' : 'bg-white border-black/5 text-[#4a5568] hover:bg-gray-50'}`}
          >
            <i className={`${isStarred ? 'fa-solid' : 'fa-regular'} fa-star mr-2`}></i> {isStarred ? 'Starred' : 'Star'} <span className="ml-2 px-2 bg-black/10 rounded-full">{starCount}</span>
          </button>
        </div>
      </div>

      <div className="flex border-b border-black/5 mb-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('code')}
          className={`px-6 py-4 border-b-4 transition-all text-sm font-black whitespace-nowrap uppercase tracking-widest ${activeTab === 'code' ? 'border-orange-500 text-[#1a202c]' : 'border-transparent text-[#718096] hover:text-[#1a202c]'}`}
        >
          <i className="fa-solid fa-code mr-2 text-orange-500"></i> Code
        </button>
        <button 
          onClick={() => setActiveTab('issues')}
          className={`px-6 py-4 border-b-4 transition-all text-sm font-black whitespace-nowrap uppercase tracking-widest ${activeTab === 'issues' ? 'border-orange-500 text-[#1a202c]' : 'border-transparent text-[#718096] hover:text-[#1a202c]'}`}
        >
          <i className="fa-regular fa-circle-dot mr-2"></i> Issues
        </button>
        <button 
          onClick={() => setActiveTab('prs')}
          className={`px-6 py-4 border-b-4 transition-all text-sm font-black whitespace-nowrap uppercase tracking-widest ${activeTab === 'prs' ? 'border-orange-500 text-[#1a202c]' : 'border-transparent text-[#718096] hover:text-[#1a202c]'}`}
        >
          <i className="fa-solid fa-code-pull-request mr-2"></i> PRs
        </button>
      </div>

      <div className="pb-12">
        {activeTab === 'code' && renderCodeView()}
        {activeTab === 'issues' && renderIssuesView()}
        {activeTab === 'prs' && renderPRView()}
      </div>
    </div>
  );
};

export default RepoDetail;
