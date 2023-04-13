const clientId = "817d09fd5d5841e4af8af3d1cf693854";
const clientSecret = "5d97563f993a4035be0534fc88afb860";
let i = 0;
let j = 0;
let arr = [];
let artists = [
  "7qjJw7ZM2ekDSahLXPjIlN",
  "1mYsTxnqsietFxj1OgoGbG",
  "4IKVDbCSBTxBeAsMKjAuTs",
];
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  const accessToken = data.access_token;
  artists.map(m => {
    fetch(`https://api.spotify.com/v1/artists/${m}/top-tracks?market=US`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        let a = response.json();
        return a;
      })
      .then(data => {
        data.tracks.map(data2 => {
          arr.push(data2.preview_url);
          let img = document.getElementsByClassName("img")[0];
          img.innerHTML += `<figure id=${j} class="jsfig"> <img src="${data2.album.images[0].url}"> <br> <audio id="audio"  src='${data2.preview_url}' controls></audio></figure> `;
          j++;
          let imgArray = document.getElementsByTagName("figure");
          let ArrImg = Array.from(imgArray);
          ArrImg.map(b => {
            let aa = document.getElementsByClassName("songs")[0];
            let urlAudio = b.children[2].getAttribute("src");
            b.addEventListener("click", e => {
              j = b.getAttribute("id");
              let xx = document.getElementById("playingImg");
              let yy = b.firstElementChild.getAttribute("src");
              xx.innerHTML = `<img class=${j} id="bottomimg" src="${yy}" alt="" />`;
              document.getElementById("play-section").style.display = "block";
              btn3.style.display = "none";
              btn6.style.display = "block";
              aa.innerHTML = `<audio id="dis-audio" src='${urlAudio}'autoplay></audio>`;
            });
          });
        });
      });
  });
};
getToken();
let btn3 = document.getElementsByClassName("button-3")[0];
let btn6 = document.getElementsByClassName("button-6")[0];
let btn1 = document.getElementsByClassName("button-1")[0];
let btn2 = document.getElementsByClassName("button-2")[0];
let btn4 = document.getElementsByClassName("button-4")[0];
let btn5 = document.getElementsByClassName("button-5")[0];
btn3.addEventListener("click", () => {
  btn3.style.display = "none";
  btn6.style.display = "block";
  document.getElementById("dis-audio").play();
});
btn6.addEventListener("click", () => {
  btn6.style.display = "none";
  btn3.style.display = "block";
  document.getElementById("dis-audio").pause();
});
btn4.addEventListener("click", () => {
  let bb = document.getElementsByClassName("songs")[0];
  if (j < arr.length - 1) {
    j++;
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
    btn3.style.display = "none";
    btn6.style.display = "block";
  } else {
    j = 0;
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
  }
});
btn2.addEventListener("click", () => {
  let bb = document.getElementsByClassName("songs")[0];
  if (j > 0) {
    j--;
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
    btn3.style.display = "none";
    btn6.style.display = "block";
  } else {
    j = arr.length - 1;
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
  }
});
btn1.addEventListener("click", () => {
  let bb = document.getElementsByClassName("songs")[0];

  if (j > 0 && j < arr.length) {
    j = Math.floor(Math.random() * 9 + 1);
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
    btn3.style.display = "none";
    btn6.style.display = "block";
  } else {
    j = 0;
    bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
  }
});
btn5.addEventListener("click", () => {
  btn3.style.display = "none";
  btn6.style.display = "block";
  setInterval(e => {
    let bb = document.getElementsByClassName("songs")[0];
    if (j > 0 && j < arr.length) {
      bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
    } else {
      j = 0;
      bb.innerHTML = `<audio id="dis-audio" src='${arr[j]}'autoplay></audio>`;
    }
  }, 29000);
});
