import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const TheaterMode = (props) => {
  const { setTheaterMode, videos, setVideos } = props
  const [videoInTheaterMode, setVideoInTheaterMode] = useState(null)

  useEffect(() => {
    setVideoInTheaterMode(videos.find(video => video.inTheater))
  }, [videos])

  return (

    <Paper style={{ width: '100%', height: '30vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'lightGray', position: "sticky", padding: "3em", boxSizing: "border-box", zIndex: "100", top: "4em" }}>
      <div >

        {videoInTheaterMode && (
          <>
            <video key={videoInTheaterMode.id} style={{ width: '100%', height: '27vw', display: 'flex', zIndex: "100", alignItems: "center", justifyContent: "center" }}
              crossOrigin="anonymous"
              controls={true}
            >
              <source src={videoInTheaterMode.url} />
            </video>
            <p>{videoInTheaterMode.name}</p>
          </>

        )}

      </div>
      <div style={{ position: "absolute", top: "0px", right: "0px", padding: "2em", boxSizing: "border-box" }}>
        <div style={{ paddingTop: "1em", boxSizing: "border-box", background: "none", cursor: "pointer" }} onClick={() => {
          const videoInTheaterMode = videos.find(video => video.inTheater)
          setVideos(prevVideos => {
            return prevVideos.map(video => {
              if (videoInTheaterMode.id === video.id) {
                return {
                  ...video,
                  inTheater: false
                }
              }
              return video
            })
          })
          setTheaterMode(false)
        }}><CancelOutlinedIcon fontSize="large" /></div>
      </div>
    </Paper>

  )
}

export default TheaterMode