
    async function getsongs() {
        const url = "https://motahir76270.github.io/music-player-fun12/" || "https://spotify-b8c9.onrender.com/"
        let a = await fetch(`${url}/mp3Songs/`);
        console.log(a);
        let response = await a.text();
        
        
        console.log(response);
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName('a');
        console.log(as);


        let song = [];
        for(let i=0; i<as.length; i++){
            const element = as[i];
            if(element.href.endsWith(".mp3") ){
            song.push(element.href.split("mp3Songs/")[1] );
            }
        }
        return song;
    }

    function SecondsToMinutes(seconds) {
        // Check if the input is a valid number
        if (seconds < 0 || isNaN(seconds)) {
            return 'Invalid input';  // Handle invalid input
        }
    
        // Ensure seconds is a positive number
        seconds = Math.max(0, seconds);
    
        // Calculate minutes and seconds
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = Math.floor(seconds % 60) ;
    
        // Format minutes and seconds with leading zeros if needed
        let formattedMinutes = String(minutes).padStart(2, '0');
        let formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        // Return the formatted string in "MM:SS" format
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    



    var curntsong = new Audio();
    //Function to play music
    const playmusic = (track) => {
    //let curntsong = new Audio();
    curntsong.src = `mp3Songs/${track}`;  
    curntsong.play()
        play.src = "./svg/pause.svg";
      document.querySelector('.songinfo').innerHTML = track;
      document.querySelector('.songtime').innerHTML = "00:00 / 00:00";

    }


    async function main(){

        let songs = await getsongs();
        console.log(songs);
        
        let musicURL = document.querySelector(".musicplay-list").getElementsByTagName("ul")[0] ;
        for ( const song of songs ){
            musicURL.innerHTML =  musicURL.innerHTML + `<li>
                    <img src="./svg/music.svg" alt="">
                                <div class="info">
                                    <div id="songname"> ${song.replaceAll("%20", " ").replace(" (PagalWorld.com.sb)","")}  
                                    </div>
                                    <div> Tahir khan </div>
                                </div>
                                <span style="margin-top: 12px;">Play Now</span>
                                <img src="./svg/playnow.svg" class="playbar-btn" alt="">
                                    </li>` ;
        } 


    // Attach event listener to each song
    Array.from(document.querySelector(".musicplay-list").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML ) ;
            
        const songname = e.querySelector(".info").firstElementChild.innerHTML.trim();  

        playmusic(songname)
    
        //trim can remove spaces
        });    
        
    });  
     
    } 
      
    //change playnow or pause svgs by clicking
    var play = document.querySelector("#playbar-btn");
    play.addEventListener("click", () => {
        console.log("clicked")
    if(curntsong.pause() ) {
     curntsong.play();
        play.src = "./svg/pause.svg";
    }
    if( curntsong.play()) {
     curntsong.pause();
        play.src = "./svg/playnow.svg";
    }
    });

    curntsong.addEventListener("timeupdate", () => {
        const currentTime = curntsong.currentTime;
        const duration = curntsong.duration;
        document.querySelector(".songtime").innerHTML = `${SecondsToMinutes(currentTime)}/${SecondsToMinutes(duration)}`
        document.querySelector(".circle").style.left = (currentTime)/(duration) * 100 + "%"
    });

    //add event listner for seekbar change
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        curntsong.currentTime = ((curntsong.duration) * percent) / 100
    })
     
    //add event listeners for close btn
    document.querySelector("#menu-btn").addEventListener("click", () => {
        document.querySelector(".left-border").style.left = "365px" ;
        document.querySelector("#menu-btn").display = "none" ;
    
    });
     //add event listeners for menu btn
     document.querySelector("#close-btn").addEventListener("click", () => {
        document.querySelector(".left-border").style.left = "0" ; 
    });

    //add event listeners for dark mode

     let darkmode = document.querySelector("#dark-mode");
     darkmode.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme")
       if(document.body.classList.contains("dark-theme")){
           darkmode.src ="./svg/darkmode.svg";
       }else{
           darkmode.src ="./svg/lightmode.svg";
       }
     });




    main()



