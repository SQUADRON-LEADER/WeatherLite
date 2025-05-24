import { useEffect, useRef } from 'react';
import WeatherApp from "./weatherapp";


function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt to play the video and log any errors
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Video playback error:", error);
        });
      }
    }
  }, []);

  return (
    <>
      <div className="video-background">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          onError={(e) => console.error("Video error:", e)}
        >
          <source src="/Weather/public/v.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-overlay"></div>
      <WeatherApp />
    </>
  )
}

export default App
