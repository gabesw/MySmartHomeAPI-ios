import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View, useColorScheme, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';

export default function Page() {
    const colorScheme = useColorScheme();

    const containerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const headerStyle = colorScheme === 'light' ? styles.lightHeader : styles.darkHeader;
    const headerTextStyle = colorScheme === 'light' ? styles.lightHeadertext : styles.darkHeadertext;
    const itemStyle = colorScheme === 'light' ? styles.lightItem : styles.darkItem;
    const itemText = colorScheme === 'light' ? styles.lightItemText : styles.darkItemText;

    //TODO: add labels for each value of the behaviour switch to the api endpoint
    function KitchenLightBehaviourSwitchLabels(value) {
        switch (value) {
            case 0:
                return 'Normal';
            case 1:
                return 'Keep Off';
            case 2:
                return 'Keep On';
            case 3:
                return 'Follow me';
        }
    }

    //TODO: add api endpoint to return all behaviour swithces and other endpoints and dynamically create layout
    const KitchenLightBehaviourSwitch = ({title}) => (
        <View style={[styles.item, itemStyle]}>
            <Text style={[styles.itemText, itemText]}>{title}</Text>
            
        </View>
    );

    return (
        <View style={styles.page}>
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <View style={[styles.header, headerStyle]}>
                    <Text style={[styles.headertext, headerTextStyle]}>My Home Dashboard</Text>
                </View>
                <View style={[styles.container, containerStyle]}>
                    <KitchenLightBehaviourSwitch title="Kitchen Light Behaviour" />
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
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    lightItem: {
        backgroundColor: '#d0d0c0',
    },
    darkItem: {
        backgroundColor: '#30302f',
    },
    itemText: {
        fontSize: 20,
    },
    lightItemText: {
        color: 'black',
    },
    darkItemText: {
        color: 'white',
    },
  });