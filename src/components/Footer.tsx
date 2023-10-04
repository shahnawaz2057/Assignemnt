import React from 'react';
import {View, StyleSheet, Button, TouchableOpacity, Text} from 'react-native';

/**
 * Footer with 'Submit' and 'Cancel' Button.
 * @param {*} props
 */

interface FooterProps {
  cancelTitle: string;
  submitTitle: string;
  onCancel: () => void;
  onSubmit: () => void;
}
const Footer: React.FC<FooterProps> = (props)=> {

  const { cancelTitle, submitTitle } = props
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => props.onCancel()}>
          <Text style={styles.cancelText}>
            {cancelTitle ? cancelTitle : 'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={() => props.onSubmit()}>
          <Text style={styles.submitText}>{submitTitle ? submitTitle : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: 'white',
  },
  buttons: {
    flex: 0.48,
    padding: 4,
  },
  buttonCancel: {
    backgroundColor: '#BF2F1A',
    borderColor: '#BF2F1A',
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSubmit: {
    borderColor: '#BF2F1A',
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  submitText: {
    color: '#BF2F1A',
    fontSize: 15,
  },

  cancelText: {
    fontSize: 15,
    color: '#fff',
  },
});

export default Footer;
