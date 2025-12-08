import React, { useState, useMemo } from 'react';
import { Calendar, Users, RefreshCw, Filter } from 'lucide-react';
import { ANNUAL_ACTIVITIES } from './data';
import { generatePastelColor, getDateColorClass } from './utils';

const App: React.FC = () => {
  const [filterName, setFilterName] = useState<string | null>(null);

  // Filter logic
  const filteredData = useMemo(() => {
    if (!filterName) return ANNUAL_ACTIVITIES;

    return ANNUAL_ACTIVITIES.map(month => ({
      ...month,
      records: month.records.filter(record => 
        record.participants.includes(filterName)
      )
    })).filter(month => month.records.length > 0);
  }, [filterName]);

  const handleNameClick = (name: string) => {
    setFilterName(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFilterName(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] selection:bg-gray-200">
      {/* Hero Section */}
      <div className="relative w-full h-[35vh] md:h-[45vh] bg-[#D9DDF8] overflow-hidden">
        {/*
          NOTE: Please place the uploaded image as 'header.png' in the public folder or root directory.
          The image is positioned to the right to keep the character visible on all screen sizes.
        */}
        <img 
          src="./header.png" 
          alt="おさかなだお長崎 Season 2 Header" 
          className="w-full h-full object-cover object-[80%_center] md:object-right"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
        
        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col items-start justify-center p-8 md:pl-20 lg:pl-32">
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-[#6B7280] mb-3 uppercase">
            おさかなだお長崎 Season 2
          </h2>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-[#1A1A1A]">
            年間活動記録
          </h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Filter Status */}
        <div className="mb-16 sticky top-6 z-20">
             <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-full text-gray-400">
                {filterName ? <Filter size={18} /> : <Calendar size={18} />}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#6B7280] font-medium tracking-wider uppercase">Filter</span>
                <span className="text-sm font-medium">
                  {filterName ? (
                    <span className="flex items-center gap-2">
                       Selected: <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-900">{filterName}</span>
                    </span>
                  ) : "All Activities"}
                </span>
              </div>
            </div>

            {filterName && (
              <button
                onClick={handleReset}
                className="group flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white text-xs tracking-wider rounded-full hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
              >
                <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                RESET FILTER
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-24">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-light">
              <p>No activities found for this participant.</p>
              <button onClick={handleReset} className="mt-4 text-sm underline hover:text-gray-800">Clear filter</button>
            </div>
          ) : (
            filteredData.map((month) => (
              <section key={month.monthName} className="relative">
                {/* Month Heading */}
                <div className="sticky top-28 md:top-24 z-10 pb-8 bg-gradient-to-b from-white via-white to-transparent pointer-events-none">
                    <h3 className="text-2xl font-light text-[#1A1A1A] inline-block bg-white pr-4">
                        {month.monthName}
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-12 pl-2 md:pl-4 border-l border-gray-100 ml-2 md:ml-0">
                  {month.records.map((record, idx) => (
                    <div key={`${month.monthName}-${idx}`} className="group relative pl-6 md:pl-10">
                      {/* Timeline Dot */}
                      <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-gray-200 rounded-full border-2 border-white group-hover:bg-gray-400 transition-colors" />

                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 mb-3">
                        {/* Date */}
                        <div className={`text-sm md:w-32 flex-shrink-0 font-medium tracking-wide ${getDateColorClass(record.dateColor)}`}>
                          {record.date}
                        </div>
                        
                        {/* Activity Name */}
                        <div className="flex-grow">
                          <h4 className="text-lg md:text-xl leading-relaxed font-normal text-[#1A1A1A] mb-4">
                            {record.name || <span className="text-gray-300 italic">No Title</span>}
                          </h4>

                          {/* Participants */}
                          <div className="flex flex-wrap items-center gap-2">
                            {record.participants.length > 0 ? (
                              record.participants.map((person) => (
                                <button
                                  key={person}
                                  onClick={() => handleNameClick(person)}
                                  style={{ backgroundColor: generatePastelColor(person) }}
                                  className="px-3 py-1 rounded-full text-[11px] md:text-xs font-medium text-black hover:opacity-75 transition-opacity duration-200"
                                >
                                  {person}
                                </button>
                              ))
                            ) : (
                                <span className="text-xs text-gray-300 flex items-center gap-1">
                                    <Users size={12} /> No participants
                                </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 py-12 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400 tracking-widest uppercase">
          © 2025 Osakana DAO Nagasaki
        </p>
      </footer>
    </div>
  );
};

export default App;