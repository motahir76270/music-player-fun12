
let curntsong = new Audio();

async function getsongs() {
    let a = await fetch("http://127.0.0.1:5501/mp3Songs/");
    let response = await a.text();

    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    console.log(as);

    let songs = [];
    for(let i=0; i<as.length; i++){
        const element = as[i];
        if(element.href.endsWith(".mp3") ){
            songs.push(element.href.split("mp3Songs/")[1] );
        }
    }
    return songs;
}

// Function to play music
const playmusic = (track) => {
    curntsong.src = "/mp3Songs/" + track;
    curntsong.play();
}

async function main() {
    let songs = await getsongs();
    console.log(songs);

    let musicURL = document.querySelector(".musicplay-list").getElementsByTagName("ul")[0];
    for (const song of songs) {
        musicURL.innerHTML += `<li>
                  <img src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ").replaceAll("(PagalWorld.com.sb)", " ")}</div>
                                <div>Tahir khan</div>
                            </div>
                            <span style="margin-top: 12px;">Play Now</span>
                            <img src="playnow.svg" alt="">
                                 </li>`;
    }

    // Attach event listener to each song
    Array.from(document.querySelector(".musicplay-list").getElementsByTagName("li") ).forEach(e => {
        e.addEventListener("click", () => {
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            //trim can remove spaces
        });
        console.log(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
}

main();
