 export const playAudio = (isPlaying,audioRef)=>{
    if(isPlaying) 
    {
       var playPromise = audioRef.current.play();
       if(playPromise!==undefined)
       {
         playPromise.then((audio)=>{
           audioRef.current.pause();
         })
         .catch(error =>{
            audioRef.current.play();
          });
       }
    }
}