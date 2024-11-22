// components/CoffeeCard.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface CoffeeCardProps {
    name: string;
    rating: number;
    distance: string;
    imageUrl: string;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ name, rating, distance, imageUrl }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.details}>
                    ⭐ {rating} | {distance} km
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
    },
    info: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: '#757575',
    },
});

export default CoffeeCard;