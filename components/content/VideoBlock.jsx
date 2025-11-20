import React from "react";

const VideoBlock = ({ src, type = "video/mp4", controls = true }) => {
  return (
    <video src={src} type={type} controls={controls} width="100%">
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBlock;
