import React from "react";

const CategoryVideo = () => {
  return (
    <div className="CategoryVideo p-0">
      <div className="container-fluid  m-0 p-0">
        <div className="row m-0 p-0 g-0 videoCategoryTag ">
          <video muted loop autoPlay>
            <source
              src="https://buyer-video-in.urbanic.com/eva/bde11c2193a7416286f0a2d493c39306.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default CategoryVideo;