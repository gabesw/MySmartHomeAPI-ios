import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function Layout() {
    const colorScheme = useColorScheme();
    
    const headerColor = colorScheme === 'light' ? '#d0d0c0' : '#161616';

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                backgroundColor: headerColor,
            },
            headerShadowVisible: false,
            headerTitle: '',
        }}
        />
    );
}