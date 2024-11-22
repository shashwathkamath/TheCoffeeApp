// screens/HomeScreen.tsx
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CoffeeCard from '../components/CoffeeCard';
import SearchBar from '../components/SearchBar';

const coffeeShops = [
    { id: '1', name: 'Cafe Latte', rating: 4.5, distance: '0.5', imageUrl: 'https://via.placeholder.com/80' },
    { id: '2', name: 'Java Express', rating: 4.7, distance: '1.2', imageUrl: 'https://via.placeholder.com/80' },
    // Add more shops...
];

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <SearchBar />
            <FlatList
                data={coffeeShops}
                renderItem={({ item }) => (
                    <CoffeeCard
                        name={item.name}
                        rating={item.rating}
                        distance={item.distance}
                        imageUrl={item.imageUrl}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});

export default HomeScreen;