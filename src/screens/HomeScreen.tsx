// screens/HomeScreen.tsx
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CoffeeCard from '../components/CoffeeCard';
import CoffeeMap from '../components/CoffeeMap';
import TitleHeader from '../components/TitleHeader';

const coffeeShops = [
    {
        id: '1',
        name: 'Cafe Latte',
        distance: '0.5',
        rating: 4.5,
        imageUrl: 'https://via.placeholder.com/80',
    },
    {
        id: '2',
        name: 'Java Express',
        distance: '1.2',
        rating: 4.7,
        imageUrl: 'https://via.placeholder.com/80',
    },
    {
        id: '3',
        name: 'Brewed Bliss',
        distance: '0.8',
        rating: 4.6,
        imageUrl: 'https://via.placeholder.com/80',
    },
];

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <TitleHeader />
            <CoffeeMap />
            <FlatList
                data={coffeeShops}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CoffeeCard
                        name={item.name}
                        distance={item.distance}
                        rating={item.rating}
                        imageUrl={item.imageUrl}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EDE3', // Cream background
    },
    listContainer: {
        paddingHorizontal: 10,
    },
});

export default HomeScreen;