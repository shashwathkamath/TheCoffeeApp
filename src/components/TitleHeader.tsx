// components/TitleHeader.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TitleHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Coffees Near Me</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F8EDE3', // Cream background
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6C4E25', // Dark Brown
    },
});

export default TitleHeader;