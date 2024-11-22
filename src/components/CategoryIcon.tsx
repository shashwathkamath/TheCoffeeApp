// components/CategoryIcon.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CategoryIconProps {
    name: string;
    label: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ name, label }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <Icon name={name} size={30} color="#fff" />
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10,
    },
    iconWrapper: {
        backgroundColor: '#6C4E25', // Dark Brown
        borderRadius: 30,
        padding: 15,
    },
    label: {
        marginTop: 5,
        fontSize: 12,
        color: '#A67B5B', // Light Brown
    },
});

export default CategoryIcon;