import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, Pressable, Text, useColorScheme, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { login } from '../api/django-auth';

export default function Page() {
    const colorScheme = useColorScheme();

    const containerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const buttonStyle = colorScheme === 'light' ? styles.lightButton : styles.darkButton;
    const buttonTextStyle = colorScheme === 'light' ? styles.lightButtontext : styles.darkButtontext;
    const textStyle = colorScheme === 'light' ? styles.lightText : styles.darkText;
    const textInputStyle = colorScheme === 'light' ? styles.lightTextInput : styles.darkTextInput;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await login(username, password);
            router.replace('/dashboard');
        } catch (error) {
            setError('Failed to log in. Please check your credentials and try again.');
        }
    };

    return (
        <View style={styles.page}>
            <SafeAreaProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, containerStyle]}>
                    <Text style={[styles.text, textStyle]}>Log in with django credentials</Text>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <TextInput onPress={() => console.log('Username focus')} style={[styles.textInput, textInputStyle]} placeholder="Username" onChangeText={setUsername} value={username} secureTextEntry={false} />
                    <TextInput style={[styles.textInput, textInputStyle]} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
                    <Pressable onPress={handleLogin}>
                        <View style={[styles.button, buttonStyle]}>
                            <Text style={[styles.buttontext, buttonTextStyle]}>Log In</Text>
                        </View>
                    </Pressable>
                </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    page : {
        flex: 1,
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
    error: {
        color: 'red',
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
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
    text: {
        fontSize: 20,
        lineHeight: 21,
        marginBottom: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    lightText: {
        color: 'black',
    },
    darkText: {
        color: 'white',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        width: '100%',
        borderRadius: 10,
    },
    lightTextInput: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    darkTextInput: {
        backgroundColor: '#30302f',
        color: '#ffffff',
    },
  });