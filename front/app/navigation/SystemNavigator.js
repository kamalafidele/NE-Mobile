import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GenerateTokenScreen from '../screens/GenerateTokenScreen';
import ValidateTokenScreen from '../screens/ValidateTokenScreen';
import TokenListScreen from '../screens/TokenListScreen';

const Stack = createNativeStackNavigator();

const SystemNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name='buy_electricity' 
            component={GenerateTokenScreen}
            options={{ headerShown: false }}
            />
            <Stack.Screen 
            name='validate_token' 
            component={ValidateTokenScreen}
            options={{ headerShown: false, animation: 'slide_from_left' }}
            />
            <Stack.Screen 
            name='list_tokens' 
            component={TokenListScreen}
            options={{ headerShown: false, animation: 'slide_from_right' }}
            />
        </Stack.Navigator>
    )
}

export default SystemNavigator;
