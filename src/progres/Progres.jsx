/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import audio from "../util/audio";

export default function Progres(props) {
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (props.song.preview === audio.aud.src && seconds < 30) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      } else {
          clearInterval(intervalId);
          setSeconds(1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props.song.preview, seconds, audio.aud.src]);

  return (
    <div
      className="bg-info"
      style={{
        width: "100%",
        height: "25px",
        marginTop: "10px",
        borderRadius: "12px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          position: "absolute",
          left: `${(seconds * 100) / 15}px`,
          top: "5px",
          backgroundColor: "blue",
          transition: "all 0.3s ease",
        }}
      />
    </div>
  );
}
