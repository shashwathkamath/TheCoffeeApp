import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { fetchCoffeeShops } from '../utils/api'; // Replace with your API function

interface CoffeeShop {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    distance?: string;
    rating?: number;
    imageUrl?: string;
}

interface CoffeeMapProps {
    onUpdateCoffeeShops?: (shops: CoffeeShop[]) => void; // Optional function to pass updated coffee shops
}

const CoffeeMap: React.FC<CoffeeMapProps> = ({ onUpdateCoffeeShops = () => { } }) => {
    const [userRegion, setUserRegion] = useState<Region | null>(null); // User's location
    const [mapRegion, setMapRegion] = useState<Region | null>(null); // Map's visible region
    const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCurrentLocation = async () => {
        setIsLoading(true);
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.error('Location permission denied');
                    setIsLoading(false);
                    return;
                }
            }

            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const initialRegion: Region = {
                        latitude,
                        longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    };

                    setUserRegion(initialRegion); // Save user's location
                    setMapRegion(initialRegion); // Center the map at the user's location
                    fetchShopsForRegion(initialRegion);
                    setIsLoading(false);
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    setIsLoading(false);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } catch (error) {
            console.error('Error requesting location permission:', error);
            setIsLoading(false);
        }
    };

    const fetchShopsForRegion = async (region: Region) => {
        setIsLoading(true);
        try {
            const radius = region.latitudeDelta * 111000; // Convert latitudeDelta to meters
            const shops = await fetchCoffeeShops(region.latitude, region.longitude, radius);
            setCoffeeShops(shops); // Update local coffee shop state
            onUpdateCoffeeShops(shops); // Call the parent function
        } catch (error) {
            console.error('Error fetching coffee shops:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    if (isLoading || !mapRegion) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#6C4E25" />
            </View>
        );
    }

    return (
        <MapView
            style={styles.map}
            region={mapRegion} // Keep the map centered at the current region
            onRegionChangeComplete={(newRegion) => setMapRegion(newRegion)}
        >
            {userRegion && (
                <Marker
                    coordinate={{
                        latitude: userRegion.latitude,
                        longitude: userRegion.longitude,
                    }}
                    title="You are here"
                    pinColor="blue"
                />
            )}

            {coffeeShops.map((shop) => (
                <Marker
                    key={shop.id}
                    coordinate={{
                        latitude: shop.latitude,
                        longitude: shop.longitude,
                    }}
                    title={shop.name}
                    pinColor="#6C4E25"
                />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width * 0.9, // 90% of screen width
        height: Dimensions.get('window').height * 0.6, // 60% of screen height
        borderRadius: 10, // Rounded corners for a polished look
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CoffeeMap;