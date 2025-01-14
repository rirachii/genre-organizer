import React, { useState, useEffect, useMemo } from 'react';
import { Pencil, X, Plus } from 'lucide-react';

const INITIAL_GENRES = [
  'acoustic chicago blues cape verdean',
  'rock'
].sort((a, b) => a.localeCompare(b));

const PRESET_COLORS = [
  'rgb(239, 68, 68)',   // red
  'rgb(59, 130, 246)',  // blue
  'rgb(34, 197, 94)',   // green
  'rgb(168, 85, 247)',  // purple
  'rgb(234, 179, 8)',   // yellow
  'rgb(236, 72, 153)',  // pink
  'rgb(79, 70, 229)',   // indigo
  'rgb(249, 115, 22)'   // orange
];

const STORAGE_KEY = 'genreOrganizerState';

const GenreOrganizer = () => {
  // State management
  const [buckets, setBuckets] = useState(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : [];
  });

  const [unassignedGenres, setUnassignedGenres] = useState(() => {
    const savedBuckets = localStorage.getItem(STORAGE_KEY);
    if (savedBuckets) {
      const assignedGenres = new Set(
        JSON.parse(savedBuckets).flatMap(bucket => bucket.genres)
      );
      return INITIAL_GENRES.filter(genre => !assignedGenres.has(genre));
    }
    return INITIAL_GENRES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [newBucketName, setNewBucketName] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(buckets));
  }, [buckets]);

  // Filtered genres for search
  const filteredGenres = useMemo(() => {
    return searchTerm
      ? unassignedGenres.filter(genre => 
          genre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : unassignedGenres;
  }, [unassignedGenres, searchTerm]);

  // Drag and drop handlers
  const handleDragStart = (e, genre) => {
    e.dataTransfer.setData('genre', genre);
    e.dataTransfer.setData('source', 'unassigned');
  };

  const handleBucketDragStart = (e, genre, bucketId) => {
    e.dataTransfer.setData('genre', genre);
    e.dataTransfer.setData('source', 'bucket');
    e.dataTransfer.setData('bucketId', bucketId);
  };

  const handleDrop = (e, targetBucketId) => {
    e.preventDefault();
    const genre = e.dataTransfer.getData('genre');
    const source = e.dataTransfer.getData('source');
    const sourceBucketId = e.dataTransfer.getData('bucketId');

    if (source === 'unassigned') {
      setBuckets(prev => prev.map(bucket => 
        bucket.id === targetBucketId
          ? { ...bucket, genres: [...bucket.genres, genre] }
          : bucket
      ));
      setUnassignedGenres(prev => prev.filter(g => g !== genre));
    } else if (source === 'bucket' && sourceBucketId !== targetBucketId) {
      setBuckets(prev => prev.map(bucket => {
        if (bucket.id === sourceBucketId) {
          return { ...bucket, genres: bucket.genres.filter(g => g !== genre) };
        }
        if (bucket.id === targetBucketId) {
          return { ...bucket, genres: [...bucket.genres, genre] };
        }
        return bucket;
      }));
    }
  };

  const handleDropToUnassigned = (e) => {
    e.preventDefault();
    const genre = e.dataTransfer.getData('genre');
    const source = e.dataTransfer.getData('source');
    const bucketId = e.dataTransfer.getData('bucketId');

    if (source === 'bucket') {
      setBuckets(prev => prev.map(bucket => 
        bucket.id === bucketId
          ? { ...bucket, genres: bucket.genres.filter(g => g !== genre) }
          : bucket
      ));
      setUnassignedGenres(prev => [...prev, genre].sort((a, b) => a.localeCompare(b)));
    }
  };

  const addBucket = () => {
    if (!newBucketName.trim()) return;
    
    const newBucket = {
      id: `bucket-${Date.now()}`,
      name: newBucketName,
      genres: [],
      colorIndex: selectedColor
    };
    
    setBuckets(prev => [...prev, newBucket]);
    setNewBucketName('');
    setSelectedColor((prev) => (prev + 1) % PRESET_COLORS.length);
  };

  const deleteBucket = (bucketId) => {
    setBuckets(prev => {
      const bucket = prev.find(b => b.id === bucketId);
      setUnassignedGenres(genres => [...genres, ...bucket.genres].sort((a, b) => a.localeCompare(b)));
      return prev.filter(b => b.id !== bucketId);
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex overflow-hidden">
        {/* Left side - Unassigned Genres */}
        <div className="w-1/2 flex flex-col p-4 border-r">
          <h1 className="text-blue-600 font-bold text-2xl text-center mb-4">
            Unassigned Genres
          </h1>
          
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search genres..."
                className="w-full p-1 border rounded"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                🔍
              </div>
            </div>
          </div>

          <div 
            className="flex-1 overflow-y-auto"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropToUnassigned}
          >
            {filteredGenres.map(genre => (
              <div
                key={genre}
                draggable
                onDragStart={(e) => handleDragStart(e, genre)}
                className="p-1 cursor-move"
              >
                {genre}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Buckets */}
        <div className="w-1/2 flex flex-col p-4">
          <h1 className="text-blue-600 font-bold text-2xl text-center mb-4">
            Genre Buckets
          </h1>
          
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newBucketName}
                onChange={(e) => setNewBucketName(e.target.value)}
                placeholder="New bucket name"
                className="flex-1 p-1 border rounded"
              />
              <div className="flex gap-1">
                {PRESET_COLORS.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-6 h-6 rounded-full border ${
                      selectedColor === index ? 'border-4' : 'border-2'
                    }`}
                    style={{ borderColor: color }}
                  />
                ))}
              </div>
              <button
                onClick={addBucket}
                className="px-2 rounded-full border border-gray-300"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {buckets.map(bucket => (
              <div
                key={bucket.id}
                className="mb-4"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, bucket.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: PRESET_COLORS[bucket.colorIndex] }}>
                    {bucket.name}
                  </span>
                  <div className="flex gap-1">
                    <button className="p-1">
                      <Pencil size={14} />
                    </button>
                    <button 
                      onClick={() => deleteBucket(bucket.id)}
                      className="p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  {bucket.genres.map(genre => (
                    <div
                      key={genre}
                      draggable
                      onDragStart={(e) => handleBucketDragStart(e, genre, bucket.id)}
                      className="p-1 cursor-move"
                      style={{ color: PRESET_COLORS[bucket.colorIndex] }}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreOrganizer;