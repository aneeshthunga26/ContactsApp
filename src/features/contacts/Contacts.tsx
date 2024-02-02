import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchContactsAsync, filterContactsByName } from './contactsSlice';
import { CreateContactModal } from '../../components/CreateContactModal';
import { ContactItem } from '../../components/ContactItem';
import EditIcon from '../../app/resources/pencil.svg';
import { ContactsSearch } from '../../components/ContactsSearch';

export const Contacts = () => {
  const [showModal, setShowModal] = useState(false);
  const [filterContacts, setFilterContacts] = useState(false);
  const [name, setName] = useState('');

  const contacts = useAppSelector(state => state.contacts.value);
  const filteredContacts = useAppSelector(state =>
    filterContactsByName(state, name),
  );
  const count = useAppSelector(state => state.contacts.value.length);
  const status = useAppSelector(state => state.contacts.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //fetch data from api only when there is no contacts after initial load
    if (status === 'idle' && count === 0) {
      dispatch(fetchContactsAsync());
    }
  }, [status, count, dispatch]);

  return (
    <View style={styles.rootContainer}>
      <ContactsSearch
        text={name}
        setText={setName}
        setFilterContacts={setFilterContacts}
      />
      <CreateContactModal visible={showModal} setVisible={setShowModal} />
      {contacts.length > 0 ? (
        <View style={styles.listContainer}>
          <FlatList
            data={filterContacts ? filteredContacts : contacts}
            renderItem={({ item }) => <ContactItem contact={item} />}
            keyExtractor={contact => 'id-' + contact.id}
            ListEmptyComponent={<Text>No results found</Text>}
          />
        </View>
      ) : (
        <Text>Fetching contacts...</Text>
      )}
      <TouchableOpacity
        style={styles.addContact}
        onPress={() => setShowModal(true)}>
        <EditIcon width={25} height={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
  },
  listContainer: {
    flex: 1,
  },
  addContact: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgb(121, 185, 249)',
    elevation: 5,
    bottom: 20,
    right: 20,
  },
});
