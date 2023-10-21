import React from 'react';
import {Modal, StyleSheet, View, Text, ScrollView} from 'react-native';

import {colors} from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {units} from '../../theme/Units';
import AppButton from './Button';
import {useLocalization} from '../../hooks/useLocalization';

const InfoModal = props => {
  const strings = useLocalization();

  const boldText = props.boldText;

  const Message = () => {
    return (
      <Text style={styles.text}>
        {props?.message?.split(' ').map((word, index) => {
          if (boldText.some(value => value == word)) {
            return (
              <Text key={index} style={styles.boldText}>
                {word}{' '}
              </Text>
            );
          } else {
            return (
              <Text key={index} style={styles.text}>
                {word}{' '}
              </Text>
            );
          }
        })}
      </Text>
    );
  };

  return (
    <Modal transparent={true} visible={props.visibility}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{alignSelf: 'center'}}>
          <View style={styles.modal}>
            <Text style={styles.title}>
              {props.title ? props.title : strings.info_message}
            </Text>
            {props.boldText ? (
              <Message />
            ) : (
              <Text style={styles.text}>{props.message}</Text>
            )}

            <Text style={[styles.text, { marginTop: units.width / 40 }]}> 
              {props.subText} 
            </Text>

            <View style={styles.buttonSection}>
              <AppButton
                title={props.firstButtonText}
                onPress={props.onPressFirst}
                bgColor="ORANGE"
                bordrColor="ORANGE"
              />
              <AppButton
                title={props.secondButtonText}
                onPress={props.onPressSecond}
                textColor="ORANGE"
                bgColor="WHITE"
                bordrColor="ORANGE"
                buttonStyles={styles.button}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.WHITE,
    width: units.width / 1.05,
    borderRadius: units.height / 72,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(20),
    color: colors.BLACK,
    textAlign: 'center',
    marginTop: units.height / 30,
  },
  text: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size(14),
    color: colors.GREY,
    textAlign: 'center',
    marginHorizontal: units.width / 20,
    marginTop: units.width / 20,
  },
  boldText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(14),
    color: colors.GREY,
    textAlign: 'center',
    marginHorizontal: units.width / 20,
    marginTop: units.width / 20,
  },
  buttonSection: {
    marginVertical: units.height / 30,
  },
  button: {
    alignSelf: 'center',
    marginVertical: units.height / 75,
  },
});

export default InfoModal;
