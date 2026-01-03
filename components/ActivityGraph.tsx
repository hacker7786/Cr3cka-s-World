
import React from 'react';

const ActivityGraph: React.FC = () => {
  // Simple fake data generation for 52 weeks x 7 days
  const weeks = 53;
  const days = 7;
  
  const generateLevel = () => {
    const r = Math.random();
    if (r > 0.9) return 4;
    if (r > 0.8) return 3;
    if (r > 0.7) return 2;
    if (r > 0.4) return 1;
    return 0;
  };

  const levelColors = [
    '#edf2f7', // 0 (light gray)
    '#fef3c7', // 1 (amber)
    '#fde68a', // 2
    '#fbbf24', // 3
    '#f59e0b', // 4 (deep orange/amber)
  ];

  return (
    <div className="mt-8 border border-black/5 rounded-2xl p-6 bg-white/60 backdrop-blur-sm shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-[#1a202c]">1,842 contributions in the last year</h3>
        <div className="text-[10px] uppercase tracking-widest font-black text-[#718096] flex items-center space-x-2 cursor-pointer hover:text-orange-500">
           <span>Settings</span> <i className="fa-solid fa-caret-down"></i>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex space-x-1">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col space-y-1">
              {Array.from({ length: days }).map((_, d) => {
                const level = generateLevel();
                return (
                  <div 
                    key={d} 
                    className="w-[11px] h-[11px] rounded-[3px] shadow-sm transition-all hover:scale-125 cursor-help" 
                    style={{ backgroundColor: levelColors[level] }}
                    title={`Contributions: ${level * 5}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-[10px] font-bold text-[#a0aec0] uppercase tracking-tighter">
        <button className="hover:text-orange-500 transition-colors">How we count contributions</button>
        <div className="flex items-center space-x-2">
          <span>Less</span>
          <div className="flex space-x-1">
            {levelColors.map((color, i) => (
              <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityGraph;
