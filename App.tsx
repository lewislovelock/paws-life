import React, { useState, useEffect, useMemo } from 'react';
import { PetType, DogSize, CalculationResult } from './types';
import { calculatePetAge } from './services/calculator';
import { COMMON_DOG_BREEDS } from './constants';
import { ResultsView } from './components/ResultsView';
import { ChartSection } from './components/ChartSection';
import { CatIcon, DogIcon } from './components/Icons';
import { Search, Info, ChevronRight } from 'lucide-react';

export default function App() {
  const [petType, setPetType] = useState<PetType>(PetType.DOG);
  const [dogSize, setDogSize] = useState<DogSize>(DogSize.MEDIUM);
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBreedSearch, setShowBreedSearch] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Calculate whenever inputs change
  useEffect(() => {
    const res = calculatePetAge(petType, dogSize, years, months);
    setResult({
      humanYears: res.age,
      lifeStage: res.stage
    });
  }, [petType, dogSize, years, months]);

  // Handle breed selection
  const handleBreedSelect = (breed: string) => {
    setDogSize(COMMON_DOG_BREEDS[breed]);
    setSearchTerm(breed);
    setShowBreedSearch(false);
  };

  // Filter breeds
  const filteredBreeds = useMemo(() => {
    return Object.keys(COMMON_DOG_BREEDS).filter(b => 
      b.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const bgGradient = result ? result.lifeStage.bgGradient : 'from-orange-50 to-amber-50';

  return (
    <div className={`min-h-screen transition-colors duration-1000 bg-gradient-to-br ${bgGradient} font-sans text-slate-800 selection:bg-orange-200`}>
      
      {/* Header */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white p-1.5 rounded-lg">
                <DogIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-800">PawsLife</span>
        </div>
        <div className="hidden sm:flex gap-4 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-orange-500 transition-colors">About AAHA</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Methodology</a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* LEFT COLUMN: Input Section */}
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-700">
                
                <header>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        How old is your <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">best friend?</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md">
                        Stop guessing. Use the scientific stage-weighted algorithm to find their true human age.
                    </p>
                </header>

                <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/60">
                    
                    {/* 1. Species Selector */}
                    <div className="mb-8">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">1. Select Species</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setPetType(PetType.DOG)}
                                className={`flex items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all duration-300 ${petType === PetType.DOG ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm ring-2 ring-orange-200 ring-offset-1' : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                <DogIcon className="w-6 h-6" />
                                <span className="font-bold">Dog</span>
                            </button>
                            <button 
                                onClick={() => setPetType(PetType.CAT)}
                                className={`flex items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all duration-300 ${petType === PetType.CAT ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm ring-2 ring-orange-200 ring-offset-1' : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                <CatIcon className="w-6 h-6" />
                                <span className="font-bold">Cat</span>
                            </button>
                        </div>
                    </div>

                    {/* 2. Dog Size / Breed Selector (Only for Dogs) */}
                    {petType === PetType.DOG && (
                        <div className="mb-8 animate-in fade-in zoom-in-95 duration-300">
                             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">2. Size or Breed</label>
                             
                             <div className="relative mb-4">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search breed (e.g. Corgi)"
                                    className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setShowBreedSearch(true);
                                    }}
                                    onFocus={() => setShowBreedSearch(true)}
                                />
                                {showBreedSearch && searchTerm && (
                                    <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-48 overflow-y-auto">
                                        {filteredBreeds.length > 0 ? (
                                            filteredBreeds.map(breed => (
                                                <button
                                                    key={breed}
                                                    onClick={() => handleBreedSelect(breed)}
                                                    className="w-full text-left px-4 py-3 hover:bg-orange-50 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0 flex justify-between"
                                                >
                                                    {breed}
                                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded uppercase">{COMMON_DOG_BREEDS[breed]}</span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-4 text-sm text-gray-400 text-center">No breed found. Select size below.</div>
                                        )}
                                    </div>
                                )}
                             </div>

                             {/* Manual Size Toggles */}
                             <div className="grid grid-cols-4 gap-2">
                                {[DogSize.SMALL, DogSize.MEDIUM, DogSize.LARGE, DogSize.GIANT].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setDogSize(s)}
                                        className={`py-2 rounded-lg text-xs font-bold border transition-colors ${dogSize === s ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-orange-300'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                             </div>
                             <p className="text-xs text-gray-400 mt-2 text-center">
                                {dogSize === DogSize.SMALL && "< 9kg"}
                                {dogSize === DogSize.MEDIUM && "9kg - 22kg"}
                                {dogSize === DogSize.LARGE && "23kg - 40kg"}
                                {dogSize === DogSize.GIANT && "> 40kg"}
                             </p>
                        </div>
                    )}

                    {/* 3. Age Input */}
                    <div>
                        <div className="flex justify-between items-baseline mb-4">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">3. Precise Age</label>
                            <span className="text-2xl font-black text-gray-800 tabular-nums">
                                {years}<span className="text-sm font-medium text-gray-400 ml-1">yrs</span> 
                                <span className="ml-2">{months}</span><span className="text-sm font-medium text-gray-400 ml-1">mos</span>
                            </span>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Years Slider */}
                            <div className="relative pt-1">
                                <input
                                    type="range"
                                    min="0"
                                    max="20"
                                    step="1"
                                    value={years}
                                    onChange={(e) => setYears(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 transition-all"
                                />
                                <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">
                                    <span>Birth</span>
                                    <span>10 Years</span>
                                    <span>20 Years</span>
                                </div>
                            </div>
                            
                            {/* Months Slider */}
                            <div className="relative pt-1">
                                <input
                                    type="range"
                                    min="0"
                                    max="11"
                                    step="1"
                                    value={months}
                                    onChange={(e) => setMonths(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-400 hover:accent-orange-500 transition-all"
                                />
                                <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">
                                    <span>0 Mos</span>
                                    <span>11 Mos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Results & Chart */}
            <div className="flex flex-col gap-8">
                {result && (
                    <ResultsView 
                        result={result} 
                        petType={petType} 
                        dogSize={dogSize}
                        petName={searchTerm || (petType === PetType.DOG ? 'Your Dog' : 'Your Cat')}
                    />
                )}
                
                <ChartSection currentPetType={petType} currentAge={years + (months/12)} />

                <div className="bg-white/50 backdrop-blur rounded-2xl p-4 flex gap-4 items-start text-xs text-gray-500 leading-relaxed border border-white/20">
                    <Info className="flex-shrink-0 w-4 h-4 mt-0.5 text-gray-400" />
                    <p>
                        This calculator uses the latest 2025 algorithm based on <strong>AAHA (American Animal Hospital Association)</strong> guidelines. 
                        Unlike the old "multiply by 7" rule, this model accounts for physiological maturation rates specific to size and species.
                    </p>
                </div>
            </div>
        </div>
      </main>
      
      {/* Hidden generic SEO footer text */}
      <footer className="opacity-0 h-0 overflow-hidden">
        scientific dog age calculator 2025, dog age calculator by breed and weight, AAHA dog age chart, why do big dogs age faster calculator, cat years vs dog years calculator
      </footer>
    </div>
  );
}
