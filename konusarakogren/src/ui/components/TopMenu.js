import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/Colors';
import { units } from '../../theme/Units';
import Fonts from '../../theme/Fonts';
import { useLocalization } from '../../hooks/useLocalization';
// import OfflineNotice from './OfflineNotice';
// import { BackButton, Menu } from '../../assets/svgs';

const TopMenu = ({
    onPressMenu,
    onPressBack,
    title
}) => {
    const strings = useLocalization();

    return (
        <>
            <View style={styles.container}>
                {onPressBack && (
                    <TouchableOpacity
                        hitSlop={{
                            top: units.height / 27,
                            bottom: units.height / 27,
                            left: units.height / 27,
                            right: units.height / 27
                        }}
                        style={styles.icon}
                        onPress={onPressBack}>
                        {/* <BackButton width="100%" height="100%" /> */}
                    </TouchableOpacity>
                )}
                <Text
                    style={[
                        styles.title,
                        // !onPressBack && { marginLeft: units.height / 20 }
                    ]}
                    allowFontScaling={false}>
                    {title ? title : strings.app_name}
                </Text>
                <TouchableOpacity
                    hitSlop={{
                        top: units.height / 27,
                        bottom: units.height / 27,
                        left: units.height / 27,
                        right: units.height / 27
                    }}
                    style={styles.icon}
                    onPress={onPressMenu}
                    >
                    {/* <Menu width="100%" height="100%" /> */}
                </TouchableOpacity>
            </View>
            {/* <OfflineNotice /> */}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: units.width,
        backgroundColor: colors.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: units.width / 18,
        paddingVertical: units.height / 29,
        justifyContent: 'space-between',
        borderBottomWidth: units.height / 500,
        borderColor: colors.LT_GREY
    },
    icon: {
        width: units.height / 24,
        height: units.height / 24
    },
    title: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size(16),
        color: colors.BLACK,
        textAlign: 'center',
        width: units.width / 1.5
    },
    logoAndBrandContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        width: units.height / 20,
        height: units.height / 17.5
    },
    brand: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size(18),
        color: colors.BLACK,
        marginLeft: units.width / 27,
        width: units.width / 1.9
    },
    topMenuButtons: {
        flexDirection: 'row'
    },
    menu: {
        width: units.height / 24,
        height: units.height / 24,
        marginLeft: units.width / 27
    }
});

export default TopMenu;
