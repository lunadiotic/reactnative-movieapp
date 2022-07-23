/* eslint-disable */
import React from 'react';
import {Text} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const Video = () => {
  return (
    <VideoPlayer
      source={{
        uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      }}
      controlTimeout={1000}
      tapAnywhereToPause={true}
      onBack={() => {
        onClose();
      }}
      onEnd={() => onClose()}
    />
  );
};

export default Video;
