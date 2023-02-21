import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useToggle } from 'react-use';
import { ReactPlayerProps } from 'react-player';
import BaseReactPlayer from 'react-player/base';
import { VidepPlayer } from './VidepPlayer';

function App() {
  const [isClicked, setIsClicked] = useToggle(false)
  const [isVideoPlayerLoading, setIsVideoPlayerLoading] = useToggle(true)
  // const [isPlayerLoaded, setPlayerIsLoae]
  const playerRef = useRef<BaseReactPlayer<ReactPlayerProps>>(null)
  const [timer, setTimer] = useState<number>(0);
  const ref = useRef<ReturnType<typeof setInterval> | undefined>();

  useEffect(() => {
    if(!isVideoPlayerLoading) {
      console.log('*player is loaded');
      clearInterval(ref.current)
    }
  },[isVideoPlayerLoading])

  const startTimer = () => {
    ref.current = setInterval(() => {
      setTimer((oldCount) => oldCount + 1);
    }, 1000)
}
  useEffect(() => {
      return () => clearInterval(ref.current)
  },[])

  const onClickButton = () => {
    setIsClicked(!isClicked);
    if (isVideoPlayerLoading) {
      startTimer();
    } else {
      setTimer(0)
      clearInterval(ref.current)
      setIsVideoPlayerLoading()
    }

  }

  const videoPlayerProps = {
    playerRef,
    url: 'https://www.youtube.com/watch?v=dTSbcI44QkA',
    setIsVideoPlayerLoading,
  }

  return (
    <div className="App">
    <div style={{backgroundColor:'black', padding:'10px'}}>
     <span style={{color:'yellow'}}>Time taken to load react-player </span>
    </div>
    <div style={{margin: '10px'}}>
      <button style={{padding:'10px'}} onClick = {onClickButton}>{`Click to ${isVideoPlayerLoading ? 'load' : 'unload'} video player`}</button>
    </div>
    <div style = {{marginBottom: '50px', marginTop:'10px'}}>
          <span style={{color: 'green'}}>Time it takes to laod the video player</span>{" "}
          <span style={{color: 'red', fontSize:'20px'}}>{timer}</span>{" "}
          <span style={{color: 'green'}}>secs</span>
    </div>

    {isClicked && isVideoPlayerLoading && <div>Player is Loading....</div>}

    {
      isClicked && (
      <div>
        <VidepPlayer {...videoPlayerProps}/>
      </div>)
    }
  </div>
  );
}

export default App;
