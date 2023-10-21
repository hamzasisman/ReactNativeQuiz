import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import { units } from '../../theme/Units';

import { Microphone, StopSpeech } from '../../assets/svgs';

function AppButton({
  disabled = false,
  buttonStyles,
  title,
  onPress,
  bordrColor = 'BLUE',
  bgColor = 'BLUE',
  textColor = 'WHITE',
  icon
}) {
  const whichIcon = {
    microphone: (
      <Microphone
        width={units.height / 35}
        height={units.height / 35}
        style={styles.icon}
        fill="white"
      />
    ),
    voicePause: (
      <StopSpeech
        width={units.height / 35}
        height={units.height / 35}
        style={styles.icon}
        fill="white"
      />
    )
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[bgColor] },
        { borderColor: colors[bordrColor] },
        { ...buttonStyles },
        disabled && { opacity: 0.5 }
      ]}
      disabled={disabled}
      onPress={onPress}>
      {whichIcon[icon]}
      <Text style={[styles.text, { color: colors[textColor] }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: units.height / 76,
    width: units.width / 1.2,
    borderRadius: units.height / 72,
    backgroundColor: colors.GREEN,
    borderWidth: 1
  },
  text: {
    color: colors.WHITE,
    fontSize: Fonts.size(20),
    fontFamily: Fonts.type.bold,
    textAlign: 'center'
  },
  icon: {
    marginRight: units.width / 100
  }
});

export default AppButton;
