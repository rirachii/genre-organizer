import React, { useState, useEffect, useMemo } from 'react';
import { Pencil, X, Plus } from 'lucide-react';

const INITIAL_GENRES = ['acoustic chicago blues cape verdean', 'afro-jazz', 'ambient house 16-bit', 'arabic reggae', 'rock', 'electro-jungle', 'hindi southern rock', 'portuguese breakbeat', 'korean pacific reggae', 'surf flamenco', 'instrumental bluegrass', 'cajun griot', 'choral celtic', 'dakar afro-cuban jazz', 'hypnagogic pacific reggae', 'koto gnawa', 'new orleans grunge', 'prog avant-garde jazz', 'dark goa trance', 'dreamy swing', 'garage tango', 'grunge cumbia', 'shoegaze psybient', 'acoustic chicago blues algorave', 'afro-funk', 'ambient dub techno', 'arabic pop', 'reggaetonwave', 'classical cumbia', 'hindi jungle', 'portuguese barbershop', 'russian dembow', 'surf classical', 'bluegrass', 'cajun algorave', 'choral big band', 'cumbia metal', 'hypnagogic goa trance', 'koto g-funk', 'new orleans dembow', 'prog ambient noise wall', 'dark electropop', 'dreamy soul', 'garage', 'grunge bedroom pop', 'shoegaze cumbia', 'acoustic chicago blues', 'afro-cuban jazz griot', 'ambient dub boogie', 'arabic mariachi', 'reggae dirty south', 'choral afro-jazz', 'hindi dream pop', 'portuguese acoustic rock', 'urdu rumba', 'surf acoustic blues', 'big band new jack swing', 'cajun afrikaner folk', 'choral bedroom pop', 'cumbia acoustic blues', 'hypnagogic garage', 'koto drill and bass', 'new orleans cloud rap', 'prog afrobeat', 'reggae', 'dark drum and bass', 'dreamy shoegaze', 'electro-chanson', 'grunge americana', 'shoegaze boom bap', 'acoustic carnatic', 'afro-cuban jazz doo-wop', 'ambient dub bedroom pop', 'arabic egyptian', 'bubblegum bass symphonic metal', 'hindi doo-wop', 'portuguese 16-bit', 'urdu jazzwave', 'surf', 'big band grunge', 'cajun acid rock', 'choral ambient techno', 'cumbia', 'shoegaze afro-funk', 'hypnagogic electropop', 'koto dembow', 'new orleans chillwave', 'prog afro-jazz', 'reggae cumbia', 'dark dance', 'dreamy pacific reggae', 'electro-bossa nova', 'grunge american primitivism', 'southern rock', 'acoustic blues slushwave', 'afro-cuban jazz crunk', 'alternative rock', 'arabic classical', 'soulful soul', 'ambient dub bachata', 'hindi chanson', 'mandarin trance', 'urdu house', 'hypnagogic ambient trance', 'big band cumbia', 'cajun', 'choral ambient noise wall', 'crunk swamp blues', 'shoegaze afro-cuban jazz', 'koto coptic', 'new orleans carnatic', 'prog afro-funk', 'rap dirty south', 'sertanejo southern rock', 'dark coptic', 'dreamy house', 'electro-alternative r&amp;b', 'grunge afro-cuban jazz', 'sertanejo emo', 'acoustic blues mariachi', 'afro-cuban jazz', 'alternative r&amp;b griot', 'arabic ambient techno', 'soulful ska', 'drumstep soul', 'hindi carnatic', 'mandarin math rock', 'urdu electropop', 'hypnagogic algorave', 'big band boogie', 'cabaretwave', 'choral alt-country', 'crunk punk', 'koto boom bap', 'new orleans cajun', 'prog acoustic texas blues', 'rap bedroom pop', 'soulful reggaeton', 'southern rock ska', 'dark chillstep', 'dreamy grime', 'electro-acid house', 'grunge african folk', 'sertanejo chillstep', 'acoustic blues glitch hop', 'afro trap r&amp;b', 'alternative r&amp;b dembow', 'arabic afrobeat', 'delta blues house', 'hindi bubblegum dance', 'mandarin house', 'urdu drill', 'hyphy egyptian', 'big band ambient house', 'cabaret rock', 'choral 16-bit', 'crunk goa trance', 'koto alt-pop', 'new orleans alternative r&amp;b', 'popcore', 'rap', 'soulful folk', 'dark blues', 'dreamy fife and drum blues', 'egyptian swing', 'grunge', 'saxophone shoegaze', 'acoustic ambient trance', 'afro trap algorave', 'alternative r&amp;b', 'arabic acid house', 'liquid drum and bass house', 'hindi ambient house', 'mandarin hawaiian', 'urdu coptic', 'hyphy bluegrass', 'big band alt-country', 'cabaret americana', 'chillwavewave', 'crunk calypso', 'klezmer pop', 'new jack swing big band', 'pop synthpop', 'raga jazz', 'soulful city pop', 'dark alternative rock', 'dreamy drum and bass', 'egyptian flamenco', 'griot shoegaze', 'saxophone opera', 'acoustic afropiano', 'afro trap', 'alt-pop afropiano', 'arabic 16-bit', 'arabic african folk', 'hindi alt-country', 'mandarin drum and bass', 'urdu acid jazz', 'hyphy alternative r&amp;b', 'bengali swamp blues', 'cabaret', 'chillwave swing', 'country jazz', 'klezmer', 'new jack swing', 'pop g-funk', 'raga egyptian', 'soulful chillsynth', 'dark alt-pop', 'dreamy dembow', 'egyptian', 'griot reggae', 'saxophone gnawa', 'acoustic acid rock', 'afro house rock', 'alt-country surf rock', 'appalachian folk flamenco', 'liverpool big band', 'hindi afrobeat', 'mandarin disco', 'spanish samba', 'hyphy', 'bengali surf rock', 'bubblegum dance chanson', 'chillwave samba', 'country afro-cuban jazz', 'kawaii future bass polka', 'motown', 'pop bossa nova', 'raga edm', 'soulful cabaret', 'dark acid jazz', 'dreamy chillwave', 'edm swamp blues', 'griot indie', 'saxophone g-funk', 'acid trance', 'afro house drill and bass', 'alt-country dubstep', 'appalachian folk cloud rap', 'dance drill', 'hindi african folk', 'mandarin delta blues', 'spanish pop', 'hyper-southern rock', 'bengali surf', 'bubblegum dance', 'chillwave caribbean', 'country dancehall', 'kawaii future bass afropiano', 'metal grunge', 'pop', 'raga algorave', 'soulful bubblegum dance', 'dark acid house', 'dreamy bubblegum dance', 'edm jungle', 'griot', 'saxophone edm', 'acid techno psybient', 'afro house dembow', 'alt-country disco', 'appalachian folk anti-folk', 'illbient egyptian', 'hindi acoustic rock', 'mandarin cumbia', 'spanish merengue', 'hyper-motown', 'bengali psybient', 'bubblegum bass grime', 'chillwave egyptian', 'coptic grunge', 'kawaii future bass afro-cuban jazz', 'merengue', 'polka emo', 'raga acid breaks', 'soulful boogie', 'dancepop breakbeat', 'dreamy boom bap', 'edm grime', 'grime tango', 'saxophone bossa nova', 'acid techno avant-garde jazz', 'afro house acoustic blues', 'alt-country 2-step', 'anti-folkwave', 'dubstep rock', 'hindi acid rock', 'mandarin american primitivism', 'spanish mariachi', 'hyper-jungle', 'bengali math rock', 'breakstep synthwave', 'chillwave bubblegum bass', 'coptic flamenco', 'kawaii future bass', 'math rock ambient noise wall', 'polka', 'raga', 'soulful acoustic texas blues', 'dancepop', 'dreamy afro-jazz', 'edm g-funk', 'grime synthpop', 'saxophone barbershop', 'acid techno', 'afro house', 'algorave psybient', 'anti-folk drumstep', 'tuareg', 'harpischord symphonic metal', 'mandarin afrobeat', 'spanish funk', 'hyper-indie', 'bengali grunge', 'bubblegum bass', 'chillsynth mento', 'coptic afro-rock', 'saxophone alt-country', 'k-pop acoustic texas blues', 'math rock', 'piano klezmer', 'r&amp;b gospel', 'soulful acid trance', 'dancehall synthwave', 'dreamy acoustic rock', 'edm disco', 'grime surf rock', 'acid rock p-funk', 'afrikaner folk tango', 'algorave hawaiian', 'anti-folk big band', 'electro-classical', 'harpischord gospel', 'mandarin acid trance', 'spanish ambient trance', 'hyper-grime', 'bengali electropop', 'breakstep samba', 'chillsynth', 'coptic', 'saxophone 2-step', 'k-pop', 'mariachi', 'piano country', 'punk polka', 'soulful acid house', 'dancehall new wave', 'dreamy acid house', 'edm breakbeat', 'grime reggaeton', 'acid rock city pop', 'afrikaner folk pacific reggae', 'algorave garage', 'anti-folk', 'urdu shoegaze', 'future egyptian', 'korean fife and drum blues', 'spanish acoustic rock', 'hyper-egyptian', 'bengali egyptian', 'breakbeatwave', 'chillstep chillwave', 'cloud rap symphonic metal', 'samba soul', 'jungle ambient noise wall', 'lo-fi trap', 'piano chillstep', 'punk electropop', 'soul dembow', 'dancehall flamenco', 'dream pop g-funk', 'edm anti-folk', 'grime reggae', 'acid jazz crunk', 'afrikaner folk drill', 'algorave acid jazz', 'americana soul', 'havana glitch hop', 'future chillwave', 'korean opera', 'russian techno', 'hyper-dance', 'bengali drill', 'breakbeat trance', 'chillstep', 'cloud rap slushwave', 'samba dirty south', 'jungle afrobeat', 'lo-fi synthpop', 'piano cape verdean', 'punk acid trance', 'soul', 'dancehall country', 'dream pop appalachian folk', 'edm', 'grime norteño', 'acid house boom bap', 'afrikaner folk', 'algorave', 'americana jungle', 'havana funk', 'french ska', 'korean drumstep', 'russian samba', 'hyper-crunk', 'bengali cape verdean', 'breakbeat coptic', 'chanson soul', 'cloud rap', 'samba country', 'jungle', 'lo-fi roots reggae', 'piano caribbean', 'psychedelic swing', 'slushwave new jack swing', 'dancehall city pop', 'dream pop', 'dubstepcore', 'grime calypso', 'acid house', 'african folk math rock', 'afroswing new wave', 'american primitivism illbient', 'havana electropop', 'french shoegaze', 'korean cabaret', 'russian salsa', 'hyper-blues rock', 'bengali barbershop', 'breakbeat balkan brass band', 'chanson funk', 'classicalwave', 'samba boom bap', 'jazz soul', 'lo-fi pacific reggae', 'piano afroswing', 'psychedelic psybient', 'slushwave dancehall', 'dancehall acoustic texas blues', 'doo-wop pop', 'dubstep samba', 'grime avant-garde jazz', 'acid breaks alt-country', 'african folk drill', 'afroswing k-pop', 'american primitivism bedroom pop', 'havana chillstep', 'french samba', 'korean americana', 'russian roots reggae', 'hyper-afrobeat', 'bengali american primitivism', 'bossa nova merengue', 'chanson alt-pop', 'classical surf', 'samba bachata', 'jazz sertanejo', 'lo-fi cloud rap', 'piano afro-rock', 'psychedelic motown', 'slushwave chillstep', 'dancehall', 'doo-wop drumstep', 'dubstep kawaii future bass', 'grime 2-step', 'havana cajun', 'accordion tango', 'african folk', 'afroswing', 'american primitivism 2-step', 'french psybient', 'korean algorave', 'russian k-pop', 'hyper-acid house', 'slushwave acid house', 'bengali afroswing', 'bossa nova', 'chanson', 'classical grime', 'samba afropiano', 'jazz future bass', 'lo-fi bubblegum bass', 'piano african folk', 'psychedelic house', 'dancecore', 'doo-wop classical', 'dubstep', 'grime', 'havana bubblegum bass', 'accordion rap', 'acoustic texas blues chillstep', 'afropiano blues rock', 'ambient trance mento', 'french grunge', 'korean afrobeat', 'russian grunge', 'hyper-2-step', 'ska liquid drum and bass', 'bengali acoustic chicago blues', 'boom bap p-funk', 'celtic tango', 'classical folk', 'samba', 'jazz', 'lo-fi ambient dub', 'pacific reggae ska', 'psychedelic hawaiian', 'dance southern rock', 'disco cloud rap', 'drumstep chillsynth', 'gospelwave', 'havana bedroom pop', 'accordion jungle', 'acoustic texas blues afrobeat', 'afropiano', 'ambient trance jungle', 'french glitch hop', 'korean afro-funk', 'russian grime', 'house symphonic metal', 'ska coptic', 'bedroom pop ska', 'boom bap celtic', 'celtic cloud rap', 'classical dirty south', 'salsa polka', 'j-pop chillsynth', 'lo-fi afro-cuban jazz', 'pacific reggae samba', 'psychedelic dream pop', 'dance illbient', 'disco classical', 'drum and bass swing', 'gospel shoegaze', 'havana 2-step', 'accordion hawaiian', 'acoustic texas blues', 'afrobeat swing', 'ambient trance folk', 'french dubstep', 'korean acid trance', 'russian glitch hop', 'house reggae', 'ska', 'bedroom pop samba', 'boogie celtic', 'celtic', 'classical caribbean', 'salsa', 'j-pop blues', 'lo-fi afro house', 'pacific reggae afrobeat', 'psychedelic cabaret', 'dance', 'disco chillsynth', 'drum and bass goa trance', 'gospel dream pop', 'havana american primitivism', 'accordion drill', 'acoustic slushwave', 'afrobeat rockabilly', 'ambient trance chanson', 'french dembow', 'japanese swing', 'russian flamenco', 'hip hop dubstep', 'sitar southern rock', 'bedroom pop new jack swing', 'boogie caribbean', 'carnatic glitch hop', 'classical boom bap', 'rumbawave', 'j-pop acid jazz', 'liquid drum and bass slushwave', 'p-funk samba', 'psychedelic acid trance', 'dakar raga', 'disco chillstep', 'drum and bass acoustic rock', 'gospel disco', 'harpischord klezmer', 'accordion delta blues', 'acoustic rockabilly', 'afrobeat new jack swing', 'ambient trance alternative rock', 'french big band', 'japanese surf rock', 'russian dubstep', 'hip hop techno', 'sitar sertanejo', 'bedroom pop', 'boogie', 'carnatic acid trance', 'classical', 'rumba cape verdean', 'j-pop acid breaks', 'liquid drum and bass rockabilly', 'p-funk mariachi', 'psybient new wave', 'rumba', 'dakar new wave', 'disco alternative r&amp;b', 'drill sertanejo', 'gospel acid breaks', 'harpischord hip hop', 'accordion ambient techno', 'acoustic rock chillsynth', 'afrobeat griot', 'ambient techno mento', 'french afro-rock', 'japanese surf', 'russian celtic', 'hip hop', 'sitar rumba', 'barbershop breakbeat', 'blues rock american primitivism', 'carnatic', 'city pop symphonic metal', 'indie grunge', 'liquid drum and bass new jack swing', 'p-funk jazz', 'psybient griot', 'roots reggae house', 'dakar math rock', 'dirty south boom bap', 'drill raga', 'goa trance afro-cuban jazz', 'harpischord g-funk', 'accordion afro trap', 'acoustic rock afro-jazz', 'afrobeat garage', 'ambient techno hyphy', 'fife and drum blues p-funk', 'japanese shoegaze', 'russian cumbia', 'hawaiian r&amp;b', 'sitar goa trance', 'barbershop balkan brass band', 'blues rock afropiano', 'caribbean', 'city pop psybient', 'dakar j-pop', 'indie g-funk', 'liquid drum and bass blues', 'p-funk cloud rap', 'prog swamp blues', 'roots reggae flamenco', 'dirty south balkan brass band', 'drill chillwave', 'goa trance', 'harpischord drill', 'sitar drum and bass', 'accordion african folk', 'acoustic rock', 'afrobeat disco', 'ambient techno chanson', 'sitar delta blues', 'flamenco hip hop', 'japanese merengue', 'russian appalachian folk', 'hawaiian merengue', 'sitar glitch hop', 'balkan brass band raga', 'blues rock', 'cape verdean acoustic rock', 'city pop classical', 'dakar house', 'indie', 'liquid drum and bass bluegrass', 'p-funk', 'prog shoegaze', 'roots reggae avant-garde jazz', 'house', 'dirty south', 'drill cajun', 'gnawawave', 'harpischord drill and bass', 'sitar fife and drum blues', 'house surf', 'accordion 16-bit', 'acoustic raga', 'afrobeat', 'ambient techno afroswing', 'sitar cumbia', 'fife and drum blues acid breaks', 'japanese jungle', 'russian ambient techno', 'hawaiian electropop', 'balkan brass band classical', 'blues folk', 'cape verdean', 'city pop breakbeat', 'dakar gospel', 'lo-fi swing', 'illbientwave', 'liquid drum and bass', 'norteñowave', 'prog rockabilly', 'rockabilly tango', 'swamp blues r&amp;b', 'dembow punk', 'drill bubblegum dance', 'gnawa funk', 'harpischord doo-wop', 'swamp blues boogie', '2-step surf', 'acoustic grime', 'afro-rock bachata', 'ambient techno', 'sitar cape verdean', 'swamp blues', 'electropop grunge', 'japanese dancehall', 'russian afrikaner folk', 'havana trap', 'sitar bubblegum dance', 'bachata', 'blues cumbia', 'calypso surf', 'choral reggae', 'dakar future bass', 'swing grime', 'reggae k-pop', 'illbient cumbia', 'koto tuareg', 'norteño pop', 'prog dubstep', 'rockabilly raga', 'swing bedroom pop', 'house roots reggae', 'dembow balkan brass band', 'drill breakbeat', 'gnawa bubblegum bass', 'harpischord boogie', 'trap g-funk', '2-step country', 'acoustic funk', 'afro-rock ambient dub', 'ambient noise wall chanson', 'surfwave', 'swing', 'electronic math rock', 'japanese chanson', 'portuguese surf rock', 'havana techno', 'sitar bubblegum bass', 'avant-garde jazz rap', 'blues afro house', 'calypso opera', 'choral folk', 'dakar flamenco', 'swing samba', 'illbient alternative rock', 'koto trap', 'new wave acid trance', 'prog drum and bass', 'rockabilly country', 'dembow', 'drill and bass gnawa', 'gnawa afrobeat', 'harpischord anti-folk', 'sitar bossa nova', 'trap', '2-step', 'acoustic electropop', 'afro-rock', 'ambient house p-funk', 'surf slushwave', 'swing sertanejo', 'electronic grunge', 'japanese boogie', 'portuguese southern rock', 'havana synthwave', 'swing roots reggae', 'avant-garde jazz illbient', 'bluegrass rock', 'calypso bachata', 'choral drill and bass', 'dakar drumstep', 'illbient afrikaner folk', 'koto swing', 'new wave', 'prog dream pop', 'rockabilly', 'surf rock boogie', 'trap k-pop', 'dark salsa', 'drill and bass balkan brass band', 'gnawa', 'harpischord ambient house', 'sitar blues', 'trance', '16-bit roots reggae', 'acoustic classical', 'afro-jazz drill', 'ambient house electropop', 'symphonic bluegrass', 'electronic disco', 'japanese americana', 'portuguese dancehall', 'havana grime', 'symphonic algorave', 'avant-garde jazz griot', 'bluegrass punk', 'calypso afroswing', 'choral country', 'dakar boom bap', 'tango', 'illbient', 'koto surf', 'new orleans trance', 'prog disco', 'rock liquid drum and bass', 'surf rock', 'synthpop', 'dark reggaeton', 'drill', 'glitch hop swing', 'harpischord acid jazz', 'sitar alternative r&amp;b', 'synthpop coptic', '16-bit celtic', 'acoustic chicago blues reggaeton', 'afro-jazz carnatic', 'ambient house cajun', 'symphonic afro-cuban jazz', 'electro-techno', 'japanese ambient house', 'portuguese chillsynth', 'french acoustic chicago blues', 'avant-garde jazz', 'bluegrass k-pop', 'cajun synthpop', 'choral chillsynth', 'dakar ambient dub', 'tabla jazz', 'hypnagogic swamp blues', 'koto polka', 'new orleans samba', 'prog breakbeat', 'rock dance', 'surf raga', 'dark merengue', 'dreamy trance', 'glitch hop acoustic texas blues', 'grunge new jack swing', 'sitar afro-jazz', '16-bit', 'acoustic chicago blues motown', 'afro-jazz blues rock', 'ambient house breakstep', 'tabla hawaiian', 'electro-new wave', 'japanese algorave', 'portuguese chillstep', 'funk bedroom pop', 'surf grunge', 'tango boogie', 'avant-garde jazz disco', 'bluegrass bubblegum bass', 'cajun new wave', 'choral chanson', 'dakar afrobeat', 'hypnagogic shoegaze', 'koto house', 'new orleans house', 'prog big band', 'rock balkan brass band', 'synthpop hawaiian', 'dark jazz', 'dreamy tango', 'glitch hop 2-step', 'grunge funk', 'rock americana', 'sitar afro-funk', 'synthwave trance'].sort((a, b) => a.localeCompare(b));

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