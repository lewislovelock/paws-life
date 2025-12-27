import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { calculatePetAge } from '../services/calculator';
import { PetType, DogSize } from '../types';

interface ChartSectionProps {
  currentPetType: PetType;
  currentAge: number; // in years
}

export const ChartSection: React.FC<ChartSectionProps> = ({ currentPetType, currentAge }) => {
  const data = Array.from({ length: 16 }, (_, i) => i + 1).map((year) => {
    const small = calculatePetAge(PetType.DOG, DogSize.SMALL, year, 0).age;
    const medium = calculatePetAge(PetType.DOG, DogSize.MEDIUM, year, 0).age;
    const large = calculatePetAge(PetType.DOG, DogSize.LARGE, year, 0).age;
    const giant = calculatePetAge(PetType.DOG, DogSize.GIANT, year, 0).age;
    const cat = calculatePetAge(PetType.CAT, DogSize.SMALL, year, 0).age; // Size ignored for cat
    
    return {
      name: year,
      Small: small,
      Medium: medium,
      Large: large,
      Giant: giant,
      Cat: cat,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100 text-xs">
          <p className="font-bold text-gray-700 mb-2">Pet Age: {label} Years</p>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}}></div>
                <span style={{ color: entry.color }} className="font-medium">
                {entry.name}: {entry.value}
                </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/40 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Aging Curves</h3>
        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500">AAHA Guidelines</span>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#9ca3af'}} 
                label={{ value: 'Pet Years', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#9ca3af' }}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#9ca3af'}} 
                width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
            
            <Line type="monotone" dataKey="Small" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{r: 4}} hide={currentPetType === PetType.CAT} />
            <Line type="monotone" dataKey="Medium" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{r: 4}} hide={currentPetType === PetType.CAT} />
            <Line type="monotone" dataKey="Large" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{r: 4}} hide={currentPetType === PetType.CAT} />
            <Line type="monotone" dataKey="Giant" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{r: 4}} hide={currentPetType === PetType.CAT} />
            <Line type="monotone" dataKey="Cat" stroke="#ec4899" strokeWidth={2} dot={false} activeDot={{r: 4}} hide={currentPetType === PetType.DOG} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-xs text-gray-400 mt-4">
        Interactive chart: Hover to see comparative ages at different life stages.
      </p>
    </div>
  );
};
