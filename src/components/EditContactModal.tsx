import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Contact, updateContact } from '../features/contacts/contactsSlice';
import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { TextField } from './TextField';

interface EditContactModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  contact: Contact;
}

export const EditContactModal: React.FC<EditContactModalProps> = ({
  visible,
  setVisible,
  contact,
}) => {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState(contact.first_name);
  const [lastName, setLastName] = useState(contact.last_name);
  const [email, setEmail] = useState(contact.email);

  const handleSumbit = useCallback(() => {
    if (!firstName || !lastName || !email) {
      Alert.alert('Field error', 'Please ensure all fields are filled in');
      return;
    }
    dispatch(
      updateContact({
        ...contact,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
    );
    setVisible(false);
  }, [firstName, lastName, email, dispatch, contact, setVisible]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <TextField
          title="First name"
          onChangeText={setFirstName}
          value={firstName}
        />
        <TextField
          title="Last name"
          onChangeText={setLastName}
          value={lastName}
        />
        <TextField title="Email" onChangeText={setEmail} value={email} />
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.save]}
            onPress={handleSumbit}>
            <Text style={styles.text}>Save</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.cancel]}
            onPress={() => setVisible(false)}>
            <Text style={styles.text}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 4,
  },
  save: {
    backgroundColor: 'rgb(121, 185, 249)',
  },
  cancel: {
    backgroundColor: 'rgb(249, 121, 121)',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
  },
});
