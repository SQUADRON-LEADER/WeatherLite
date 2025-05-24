import { useState, useEffect } from 'react';
import SearchBox from './Searchbox';
import InfoBox from './infobox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './weatherapp.css';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelslike: 24.84,
        temp: 25.05,
        temp_min: 24.84,
        temp_max: 25.05,
        humidity: 47,
        weather: "haze"
    });
    
    const [fadeIn, setFadeIn] = useState(false);
    
    useEffect(() => {
        // Add animation class after initial render
        setFadeIn(true);
    }, []);
    
    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };
    
    return (
        <Container className={`weather-app ${fadeIn ? 'fade-in' : ''}`} maxWidth={false} disableGutters>
            <Box 
                sx={{
                    textAlign: 'center',
                    pt: 4,
                    pb: 2,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box 
                    sx={{
                        position: 'absolute',
                        top: -40,
                        left: -40,
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,193,7,0.2) 0%, rgba(255,193,7,0) 70%)',
                        animation: 'pulse 4s infinite'
                    }}
                />
                
                <Typography 
                    variant="h2" 
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        color: 'white',
                        textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: '"Montserrat", sans-serif'
                    }}
                >
                    <WbSunnyIcon sx={{ mr: 1, fontSize: 40, color: '#FFC107' }} />
                    WEATHER APP
                </Typography>
                
                <Typography 
                    variant="h6" 
                    sx={{
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.9)',
                        mb: 4,
                        maxWidth: '600px',
                        mx: 'auto',
                        px: 2
                    }}
                >
                    Get real-time weather updates for any city around the world
                </Typography>
            </Box>
            
            <Box className="content-container">
                <SearchBox updateInfo={updateInfo}/>
                <InfoBox info={weatherInfo}/>
            </Box>
            
            <Box 
                sx={{
                    textAlign: 'center',
                    mt: 4,
                    pb: 2,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem'
                }}
            >
                © {new Date().getFullYear()} Weather App | Powered by Aayush❤️
            </Box>
        </Container>
    );
}