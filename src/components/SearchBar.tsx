// components/SearchBar.tsx
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Icon name="search-outline" size={20} color="#6e6e6e" />
            <TextInput
                placeholder="Find Coffee Shops"
                style={styles.input}
                placeholderTextColor="#9e9e9e"
            />
            <Icon name="options-outline" size={20} color="#6e6e6e" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: 10,
        height: 40,
    },
    input: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16,
    },
});

export default SearchBar;