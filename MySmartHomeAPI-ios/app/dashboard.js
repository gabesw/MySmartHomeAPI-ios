import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View, useColorScheme, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dial } from '../components/RadialControl';
import { GET, PUT } from '../api/api-request';

export default function Page() {
    const colorScheme = useColorScheme();

    const containerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const headerStyle = colorScheme === 'light' ? styles.lightHeader : styles.darkHeader;
    const headerTextStyle = colorScheme === 'light' ? styles.lightHeadertext : styles.darkHeadertext;
    const itemStyle = colorScheme === 'light' ? styles.lightItem : styles.darkItem;
    const itemText = colorScheme === 'light' ? styles.lightItemText : styles.darkItemText;
    const buttonStyle = colorScheme === 'light' ? styles.lightButton : styles.darkButton;

    const [kitchenLabel, setKitchenLabel] = useState('Fetching Value...');
    const [kitchenValue, setKitchenValue] = useState(-1);

    async function updateKitchenLightBehaviourSwitch(endpoint) {
        var value = -1;
        try {
            value = await GET(endpoint);
            value = value.val;
        } catch (error) {
            console.error(error);
            value = -1;
        }
        setKitchenValue(value);
        ResolveKitchenLightBehaviourSwitchLabels(value);
        // setTimeout(updateKitchenLightBehaviourSwitch, 20000);
    }

    useEffect(() => {
        //Run once on page load
        updateKitchenLightBehaviourSwitch('kitchen/lights/keep_on/');
    }, [""]);

    // Also make this dynamic
    var kitchenLightBehaviourSwitchLabels = {
        0: 'Normal',
        1: 'Keep Off',
        2: 'Keep On',
        3: 'Follow Me',
    };

    //TODO: add labels for each value of the behaviour switch to the api endpoint
    function ResolveKitchenLightBehaviourSwitchLabels(value) {
        const label = kitchenLightBehaviourSwitchLabels[value];
        setKitchenLabel(label == undefined ? 'Invalid Value' : label);
    }

    async function setKitchenLightBehaviourSwitch(endpoint, value) {
        try {
            data = await PUT(endpoint, {val: value});
            val = data.val;
            setKitchenValue(val);
            ResolveKitchenLightBehaviourSwitchLabels(val);
        } catch (error) {
            console.error(error);
        }
    }

    //TODO: add api endpoint to return all behaviour swithces and other endpoints and dynamically create layout
    const BehaviourSwitch = useMemo(() => ({title, endpoint}) => (
            <GestureHandlerRootView>
                <Dial
                    onValueChange={async (value) => {
                        ResolveKitchenLightBehaviourSwitchLabels(value-1);
                        // await setKitchenLightBehaviourSwitch(endpoint, value-1);
                    }}
                    onFingerUp={async (value) => {
                        // ResolveKitchenLightBehaviourSwitchLabels(value-1);
                        await setKitchenLightBehaviourSwitch(endpoint, value-1);
                    }}
                    start_notch={kitchenValue+1}
                    highlightAllPrevious={false}
                    num_notches={3}
                    scale={0.5}
                />
            </GestureHandlerRootView>
    ), []);

    return (
        <View style={styles.page}>
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <View style={[styles.header, headerStyle]}>
                    <Text style={[styles.headertext, headerTextStyle]}>My Home Dashboard</Text>
                </View>
                <View style={[styles.container, containerStyle]}>
                    <View style={[styles.item, itemStyle]}>
                        <Text style={[styles.itemText, itemText]}>Kitchen Light Behaviour</Text>
                        <View style={[styles.button, buttonStyle]}>
                            <Text style={[styles.buttontext, itemText]}>
                                {kitchenLabel}
                            </Text>
                        </View>
                        <BehaviourSwitch title="Kitchen Light Behaviour" endpoint="kitchen/lights/keep_on/" />
                    </View>
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
        paddingTop: 10,
        paddingBottom: 0,
        paddingHorizontal: 50,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 1,
        height: 300,
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