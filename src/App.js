import React, {useState, useRef} from 'react';

// Ajout des styles
import './style/App.scss'

// Ajout des composants
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'

// Ajout utils
import data from './data'


function App() {

  

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  // Calculate Percentage

  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent / roundedDuration) * 100)
  console.log(animation)
  setSongInfo({...songInfo, currentTime: current, duration: duration, animationPercentage: animation})
};

      // Ref
      const audioRef = useRef(null);


  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
})

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        if (isPlaying) audioRef.current.play();
    
  }
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
     <Song currentSong={currentSong} />
     <Player 
      audioRef = {audioRef}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      currentSong={currentSong}
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs} />

      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef}/>

      <audio 
    onLoadedMetadata={timeUpdateHandler} 
    onTimeUpdate={timeUpdateHandler} 
    ref={audioRef} 
    src={currentSong.audio}
    onEnded={songEndHandler}>

    </audio>

    </div>
  );
}

export default App;
