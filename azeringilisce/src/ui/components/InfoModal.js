import React from 'react';
import { Modal, StyleSheet, View, Text, ScrollView } from 'react-native';

import { colors } from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import { units } from '../../theme/Units';
import AppButton from '../components/Button';
import { useLocalization } from '../../hooks/useLocalization';

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
        <ScrollView contentContainerStyle={{ alignSelf: 'center' }}>
          <View style={styles.modal}>
            <Text style={styles.title}>
              {props.title ? props.title : strings.info_message}
            </Text>
            {props.subText ? (
              <>
                <Text style={styles.boldText}>{props?.message}</Text>
                <Text style={styles.text}>{props.subText}</Text>
              </>
            ) : props.boldText ? (
              <Message />
            ) : (
              <Text style={styles.text}>{props.message}</Text>
            )}
            <View style={styles.button}>
              <AppButton
                title={props.buttonText ? props.buttonText : strings.okay}
                onPress={props.onPress}
                bgColor="PINK"
                bordrColor="PINK"
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
    alignItems: 'center'
  },
  modal: {
    backgroundColor: colors.WHITE,
    width: units.width / 1.05,
    borderRadius: units.height / 72
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(20),
    color: colors.BLACK,
    textAlign: 'center',
    marginTop: units.height / 30
  },
  text: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size(14),
    color: colors.GREY,
    textAlign: 'center',
    marginHorizontal: units.width / 20,
    marginTop: units.width / 20
  },
  boldText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(14),
    color: colors.GREY,
    textAlign: 'center',
    marginHorizontal: units.width / 20,
    marginTop: units.width / 20
  },
  button: {
    alignSelf: 'center',
    marginTop: units.height / 18,
    marginBottom: units.height / 28
  }
});

export default InfoModal;
