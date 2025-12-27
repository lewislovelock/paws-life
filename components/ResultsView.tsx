import React from 'react';
import { DogSize, PetType, CalculationResult } from '../types';
import { Counter } from './Counter';
import { CatIcon, DogIcon } from './Icons';
import { Share2, Download } from 'lucide-react';

interface ResultsViewProps {
  result: CalculationResult;
  petType: PetType;
  dogSize?: DogSize;
  petName?: string;
  avatarUrl?: string;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ 
  result, 
  petType, 
  petName = "Your Pet",
  avatarUrl
}) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Main Card */}
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 text-center transition-all duration-500 hover:shadow-orange-500/10">
        
        {/* Floating Background Blobs */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${result.lifeStage.bgGradient} opacity-20 rounded-full blur-2xl transform translate-x-10 -translate-y-10`} />
        <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${result.lifeStage.bgGradient} opacity-20 rounded-full blur-2xl transform -translate-x-10 translate-y-10`} />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-6 shadow-inner relative group">
             {avatarUrl ? (
                 <img src={avatarUrl} alt="Pet Avatar" className="w-full h-full object-cover rounded-full" />
             ) : (
                <div className={`text-orange-500 transition-transform duration-300 group-hover:scale-110`}>
                  {petType === PetType.CAT ? <CatIcon className="w-12 h-12" /> : <DogIcon className="w-12 h-12" />}
                </div>
             )}
             <div className="absolute -bottom-2 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md text-gray-600 border border-gray-100">
               {petName}
             </div>
          </div>

          <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Human Age Equivalent</h2>
          
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <Counter value={result.humanYears} className="text-7xl font-black text-gray-800 tracking-tighter tabular-nums" />
            <span className="text-2xl text-gray-400 font-medium">years</span>
          </div>

          <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-white shadow-sm border ${result.lifeStage.color} border-current/20 mb-6`}>
            {result.lifeStage.stage} Phase
          </div>

          <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
            {result.lifeStage.description}
          </p>
        </div>

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium transition-colors">
                <Share2 size={16} /> Share Result
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 text-sm font-medium transition-colors">
                <Download size={16} /> Save Card
            </button>
        </div>
      </div>

    </div>
  );
};
