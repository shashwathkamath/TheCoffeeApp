// components/CoffeeCard.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface CoffeeCardProps {
    name: string;
    distance: string;
    rating: number;
    imageUrl: string;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ name, distance, rating, imageUrl }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.info}>
                    ⭐ {rating} • {distance} km
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
    },
    details: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6C4E25',
    },
    info: {
        fontSize: 14,
        color: '#757575',
    },
});

export default CoffeeCard;