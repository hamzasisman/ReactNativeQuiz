import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import {
    Linking,
    Platform, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    BackDrawer,
    NavIcon7,
    Permission,
    Settings as SettingsIcon,
    Support
} from '../assets/svgs';
import { useLocalization } from '../hooks/useLocalization';
import { colors } from '../theme/Colors';
import Fonts from '../theme/Fonts';
import { units } from '../theme/Units';
import routes from './routes';

import DeviceInfo from 'react-native-device-info';

//burda iconlara verdiğimiz idler ile farklı iconları çağırabileceğimiz switch case yapısı kurdum.
export const DrawerIcon = props => {
    switch (props.icon) {
        case 1:
            return <Support fill={colors.BLACK} width={30} height={30} />;
        case 2:
            return <Permission fill={colors.BLACK} width={30} height={30} />;
        case 3:
            return <NavIcon7 fill={colors.BLACK} width={40} height={40} />;
        default:
            return <></>;
    }
};

const CustomDrawer = props => {
    const strings = useLocalization();
    let appVersion = DeviceInfo.getVersion();

    return (
        <View
            style={
                Platform.OS === 'android'
                    ? { flex: 1, marginTop: units.height / 72 }
                    : { flex: 1 }
            }>
            <DrawerContentScrollView {...props}>
                {/* back iconuyla kapanma işlemi */}
                <TouchableOpacity
                    onPressOut={() => props.navigation.closeDrawer()}
                    style={styles.backButton}>
                    <BackDrawer fill={colors.BLACK} />
                </TouchableOpacity>
                {/* oluşturduğum switch case yapısını burada drawerIcon içinde çağırdım drawerdan çağıracağımız textlerde burada tanımlandı*/}
                {props.state.routes.map((n, index) =>
                    <TouchableOpacity
                        key={n.key}
                        onPress={() => {
                            //props.navigation.navigate(n.name)
                            props.navigation.push('DrawerStack', {
                                screen: routes.APP_NAVIGATOR,
                                params: {
                                    screen: 'Quiz',
                                    params: {
                                        screen: routes.QUIZ
                                    }
                                }
                            });
                        }}>
                        <View style={styles.container}>
                            <View style={styles.icon}>
                                {<DrawerIcon icon={n.params.icon} />}
                            </View>
                            <Text style={styles.text}>{n.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={() => {
                        Linking.openSettings();
                    }}>
                    <View style={styles.container}>
                        <View style={styles.icon}>
                            {<SettingsIcon fill={colors.BLACK} width={30} height={30} />}
                        </View>
                        <Text style={styles.text}>{strings.settings}</Text>
                    </View>
                </TouchableOpacity>

            </DrawerContentScrollView>

            <Text style={styles.versionText}>v{appVersion}</Text>
        </View>
    );
};
export default CustomDrawer;

const styles = StyleSheet.create({
    logout: {
        width: units.width / 3,
        height: units.height / 17,
        marginBottom: units.height / 25,
        flexDirection: 'row',
        marginHorizontal: units.width / 36,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logoutButton: {
        width: units.width / 14.5,
        height: units.height / 30.5
    },
    text: {
        fontSize: Fonts.size(17),
        marginStart: units.width / 72
    },
    versionText: {
        alignSelf: 'flex-end',
        right: units.width / 12,
        bottom: units.height / 25,
        fontSize: Fonts.size(14),
        color: colors.GREY
    },
    backButton: {
        alignSelf: 'flex-end'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: units.height / 60
    },
    icon: {
        marginHorizontal: units.width / 36
    },
    bottom: {
        justifyContent: 'flex-end'
    },
});
