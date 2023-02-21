import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ReactPlayerProps } from 'react-player';
import BaseReactPlayer from 'react-player/base';

const ReactPlayer = lazy(() => import(/* webpackChunkName: "react-player" */ 'react-player'))

interface VideoPlayerProps {
  playerRef: React.RefObject<BaseReactPlayer<ReactPlayerProps>>
  url?: string
  setIsVideoPlayerLoading: () => void
}

export const VidepPlayer: React.FC<VideoPlayerProps> = (props) => {

  const {
    playerRef, url, setIsVideoPlayerLoading,
  } = props;

    return (
      <Suspense fallback={<div>LOADING.........</div>}>
       
        <div style={{height:'75vh'}}>
            <ReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            onReady={() => {
                setIsVideoPlayerLoading();
            }}
            />
        </div>
      </Suspense>
    );
}