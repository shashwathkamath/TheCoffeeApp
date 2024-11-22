// components/SearchBar.tsx
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Icon name="search" size={20} color="#6e6e6e" />
            <TextInput
                placeholder="Find Coffee Shops"
                placeholderTextColor="#aaa"
                style={styles.input}
            />
            <Icon name="options-outline" size={20} color="#6e6e6e" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8EDE3', // Cream
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 10,
        height: 45,
    },
    input: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16,
        color: '#6C4E25', // Dark Brown
    },
});

export default SearchBar;