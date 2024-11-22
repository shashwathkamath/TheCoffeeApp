import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CoffeeCard from '../components/CoffeeCard';
import CoffeeMap from '../components/CoffeeMap';

interface CoffeeShop {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    distance?: string;
    rating?: number;
    imageUrl?: string;
}

const HomeScreen = () => {
    const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);

    // Function to update coffee shop list
    const updateCoffeeShops = (newShops: CoffeeShop[]) => {
        setCoffeeShops(newShops); // Update the state with the new list of coffee shops
    };

    return (
        <View style={styles.container}>
            {/* Pass the updateCoffeeShops function as a prop */}
            <CoffeeMap onUpdateCoffeeShops={updateCoffeeShops} />

            {/* Coffee Shop List */}
            <View style={styles.listContainer}>
                {coffeeShops.length === 0 ? (
                    <Text style={styles.emptyText}>No coffee shops found nearby.</Text>
                ) : (
                    <FlatList
                        data={coffeeShops}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CoffeeCard
                                name={item.name}
                                distance={item.distance || ''}
                                rating={item.rating || 0}
                                imageUrl={item.imageUrl || 'https://via.placeholder.com/80'}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EDE3', // Cream background
    },
    listContainer: {
        flex: 1, // Adjust as needed for list visibility
        paddingHorizontal: 10,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#6C4E25',
    },
});

export default HomeScreen;