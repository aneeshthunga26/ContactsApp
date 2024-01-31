import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { addContact, selectNextId } from '../features/contacts/contactsSlice';
import { TextInput } from 'react-native-gesture-handler';
import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';

interface CreateContactModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateContactModal: React.FC<CreateContactModalProps> = ({
  visible,
  setVisible,
}) => {
  const dispatch = useAppDispatch();
  const nextId = useSelector(selectNextId);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const resetFieldsAndClose = useCallback(() => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setVisible(false);
  }, [setEmail, setFirstName, setLastName, setVisible]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.fieldContainer}>
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text>Last Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.save]}
            onPress={() => {
              if (!firstName || !lastName || !email) {
                Alert.alert(
                  'Field error',
                  'Please ensure all fields are filled in',
                );
                return;
              }
              dispatch(
                addContact({
                  id: nextId,
                  email,
                  first_name: firstName,
                  last_name: lastName,
                  avatar:
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                }),
              );
              resetFieldsAndClose();
            }}>
            <Text style={styles.text}>Save</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.cancel]}
            onPress={() => {
              resetFieldsAndClose();
            }}>
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
  fieldContainer: {
    marginBottom: 10,
  },
  input: {
    maxHeight: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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