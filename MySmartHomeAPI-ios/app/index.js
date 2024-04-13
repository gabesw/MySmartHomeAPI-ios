import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, Pressable, View, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Page() {
    const colorScheme = useColorScheme();

    const containerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const buttonStyle = colorScheme === 'light' ? styles.lightButton : styles.darkButton;
    const buttonTextStyle = colorScheme === 'light' ? styles.lightButtontext : styles.darkButtontext;
    const headerStyle = colorScheme === 'light' ? styles.lightHeader : styles.darkHeader;
    const headerTextStyle = colorScheme === 'light' ? styles.lightHeadertext : styles.darkHeadertext;

    try {
        SecureStore.getItemAsync('token').then((token) => {
            if (token) {
                //TODO: make check if token is valid, if not remove token display error message
                router.replace('/dashboard');
            }
        });
    }
    catch (error) {
        console.log(error);
    }

    return (
        <View style={styles.page}>
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <View style={[styles.header, headerStyle]}>
                    <Text style={[styles.headertext, headerTextStyle]}>Welcome to MySmartHomeAPI</Text>
                </View>
                <View style={[styles.container, containerStyle]}>
                    <Link push href="/signin" asChild>
                        <Pressable>
                            <View style={[styles.button, buttonStyle]}>
                                <Text style={[styles.buttontext, buttonTextStyle]}>Sign In</Text>
                            </View>
                        </Pressable>
                    </Link>
                    {/* Sign Up Disabled */}
                    <Pressable>
                        <View style={[styles.button, buttonStyle]}>
                            <Text style={[styles.buttontext, buttonTextStyle]}>Sign Up</Text>
                        </View>
                    </Pressable>
                </View>
            </SafeAreaProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    page : {
        flex: 1,
    },
    header: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    lightHeader: {
        backgroundColor: '#d0d0c0',
    },
    darkHeader: {
        backgroundColor: '#161616',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    lightContainer: {
        backgroundColor: '#d0d0c0',
    },
    darkContainer: {
        backgroundColor: '#1C1C1C',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        marginBottom: 20,
        elevation: 3,
    },
    lightButton: {
        backgroundColor: '#d0d0c0',
    },
    darkButton: {
        backgroundColor: '#30302f',
    },
    buttontext: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    lightButtontext: {
        color: 'black',
    },
    darkButtontext: {
        color: 'white',
    },
    headertext: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    lightHeadertext: {
        color: 'black',
    },
    darkHeadertext: {
        color: 'white',
    },
  });