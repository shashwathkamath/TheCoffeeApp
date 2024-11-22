// components/CoffeeMap.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

interface CoffeeShop {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

const CoffeeMap = () => {
    const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    // Fetch coffee shops based on the map's region
    const fetchCoffeeShops = async (newRegion: Region) => {
        try {
            // Replace with your API endpoint or Google Places API
            const response = await axios.get('https://api.example.com/coffee-shops', {
                params: {
                    lat: newRegion.latitude,
                    lng: newRegion.longitude,
                    radius: newRegion.latitudeDelta * 111000, // Approximation in meters
                },
            });

            const shops = response.data.map((shop: any) => ({
                id: shop.id,
                name: shop.name,
                latitude: shop.geometry.location.lat,
                longitude: shop.geometry.location.lng,
            }));

            setCoffeeShops(shops);
        } catch (error) {
            console.error('Error fetching coffee shops:', error);
        }
    };

    // Handle map region change
    const onRegionChangeComplete = (newRegion: Region) => {
        setRegion(newRegion);
        fetchCoffeeShops(newRegion);
    };

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={onRegionChangeComplete} // Detect region changes
        >
            {coffeeShops.map((shop) => (
                <Marker
                    key={shop.id}
                    coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
                    title={shop.name}
                    pinColor="#6C4E25" // Dark Brown for coffee shops
                />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '50%', // Adjust map height as needed
    },
});

export default CoffeeMap;