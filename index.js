import Webamp from "webamp"; // eslint-disable-line import/no-unresolved
// This import gives us a URL to llama.mp3
import virgil from "https://on.soundcloud.com/d9htMZBEm9h9BWzQ7";
import internetArchiveSkin from "./internetArchive.wsz";
import topazSkin from "./TopazAmp1-2.wsz";

if (!Webamp.browserIsSupported()) {
  alert("Oh no! Webamp does not work in this browser!");
  throw new Error("What's the point of anything?");
}

const webamp = new Webamp({
  initialTracks: [
    {
      metaData: {
        artist: "virgil",
        title: "telivised radio"
      },
      url: virgil,
      duration: 5.322286
    }
  ],
  availableSkins: [
    { url: internetArchiveSkin, name: "Internet Archive" },
    { url: topazSkin, name: "Topaz" }
  ]
});

// An example of handling the close button and giving a way to reopen WEebamp
webamp.onClose(() => {
  const open = document.createElement("button");
  open.innerText = "Reopen";
  document.getElementById("controls").appendChild(open);
  function handleClick() {
    webamp.reopen();
    open.remove();
    open.removeEventListener("click", handleClick);
  }
  open.addEventListener("click", handleClick);
});

// Example of adding a confirmation button before Webamp can be closed.
webamp.onWillClose((cancel) => {
  if (!window.confirm("Are you sure you want to close Webamp?")) {
    cancel();
  }
});

// An example of adding external ways to control Webamp's behavior.
const buttonBindings = [
  { id: "prev", cb: () => webamp.previousTrack() },
  { id: "play", cb: () => webamp.play() },
  { id: "pause", cb: () => webamp.pause() },
  { id: "stop", cb: () => webamp.stop() },
  { id: "next", cb: () => webamp.nextTrack() },
  { id: "close", cb: () => webamp.close() }
];
buttonBindings.forEach(({ id, cb }) => {
  document.getElementById(id).addEventListener("click", cb);
});

// An example of shoing the currently playing track
webamp.onTrackDidChange((trackInfo) => {
  const { artist, title } = trackInfo.metaData;
  // Another option might be to set `document.title`;
  document.getElementById(
    "current-track"
  ).innerText = `Now playing: ${title} by ${artist}`;
});

// Here we go! Let's show Webamp.
webamp.renderWhenReady(document.getElementById("app"));