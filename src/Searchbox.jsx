import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import "./Searchbox.css";

export default function Searchbox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [loading, setLoading] = useState(false);
    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY= "61bba4db3dcd5048775e72ed8e213004";
    
    let getWeatherInfo = async () => {
        try {
            setLoading(true);
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
            let data = await response.json();
            
            if (data.cod !== 200) {
                console.error("API Error:", data.message);
                return null;
            }
            
            let result = {
                city: city,
                name: data.name,
                temp: Math.round(data.main.temp - 273.15),
                humidity: data.main.humidity,
                wind: data.wind.speed,
                description: data.weather[0].description,
                feelslike: Math.round(data.main.feels_like - 273.15),
                temp_min: Math.round(data.main.temp_min - 273.15),
                temp_max: Math.round(data.main.temp_max - 273.15),
            };
            return result;
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };
    
    let handleChange = (evt) => {
        setCity(evt.target.value);
    };
    
    let handleSubmit = async(evt) => {
        evt.preventDefault();
        let weatherData = await getWeatherInfo();
        if (weatherData) {
            updateInfo(weatherData);
        }
        setCity("");
    };
    
    return (
        <Paper 
            elevation={0}
            className='searchbox'
            sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                borderRadius: 4,
                padding: '24px',
                maxWidth: '450px',
                margin: '0 auto 24px auto',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0 10px 40px 0 rgba(31, 38, 135, 0.45)',
                }
            }}
        >
            <Typography 
                variant="h5" 
                component="h3" 
                gutterBottom
                sx={{ 
                    mb: 3, 
                    fontWeight: 600,
                    color: '#1976d2',
                    textAlign: 'center',
                    textShadow: '1px 1px 1px rgba(0,0,0,0.1)'
                }}
            >
                Search For Weather
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="city" 
                    label="Enter City Name" 
                    variant="outlined" 
                    required 
                    value={city} 
                    onChange={handleChange}
                    sx={{ 
                        mb: 3, 
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#1976d2',
                                }
                            }
                        }
                    }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        type='submit'
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                        sx={{ 
                            py: 1.2,
                            px: 3,
                            borderRadius: 2,
                            boxShadow: '0 4px 6px rgba(32, 101, 209, 0.2)',
                            background: 'linear-gradient(135deg, #2196f3, #1976d2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 6px 10px rgba(32, 101, 209, 0.3)',
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}

Searchbox.propTypes = {
    updateInfo: PropTypes.func.isRequired,
};