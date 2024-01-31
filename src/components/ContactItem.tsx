import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useAppDispatch } from '../app/hooks';
import { Contact, deleteContact } from '../features/contacts/contactsSlice';
import { EditContactModal } from './EditContactModal';

interface ContactItemProps {
  contact: Contact;
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const ref = useRef<Swipeable>(null);

  const renderRightView = () => {
    return (
      <View style={styles.swipeActions}>
        <TouchableOpacity
          style={[styles.button, styles.edit]}
          onPress={() => {
            ref.current?.close();
            setShowModal(true);
          }}>
          <Text style={styles.text}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.delete]}
          onPress={() => {
            dispatch(deleteContact(contact.id));
          }}>
          <Text style={styles.text}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <EditContactModal
        visible={showModal}
        setVisible={setShowModal}
        contact={contact}
      />
      <Swipeable renderRightActions={renderRightView} ref={ref}>
        <View style={styles.contactOuter}>
          <Image
            source={{
              uri: contact.avatar,
            }}
            style={styles.avatar}
          />
          <View style={styles.contactInner}>
            <Text>{`${contact.first_name} ${contact.last_name}`}</Text>
            <Text>{contact.email}</Text>
          </View>
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  contactOuter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'rgb(236, 243, 250)',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  contactInner: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 10,
  },
  swipeActions: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 5,
    borderRadius: 4,
  },
  edit: {
    backgroundColor: 'rgb(121, 185, 249)',
  },
  delete: {
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
