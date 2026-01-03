
import React, { useState, useEffect } from 'react';
import { Repository } from '../types';
import { LANGUAGE_COLORS } from '../constants';

interface RepoListProps {
  repositories: Repository[];
  onSelectRepo: (repo: Repository) => void;
  onAddRepo: (repo: Omit<Repository, 'id' | 'owner' | 'updatedAt' | 'stars' | 'forks'>) => void;
  onUpdateRepo: (repo: Repository) => void;
  externalSearch?: string;
}

const RepoList: React.FC<RepoListProps> = ({ repositories, onSelectRepo, onAddRepo, onUpdateRepo, externalSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(externalSearch);
  const [isNewRepoModalOpen, setIsNewRepoModalOpen] = useState(false);
  const [newRepo, setNewRepo] = useState({
    name: '',
    description: '',
    language: 'TypeScript',
    isPrivate: false
  });

  useEffect(() => {
    if (externalSearch) {
      setSearchTerm(externalSearch);
    }
  }, [externalSearch]);

  const filteredRepos = repositories.filter(repo => {
    const s = searchTerm.toLowerCase();
    // Special handling for the "recon" filter to catch 'r' prefixed IDs or name matches
    if (s === 'recon') {
      return repo.id.startsWith('r') || repo.name.toLowerCase().includes('recon');
    }
    return repo.name.toLowerCase().includes(s) ||
           repo.description.toLowerCase().includes(s);
  });

  const handleCreateRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepo.name.trim()) return;
    onAddRepo(newRepo);
    setIsNewRepoModalOpen(false);
    setNewRepo({ name: '', description: '', language: 'TypeScript', isPrivate: false });
  };

  const handleStarToggle = (e: React.MouseEvent, repo: Repository) => {
    e.stopPropagation();
    onUpdateRepo({ ...repo, stars: repo.stars + 1 });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/5 mb-6">
        <div className="flex-1 max-w-lg relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Find a repository..."
            className="w-full bg-white/60 backdrop-blur-sm border border-black/5 rounded-2xl pl-12 pr-4 py-3 text-sm text-[#1a202c] focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-white/80 border border-black/5 rounded-xl px-4 py-2.5 text-xs font-black text-[#4a5568] cursor-pointer hover:bg-white hover:border-orange-200 shadow-sm transition-all uppercase tracking-widest">
            Type <i className="fa-solid fa-caret-down ml-2 mt-0.5 text-orange-400"></i>
          </div>
          <button 
            onClick={() => setIsNewRepoModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center shadow-lg shadow-orange-100 transition-all active:scale-95 uppercase tracking-widest"
          >
            <i className="fa-solid fa-plus mr-2"></i> New Repo
          </button>
        </div>
      </div>

      <div className="divide-y divide-black/5">
        {filteredRepos.length > 0 ? (
          filteredRepos.map(repo => (
            <div key={repo.id} className="py-8 flex justify-between items-start group">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 
                    className="text-2xl font-black text-orange-600 hover:text-orange-700 hover:underline cursor-pointer tracking-tight"
                    onClick={() => onSelectRepo(repo)}
                  >
                    {repo.name}
                  </h3>
                  {repo.isPrivate ? (
                    <span className="ml-3 border border-orange-200 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase bg-orange-50 tracking-widest">Private</span>
                  ) : (
                    <span className="ml-3 border border-black/5 text-gray-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase bg-gray-50 tracking-widest">Public</span>
                  )}
                  {repo.id.startsWith('r') && (
                    <span className="ml-3 border border-green-200 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase bg-green-50 tracking-widest">RECON</span>
                  )}
                </div>
                <p className="text-[#4a5568] text-sm mb-6 pr-6 line-clamp-2 font-medium">
                  {repo.description}
                </p>
                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-[#718096] space-x-6">
                  <div className="flex items-center">
                    <span 
                      className="w-3.5 h-3.5 rounded-full mr-2 shadow-sm" 
                      style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Default }}
                    ></span>
                    {repo.language}
                  </div>
                  {repo.stars >= 0 && (
                    <div className="hover:text-orange-600 cursor-pointer transition-colors flex items-center" onClick={(e) => handleStarToggle(e, repo)}>
                      <i className={`fa-regular fa-star mr-1.5 text-orange-400`}></i>
                      {repo.stars}
                    </div>
                  )}
                  {repo.forks >= 0 && (
                    <div className="hover:text-orange-600 cursor-pointer transition-colors flex items-center">
                      <i className="fa-solid fa-code-fork mr-1.5 text-orange-400"></i>
                      {repo.forks}
                    </div>
                  )}
                  <div className="opacity-60">Updated {repo.updatedAt}</div>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => handleStarToggle(e, repo)}
                  className="flex items-center bg-white border border-black/10 px-4 py-2 rounded-xl text-[10px] font-black text-[#1a202c] hover:bg-orange-50 hover:border-orange-300 transition-all active:scale-95 shadow-sm uppercase tracking-widest"
                >
                  <i className="fa-regular fa-star mr-2 text-orange-400"></i> Star
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white/30 rounded-3xl border-2 border-dashed border-black/5">
            <i className="fa-solid fa-ghost text-4xl text-gray-200 mb-4"></i>
            <h3 className="text-[#1a202c] font-black text-xl mb-1">No matches found</h3>
            <p className="text-[#718096] font-bold">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* New Repo Modal */}
      {isNewRepoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-black/5 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-[#1a202c] tracking-tight">Create Repository</h3>
              <button onClick={() => setIsNewRepoModalOpen(false)} className="text-[#a0aec0] hover:text-[#1a202c] transition-colors">
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>
            <form onSubmit={handleCreateRepo} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Repo Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. magic-engine"
                  className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-4 text-sm text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none shadow-inner font-bold"
                  value={newRepo.name}
                  onChange={e => setNewRepo({...newRepo, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Description <span className="text-[#a0aec0] font-normal tracking-normal">(optional)</span></label>
                <textarea 
                  placeholder="What's this project about?"
                  className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-4 text-sm text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none h-28 resize-none shadow-inner font-bold"
                  value={newRepo.description}
                  onChange={e => setNewRepo({...newRepo, description: e.target.value})}
                />
              </div>
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Tech</label>
                  <select 
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-4 text-sm text-[#1a202c] outline-none font-bold"
                    value={newRepo.language}
                    onChange={e => setNewRepo({...newRepo, language: e.target.value})}
                  >
                    <option>TypeScript</option>
                    <option>JavaScript</option>
                    <option>Python</option>
                    <option>CSS</option>
                    <option>HTML</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Access</label>
                  <div className="flex space-x-3">
                    <button 
                      type="button"
                      onClick={() => setNewRepo({...newRepo, isPrivate: false})}
                      className={`flex-1 py-4 text-[10px] font-black rounded-2xl border-2 transition-all uppercase tracking-widest ${!newRepo.isPrivate ? 'bg-orange-50 border-orange-500 text-orange-600' : 'bg-transparent border-gray-100 text-gray-400'}`}
                    >
                      Public
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewRepo({...newRepo, isPrivate: true})}
                      className={`flex-1 py-4 text-[10px] font-black rounded-2xl border-2 transition-all uppercase tracking-widest ${newRepo.isPrivate ? 'bg-red-50 border-red-500 text-red-600' : 'bg-transparent border-gray-100 text-gray-400'}`}
                    >
                      Private
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl text-xs font-black shadow-xl shadow-orange-100 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest"
                  disabled={!newRepo.name.trim()}
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoList;
