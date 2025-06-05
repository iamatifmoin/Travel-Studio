import React, { useEffect, useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import HotelMap3D from './HotelMap3D';
import { Star, MapPin, Filter, X, Building2, Coffee, Clock, Phone, ChefHat, DollarSign, Navigation } from 'lucide-react';
import { fetchExperiences } from '../pages/api/experiences';

const ExplorePage: React.FC = () => {
  const {
    internalExperiences,
    externalExperiences,
    selectedExperience,
    distanceFilter,
    ratingFilter,
    isLoading,
    setExperiences,
    setLoading,
    setDistanceFilter,
    setRatingFilter,
    setSelectedExperience,
    setSelectedInternalRoom,
    setSelectedExternalRoom,
  } = useStore();

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);
        const data = await fetchExperiences();
        setExperiences(data.internalExperiences, data.externalExperiences);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, [setExperiences, setLoading]);

  const filteredExternalExperiences = useMemo(() => {
    return externalExperiences.filter(exp => {
      const distanceValue = parseFloat(exp.distance?.split(' ')[0] || '0');
      const distanceMatch = distanceFilter === 'all' || 
        (distanceFilter === 'near' && distanceValue <= 0.5) ||
        (distanceFilter === 'medium' && distanceValue > 0.5 && distanceValue <= 1.0) ||
        (distanceFilter === 'far' && distanceValue > 1.0);
      
      const ratingMatch = (exp.rating || 0) >= ratingFilter;
      
      return distanceMatch && ratingMatch;
    });
  }, [externalExperiences, distanceFilter, ratingFilter]);

  const handleInternalExperienceClick = (experience: any) => {
    setSelectedExperience(experience);
    setSelectedInternalRoom(experience.id);
    setSelectedExternalRoom(null);
  };

  const handleExternalExperienceClick = (experience: any) => {
    setSelectedExperience(experience);
    setSelectedExternalRoom(experience.id);
    setSelectedInternalRoom(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 font-medium">Loading your luxury experience...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing the perfect stay</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Travel Studio
              </h1>
              <p className="text-gray-600 mt-2 font-medium">Explore & Discover Amazing Experiences</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Filter size={18} />
                <span className="font-medium">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center space-x-3">
                <label className="text-sm font-semibold text-gray-700">Distance:</label>
                <select
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
                >
                  <option value="all">All Distances</option>
                  <option value="near">≤ 0.5 km</option>
                  <option value="medium">0.5 - 1.0 km</option>
                  <option value="far">&gt; 1.0 km</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <label className="text-sm font-semibold text-gray-700">Min Rating:</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(Number(e.target.value))}
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
                >
                  <option value={0}>All Ratings</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>
              
              <button
                onClick={() => setShowFilters(false)}
                className="ml-auto text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 3D Hotel Map */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Interactive Hotel Map</h2>
              <p className="text-gray-600 text-lg">Explore our facilities and nearby restaurants in immersive 3D</p>
            </div>
          </div>
          <HotelMap3D />
        </section>

        {/* Selected Experience Detail Below Map */}
        {selectedExperience && (
          <section className="mb-12">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50 transition-all duration-500 animate-fade-in">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${selectedExperience.title ? 'bg-indigo-100' : 'bg-orange-100'}`}>
                    {selectedExperience.title ? (
                      <Building2 className="w-8 h-8 text-indigo-600" />
                    ) : (
                      <Coffee className="w-8 h-8 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedExperience.title || selectedExperience.name}
                    </h3>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      selectedExperience.title 
                        ? 'text-indigo-700 bg-indigo-100 border border-indigo-200' 
                        : 'text-orange-700 bg-orange-100 border border-orange-200'
                    }`}>
                      {selectedExperience.title ? 'Hotel Amenity' : 'External Restaurant'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="text-gray-500 hover:text-gray-700 p-3 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Enhanced details grid for external experiences */}
              {!selectedExperience.title && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {selectedExperience.rating && (
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-200 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="w-6 h-6 text-yellow-500 fill-current" />
                        <span className="text-2xl font-bold text-yellow-700">{selectedExperience.rating}</span>
                      </div>
                      <p className="text-sm font-medium text-yellow-600">Customer Rating</p>
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedExperience.rating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedExperience.distance && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Navigation className="w-6 h-6 text-blue-500" />
                        <span className="text-2xl font-bold text-blue-700">{selectedExperience.distance}</span>
                      </div>
                      <p className="text-sm font-medium text-blue-600">Walking Distance</p>
                      <p className="text-xs text-blue-500 mt-1">From hotel entrance</p>
                    </div>
                  )}
                  
                  {selectedExperience.cuisine && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <ChefHat className="w-6 h-6 text-green-500" />
                        <span className="text-lg font-bold text-green-700">{selectedExperience.cuisine}</span>
                      </div>
                      <p className="text-sm font-medium text-green-600">Cuisine Type</p>
                      <p className="text-xs text-green-500 mt-1">Specialty dining</p>
                    </div>
                  )}
                  
                  {selectedExperience.priceRange && (
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-200 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-6 h-6 text-emerald-500" />
                        <span className="text-lg font-bold text-emerald-700">{selectedExperience.priceRange}</span>
                      </div>
                      <p className="text-sm font-medium text-emerald-600">Price Range</p>
                      <p className="text-xs text-emerald-500 mt-1">Per person average</p>
                    </div>
                  )}
                </div>
              )}
              
              {selectedExperience.description && (
                <div className="bg-gray-50/80 rounded-2xl p-6 mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">{selectedExperience.description}</p>
                </div>
              )}
              
              {selectedExperience.image && (
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedExperience.image}
                    alt={selectedExperience.title || selectedExperience.name}
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Internal Experiences */}
          <section>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl font-bold text-gray-900">Hotel Amenities</h2>
              </div>
              <p className="text-gray-600 text-lg">Discover our luxury facilities and exclusive services</p>
            </div>
            
            <div className="grid gap-6">
              {internalExperiences.map((experience) => (
                <div
                  key={experience.id}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-indigo-100 cursor-pointer group transform hover:-translate-y-2 hover:scale-[1.02]"
                  onClick={() => handleInternalExperienceClick(experience)}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 relative overflow-hidden">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="h-40 w-40 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        Hotel Amenity
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-100 rounded-xl">
                          <Building2 className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {experience.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                        {experience.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Available 24/7</span>
                        </div>
                        <div className="text-indigo-600 group-hover:text-indigo-700 font-semibold text-sm">
                          Learn More →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* External Experiences */}
          <section>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Coffee className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-bold text-gray-900">Nearby Dining</h2>
              </div>
              <p className="text-gray-600 text-lg">Explore the finest restaurants in your neighborhood</p>
            </div>
            
            <div className="grid gap-6">
              {filteredExternalExperiences.map((experience) => (
                <div
                  key={experience.id}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border-2 border-orange-100 cursor-pointer group transform hover:-translate-y-2 hover:scale-[1.02]"
                  onClick={() => handleExternalExperienceClick(experience)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-100 rounded-2xl group-hover:bg-orange-200 transition-colors">
                        <Coffee className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                          {experience.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
                            {experience.cuisine}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-xl border-2 border-yellow-200 shadow-md">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-lg font-bold text-yellow-700">{experience.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-blue-700 text-sm">{experience.distance}</span>
                      </div>
                      <p className="text-xs text-blue-600 font-medium">Walking distance</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-700 text-sm">{experience.priceRange}</span>
                      </div>
                      <p className="text-xs text-green-600 font-medium">Price range</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-orange-600 font-bold bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
                      External Restaurant
                    </span>
                    <div className="text-orange-600 group-hover:text-orange-700 font-semibold text-sm">
                      Explore →
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredExternalExperiences.length === 0 && (
              <div className="text-center py-16 bg-white/60 backdrop-blur-md rounded-2xl border-2 border-gray-200">
                <Coffee className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No restaurants found</h3>
                <p className="text-gray-600 text-lg mb-6">No restaurants match your current filters.</p>
                <button
                  onClick={() => {
                    setDistanceFilter('all');
                    setRatingFilter(0);
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
