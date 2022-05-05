import React, { useState,useRef } from 'react';
//import styles
import './styles/app.scss';
//addding the components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from "./components/Nav";
//import data
import data from './data'; 
// import { playAudio } from './util';

function App() {
    //Ref
const audioRef = useRef(null);
  //state
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[1]);
  const [isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] =useState({
    CurrentTime : "",
    duration:"",

});
const [libraryStatus,setLibraryStatus] = useState(false);
const timeUpdateHandler = (e)=>{
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({...songInfo,CurrentTime : current,duration});
};
const songEndHandler =  ()=>{
  let currentIndex = songs.findIndex((song)=>song.id===currentSong.id);
  setCurrentSong(songs[(currentIndex+1)%songs.length]);
  
  if(isPlaying&&audioRef.paused) audioRef.current.play();
  
}; 
  return (

    <div className={`App ${libraryStatus? 'library-active' :""}`}>
      <Nav libraryStatus = {libraryStatus} setLibraryStatus = {setLibraryStatus} />
    <Song currentSong = {currentSong} />
    <Player audioRef = {audioRef} isPlaying = {isPlaying} setIsPlaying = {setIsPlaying} currentSong = {currentSong} songInfo = {songInfo} setSongInfo={setSongInfo} songs = {songs} setCurrentSong = {setCurrentSong}   setSongs = {setSongs} />
    <Library audioRef = {audioRef} songs ={songs} setCurrentSong = {setCurrentSong} isPlaying = {isPlaying} setSongs = {setSongs} libraryStatus = {libraryStatus}/>
    <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata = {timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded = {songEndHandler} ></audio>
    </div>
  );
}
export default App;
