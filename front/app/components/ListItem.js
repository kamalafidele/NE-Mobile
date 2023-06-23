import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../config/colors';

function ListItem({ title, subtitle, width = 100 }) {
    return (
        <View style={[styles.container, { width: `${width}%` }]}>
            <Text>{ title }</Text>
            <Text>{ subtitle }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "flex-start",
        backgroundColor: colors.LIGHT,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    }
})
export default ListItem;