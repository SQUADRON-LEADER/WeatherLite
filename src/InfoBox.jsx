import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from '@mui/icons-material/Cloud';
import './InfoBox.css';
import PropTypes from 'prop-types';

export default function InfoBox({ info }) {
    const INIT_URL="https://images.unsplash.com/photo-1662377824580-a540e7728635?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHVzdCUyMHN0b3JtfGVufDB8fDB8fHww";
    const HOT_URL="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const COLD_URL="https://images.unsplash.com/photo-1486284847143-bfb9308a3f17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D";
    const RAIN_URL="https://images.unsplash.com/photo-1509635022432-0220ac12960b?q=80&w=1708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
    // Function to determine which weather icon to display
    const getWeatherIcon = () => {
        if (info.humidity > 80) {
            return <ThunderstormIcon sx={{ fontSize: 60, color: '#2196f3' }} />;
        } else if (info.temp > 30) {
            return <WbSunnyIcon sx={{ fontSize: 60, color: 'orange' }} />;
        } else if (info.temp < 10) {
            return <AcUnitIcon sx={{ fontSize: 60, color: '#80deea' }} />;
        } else {
            return <CloudIcon sx={{ fontSize: 60, color: '#90a4ae' }} />;
        }
    };

    return (
        <div className="InfoBox">
            <Card sx={{ 
                maxWidth: 420, 
                width: '100%',
                margin: '0 auto', 
                borderRadius: 4, 
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                transform: 'translateY(0)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 30px 0 rgba(31, 38, 135, 0.5)',
                }
            }}>
                <CardMedia
                    component="img"
                    alt="Weather condition image"
                    height="220"
                    image={info.humidity>80 ? RAIN_URL :
                        info.temp > 30 ? HOT_URL :
                        info.temp < 10 ? COLD_URL : INIT_URL}
                    sx={{ 
                        filter: 'contrast(1.1) brightness(1.1)',
                        objectPosition: 'center 25%' 
                    }}
                />
                <Box sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                    padding: '16px'
                }}>
                    <Typography variant="h4" component="div" sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: 'white',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                    }}>
                        <LocationOnIcon sx={{ mr: 1 }} />
                        {info.city}
                    </Typography>
                </Box>
                
                <CardContent sx={{ padding: '24px' }}>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mb: 2
                    }}>
                        {getWeatherIcon()}
                        <Typography variant="h5" sx={{ 
                            ml: 1.5, 
                            textTransform: 'capitalize', 
                            color: 'primary.dark',
                            fontWeight: 500
                        }}>
                            {info.description || info.weather}
                        </Typography>
                    </Box>
                    
                    <Typography variant="h2" sx={{ 
                        fontWeight: 700, 
                        mb: 3, 
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #1976d2, #4fc3f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {info.temp}°C
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                padding: '8px 12px',
                                borderRadius: '12px',
                                background: 'rgba(255, 152, 0, 0.1)',
                            }}>
                                <ThermostatIcon sx={{ mr: 1, color: 'orange' }} />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    Feels like: {info.feelslike}°C
                                </Typography>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={6}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                padding: '8px 12px',
                                borderRadius: '12px',
                                background: 'rgba(33, 150, 243, 0.1)',
                            }}>
                                <OpacityIcon sx={{ mr: 1, color: '#1976d2' }} />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    Humidity: {info.humidity}%
                                </Typography>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={6}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                padding: '8px 12px',
                                borderRadius: '12px',
                                background: 'rgba(3, 169, 244, 0.1)',
                            }}>
                                <AirIcon sx={{ mr: 1, color: '#03a9f4' }} />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    Wind: {info.wind || '5.14'} m/s
                                </Typography>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={6}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                padding: '8px 12px',
                                borderRadius: '12px',
                                background: 'rgba(255, 193, 7, 0.1)',
                            }}>
                                <WbSunnyIcon sx={{ mr: 1, color: '#ffc107' }} />
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    Min/Max: {info.temp_min}°/{info.temp_max}°
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

InfoBox.propTypes = {
    info: PropTypes.shape({
        city: PropTypes.string.isRequired,
        weather: PropTypes.string.isRequired,
        description: PropTypes.string, // Added description prop validation
        temp: PropTypes.number.isRequired,
        feelslike: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
        temp_min: PropTypes.number.isRequired,
        temp_max: PropTypes.number.isRequired,
        wind: PropTypes.number, // Added wind prop validation
    }).isRequired,
};

