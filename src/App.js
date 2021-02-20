import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js"
function App() {
  const [src, setSrc] = useState()
  const videoRef = useRef()
  useEffect(()=> {
    fetch("https://cyclic-alpine-mapusaurus.glitch.me", {method: "GET"}).then((res) => {
      return res.json()
    }).then((res) => setSrc(res.url))
  }, [])

  useEffect(()=> {
    if(src) {
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        videoRef.current.controls = true
      }
      else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
      }
    }
  }, [src])
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "yellow",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box"
      }}
    >
      <video ref={videoRef} style={{width: "100%", maxHeight: "95vh"}} ></video>
    </div>
  );
}

export default App;
