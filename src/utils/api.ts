import axios from 'axios';

const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const API_KEY = 'AIzaSyDfn_rIPJM2w9JqCqSrIRH02CVzLrbPgUU';

export const fetchCoffeeShops = async (latitude: number, longitude: number, radius: number) => {
    try {
        const response = await axios.get(GOOGLE_PLACES_API, {
            params: {
                location: `${latitude},${longitude}`,
                radius,
                type: 'cafe',
                key: API_KEY,
            },
        });

        return response.data.results.map((place: any) => ({
            id: place.place_id,
            name: place.name,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
        }));
    } catch (error) {
        console.error('Error fetching coffee shops:', error);
        return [];
    }
};