import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { TIMELINE_DATA, COLORS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

export const Overlay: React.FC = () => {
  const { hasStarted, activeEventId, setStarted, nextEvent, prevEvent } = useStore();
  const [activeItem, setActiveItem] = useState(TIMELINE_DATA[0]);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (activeEventId) {
        const item = TIMELINE_DATA.find(d => d.id === activeEventId);
        if (item) setActiveItem(item);
        // Reset reward modal when changing events
        setShowRewardModal(false);
    }
  }, [activeEventId]);

  const handleOpenReward = () => {
      setShowBurst(true);
      setTimeout(() => {
          setShowBurst(false);
          setShowRewardModal(true);
      }, 800);
  };

  if (!hasStarted) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#1e1b4b] bg-opacity-90 backdrop-blur-sm">
        <div className="text-center p-8 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 tracking-tight mb-4"
          >
            Rewind Your Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 mb-8"
          >
            Relive your moments, Malaysian style.
          </motion.p>
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all border border-white/20"
          >
            Start Experience
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between overflow-hidden">
      {/* Burst Animation Overlay */}
      <AnimatePresence>
        {showBurst && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-none"
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 2], opacity: [1, 1, 0] }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full bg-gradient-to-r from-yellow-300 via-red-400 to-purple-500 rounded-full mix-blend-screen"
                />
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-end px-6 md:px-12 pb-24 md:pb-0 pt-12">
        <AnimatePresence mode="wait">
            {activeEventId && (
                <motion.div 
                    key={activeEventId}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="bg-slate-900/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20 w-full max-w-sm md:max-w-md pointer-events-auto"
                >
                   <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4 uppercase tracking-wider"
                      style={{ backgroundColor: COLORS[activeItem.type] || '#333' }}
                   >
                      {activeItem.type}
                   </div>
                   
                   <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                       {activeItem.title}
                   </h2>
                   
                   <p className="text-sm font-medium text-slate-400 mb-4">
                       {new Date(activeItem.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                   </p>

                   {activeItem.thumbnailUrl && (
                       <div className="mb-4 rounded-xl overflow-hidden shadow-inner border border-white/10">
                           <img src={activeItem.thumbnailUrl} alt="memory" className="w-full h-32 object-cover" />
                       </div>
                   )}

                   <p className="text-slate-300 leading-relaxed mb-6">
                       {activeItem.description}
                   </p>

                   {activeItem.metadata && (
                       <div className="grid grid-cols-2 gap-2 mb-6">
                           {Object.entries(activeItem.metadata).map(([key, val]) => (
                               <div key={key} className="bg-white/5 p-2 rounded-lg border border-white/10">
                                   <div className="text-xs text-slate-400 uppercase">{key}</div>
                                   <div className="font-bold text-white">{String(val)}</div>
                               </div>
                           ))}
                       </div>
                   )}

                   {/* Conditional Footer Buttons */}
                   <div className="flex gap-3">
                       {activeItem.type === 'summary' ? (
                           <button 
                                onClick={handleOpenReward}
                                className="w-full bg-gradient-to-r from-yellow-500 to-red-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all"
                           >
                               OPEN YOUR REWARDS
                           </button>
                       ) : (
                           <>
                                <button className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/10">
                                    Share
                                </button>
                                {['reward', 'achievement', 'milestone'].includes(activeItem.type) && (
                                    <button className="flex-1 bg-blue-600/80 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">
                                        Details
                                    </button>
                                )}
                           </>
                       )}
                   </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
      
      {/* Reward Modal Popup */}
      <AnimatePresence>
        {showRewardModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md" 
                    onClick={() => setShowRewardModal(false)}
                />
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="relative bg-gradient-to-b from-yellow-100 to-white w-full max-w-md rounded-3xl p-8 text-center shadow-2xl border-4 border-yellow-400"
                >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-6xl">
                        🎁
                    </div>
                    <h3 className="mt-8 text-3xl font-black text-slate-900 uppercase">Congratulations!</h3>
                    <p className="text-slate-500 mb-6">You've completed your journey.</p>
                    
                    <div className="bg-slate-900 text-white p-6 rounded-2xl mb-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <div className="text-yellow-400 font-bold text-lg mb-1">EXCLUSIVE VOUCHER</div>
                        <div className="text-5xl font-black mb-2 tracking-tighter">99% OFF</div>
                        <div className="text-xs bg-white/20 inline-block px-2 py-1 rounded">Capped at RM500</div>
                    </div>

                    <button 
                        onClick={() => alert("Voucher claimed!")}
                        className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                        CLAIM NOW
                    </button>
                    <button 
                        onClick={() => setShowRewardModal(false)}
                        className="mt-4 text-slate-400 text-sm hover:text-slate-600 font-medium"
                    >
                        Close
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-auto z-20">
            <button 
                onClick={prevEvent}
                className="w-12 h-12 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
                ←
            </button>
            <div className="px-4 py-3 bg-black/40 backdrop-blur rounded-full border border-white/10 text-xs font-bold text-white/70 flex items-center">
                SCROLL TO EXPLORE
            </div>
            <button 
                onClick={nextEvent}
                className="w-12 h-12 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
                →
            </button>
      </div>
    </div>
  );
};