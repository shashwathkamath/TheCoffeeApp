import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { fetchCoffeeShops } from '../utils/api'; // Import the fetch function

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
    const [isLoading, setIsLoading] = useState(false); // Loading state for fetching data

    // Fetch coffee shops whenever the region changes
    const fetchAndSetCoffeeShops = async (newRegion: Region) => {
        setIsLoading(true); // Show loader while fetching data
        try {
            const radius = newRegion.latitudeDelta * 111000; // Convert latDelta to meters
            const shops = await fetchCoffeeShops(newRegion.latitude, newRegion.longitude, radius);
            setCoffeeShops(shops); // Update coffee shop pins
        } catch (error) {
            console.error('Error fetching coffee shops:', error);
        } finally {
            setIsLoading(false); // Hide loader once fetching is complete
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        fetchAndSetCoffeeShops(region);
    }, [region]);

    return (
        <View style={{ flex: 1 }}>
            {isLoading && (
                <ActivityIndicator
                    style={styles.loader}
                    size="large"
                    color="#6C4E25" // Coffee-themed loader color
                />
            )}
            <MapView
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={(newRegion) => {
                    setRegion(newRegion); // Update the region
                    fetchAndSetCoffeeShops(newRegion); // Fetch data for the new region
                }}
            >
                {coffeeShops.map((shop) => (
                    <Marker
                        key={shop.id}
                        coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
                        title={shop.name}
                        pinColor="#6C4E25" // Coffee-themed pin color
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -20,
        marginLeft: -20,
        zIndex: 10, // Ensure the loader appears above the map
    },
});

export default CoffeeMap;