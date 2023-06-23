import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

function AppInputText({ iconName, iconColor, onChangeText, width = '100%', ...otherProps }) {
    return (
        <View style={[styles.container, { width: width }]}>
            { iconName && <MaterialCommunityIcons  name={iconName} color={iconColor} size={30}/>}
            <TextInput onChangeText={onChangeText} {...otherProps} style={styles.input}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 7,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: colors.GRAY,
        marginVertical: 5,
        padding: 5
    },
    input: {
        paddingLeft: 5,
    }
});

export default AppInputText;