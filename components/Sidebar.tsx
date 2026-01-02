
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';

interface SidebarProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onUpdateUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [statusText, setStatusText] = useState('');
  
  const [editData, setEditData] = useState({
    displayName: user.displayName,
    bio: user.bio,
    location: user.location,
    website: user.website
  });

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditData({
      displayName: user.displayName,
      bio: user.bio,
      location: user.location,
      website: user.website
    });
  }, [user]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isCameraActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(s => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => {
          console.error("Camera error:", err);
          setCameraError("Camera access denied or not found.");
          setIsCameraActive(false);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
        setIsCameraActive(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAvatar = () => {
    if (capturedImage) {
      onUpdateUser({ ...user, avatarUrl: capturedImage });
      closeModal();
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ ...user, ...editData });
    setIsEditProfileOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsCameraActive(false);
    setCapturedImage(null);
    setCameraError(null);
  };

  return (
    <div className="w-full md:w-72 flex-shrink-0">
      <div className="relative mb-6 group">
        <div className="w-full aspect-square rounded-3xl border-4 border-white overflow-hidden bg-white/40 relative shadow-xl transform group-hover:-translate-y-1 transition-transform duration-300">
          <img 
            src={user.avatarUrl} 
            alt={user.username} 
            className="w-full h-full object-cover object-center" 
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="absolute inset-0 bg-orange-600/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-xs font-black backdrop-blur-sm"
          >
            <i className="fa-solid fa-camera text-2xl mb-2"></i>
            CHANGE PHOTO
          </button>
        </div>
        <button 
          onClick={() => setIsStatusOpen(true)}
          className="absolute -bottom-2 -left-2 bg-white border border-black/5 px-4 py-2 rounded-2xl text-xs text-[#1a202c] hover:bg-orange-50 shadow-lg flex items-center group transition-all active:scale-95 font-bold"
        >
          <i className="fa-solid fa-face-smile mr-2 text-orange-500"></i> Set status
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#1a202c] leading-tight">{user.displayName}</h1>
        <h2 className="text-xl text-[#718096] font-medium tracking-tight">@{user.username}</h2>
      </div>

      <p className="text-[#4a5568] mb-6 text-sm leading-relaxed font-medium bg-white/40 p-3 rounded-xl border border-white/60">
        {user.bio}
      </p>

      <button 
        onClick={() => setIsEditProfileOpen(true)}
        className="w-full bg-white border border-black/10 py-2.5 rounded-xl text-sm font-bold text-[#1a202c] hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all active:scale-95 mb-6 shadow-sm"
      >
        Edit profile
      </button>

      <div className="flex items-center space-x-1 text-sm text-[#718096] mb-6 font-bold">
        <i className="fa-solid fa-users text-orange-400"></i>
        <span className="text-[#1a202c]">{user.followers}</span>
        <span className="mr-2">followers</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#1a202c] ml-1">{user.following}</span>
        <span>following</span>
      </div>

      <div className="space-y-3 text-sm text-[#4a5568] font-semibold">
        <div className="flex items-center group">
          <i className="fa-solid fa-location-dot w-6 text-orange-400 group-hover:scale-110 transition-transform"></i>
          <span>{user.location}</span>
        </div>
        <div className="flex items-center group">
          <i className="fa-solid fa-link w-6 text-orange-400 group-hover:scale-110 transition-transform"></i>
          <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 hover:underline transition-all truncate">{user.website}</a>
        </div>
      </div>

      {/* Set Status Modal */}
      {isStatusOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-black/5 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
             <div className="p-8">
                <h3 className="text-xl font-black text-[#1a202c] mb-6">Update status</h3>
                <div className="relative mb-8">
                   <i className="fa-solid fa-face-smile absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 text-xl"></i>
                   <input 
                    type="text" 
                    placeholder="What's on your mind?"
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none shadow-inner font-semibold"
                    value={statusText}
                    onChange={e => setStatusText(e.target.value)}
                    autoFocus
                   />
                </div>
                <div className="flex gap-4">
                   <button 
                    onClick={() => setIsStatusOpen(false)}
                    className="flex-1 bg-gray-100 text-[#718096] py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                   >
                    Cancel
                   </button>
                   <button 
                    onClick={() => setIsStatusOpen(false)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-black shadow-lg shadow-orange-200 transition-all active:scale-95"
                   >
                    Update
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-black/5 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="px-8 py-5 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
               <h3 className="text-xl font-black text-[#1a202c]">Profile Settings</h3>
               <button onClick={() => setIsEditProfileOpen(false)} className="text-[#a0aec0] hover:text-[#1a202c] transition-colors">
                 <i className="fa-solid fa-xmark text-2xl"></i>
               </button>
             </div>
             <form onSubmit={handleSaveProfile} className="p-8 space-y-6">
                <div>
                   <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Display Name</label>
                   <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 text-sm text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none shadow-inner font-semibold"
                    value={editData.displayName}
                    onChange={e => setEditData({...editData, displayName: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Bio</label>
                   <textarea 
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 text-sm text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none h-32 resize-none shadow-inner font-semibold"
                    value={editData.bio}
                    onChange={e => setEditData({...editData, bio: e.target.value})}
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Location</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 text-sm text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none shadow-inner font-semibold"
                      value={editData.location}
                      onChange={e => setEditData({...editData, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2 text-[#718096]">Website</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4 py-3 text-sm text-[#1a202c] focus:bg-white focus:border-orange-400 outline-none shadow-inner font-semibold"
                      value={editData.website}
                      onChange={e => setEditData({...editData, website: e.target.value})}
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-4">
                   <button 
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="px-6 py-3 text-sm font-bold text-[#718096] hover:text-[#1a202c] transition-colors"
                   >
                    Cancel
                   </button>
                   <button 
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-2xl text-sm font-black shadow-lg shadow-orange-200 transition-all active:scale-95"
                   >
                    Save Changes
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* Avatar Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white border border-black/5 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-[#1a202c] tracking-tight">Profile Photo</h3>
              <button onClick={closeModal} className="text-[#a0aec0] hover:text-[#1a202c] transition-colors">
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>

            <div className="p-10 flex flex-col items-center">
              <div className="w-64 h-64 rounded-[3rem] border-8 border-white bg-gray-50 overflow-hidden mb-12 relative shadow-2xl ring-1 ring-black/5">
                {isCameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : capturedImage ? (
                  <img src={capturedImage} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <img src={user.avatarUrl} className="w-full h-full object-cover opacity-80" alt="Current" />
                )}
                
                {cameraError && !isCameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-50 p-6 text-center">
                    <p className="text-sm text-red-600 font-bold">{cameraError}</p>
                  </div>
                )}
              </div>

              <div className="w-full space-y-4">
                {isCameraActive ? (
                  <button 
                    onClick={handleCapture}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-200 transition-all flex items-center justify-center active:scale-95"
                  >
                    <i className="fa-solid fa-camera mr-2"></i> CAPTURE NOW
                  </button>
                ) : capturedImage ? (
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCapturedImage(null)}
                      className="flex-1 bg-gray-100 text-[#4a5568] py-4 rounded-2xl font-black hover:bg-gray-200 transition-all"
                    >
                      RETRY
                    </button>
                    <button 
                      onClick={saveAvatar}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-green-100 transition-all"
                    >
                      SAVE PHOTO
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gray-50 border border-black/5 text-[#4a5568] py-6 rounded-3xl font-black hover:bg-white hover:border-orange-400 hover:text-orange-600 transition-all flex flex-col items-center justify-center group shadow-sm"
                    >
                      <i className="fa-solid fa-cloud-arrow-up mb-3 text-3xl text-orange-400 group-hover:scale-110 transition-transform"></i>
                      <span className="text-[10px] uppercase tracking-widest">Browse</span>
                    </button>
                    <button 
                      onClick={() => setIsCameraActive(true)}
                      className="bg-gray-50 border border-black/5 text-[#4a5568] py-6 rounded-3xl font-black hover:bg-white hover:border-green-400 hover:text-green-600 transition-all flex flex-col items-center justify-center group shadow-sm"
                    >
                      <i className="fa-solid fa-camera mb-3 text-3xl text-green-400 group-hover:scale-110 transition-transform"></i>
                      <span className="text-[10px] uppercase tracking-widest">Camera</span>
                    </button>
                  </div>
                )}
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="px-8 py-4 bg-gray-50/50 border-t border-black/5 text-center">
              <p className="text-[10px] text-[#718096] font-black uppercase tracking-widest">
                Support: PNG, JPG, WEBP (Max 5MB)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
