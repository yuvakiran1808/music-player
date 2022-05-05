import React from "react";
const Librarysong = ({song,songs,setCurrentSong,id,audioRef,isPlaying,setSongs})=>{
    const songSelectHandler = async ()=>{
        const selectedSong = songs.filter((state)=>state.id===id);
       await setCurrentSong(selectedSong[0]);
        const newSongs = songs.map((song)=>{
            if(song.id===id)
            {
                return{
                    ...song,
                    active:true,
                }
            }
            else{
                return{
                    ...song,
                    active:false, 
                }
            }
            
        })
        setSongs(newSongs);
        //check if the song is playing
        if(isPlaying) audioRef.current.play();
    }
    return(
   <div className={`library-song ${song.active ?'selected':""}`}>
       <img alt = "" src={song.cover}></img>
       <div onClick={songSelectHandler} className="song-description">
       <h3>{song.name}</h3>
       <h4>{song.artist}</h4>
       </div>
   </div>
    );
}
export default Librarysong; 