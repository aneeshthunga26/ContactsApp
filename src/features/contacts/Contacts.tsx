import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchContactsAsync } from './contactsSlice';
import { TextInput } from 'react-native-gesture-handler';
import { CreateContactModal } from '../../components/CreateContactModal';
import { ContactItem } from '../../components/ContactItem';
import SearchIcon from '../../app/resources/SearchIcon.svg';
import ResetIcon from '../../app/resources/ResetIcon.svg';
import EditIcon from '../../app/resources/pencil.svg';

export const Contacts = () => {
  const contacts = useAppSelector(state => state.contacts.value);
  const count = useAppSelector(state => state.contacts.value.length);
  const status = useAppSelector(state => state.contacts.status);
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [contactsToShow, setContactsToShow] = useState(contacts);
  const [filterContacts, setFilterContacts] = useState(false);

  useEffect(() => {
    //fetch data from api only when there is no contacts after initial load
    if (status === 'idle' && count === 0) {
      dispatch(fetchContactsAsync());
    }
  }, [status, count, dispatch]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={setName}
          value={name}
        />
        <Pressable
          style={styles.searchReset}
          onPress={() => {
            setName('');
            setFilterContacts(false);
            Keyboard.dismiss();
          }}>
          <ResetIcon width={25} height={25} />
        </Pressable>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => {
            const filteredContacts = contacts.filter(contact => {
              const contactName =
                `${contact.first_name} ${contact.last_name}`.toLowerCase();
              return contactName.includes(name.toLowerCase());
            });
            setContactsToShow(filteredContacts);
            setFilterContacts(true);
            Keyboard.dismiss();
          }}>
          <SearchIcon width={25} height={25} />
        </TouchableOpacity>
      </View>
      <CreateContactModal visible={showModal} setVisible={setShowModal} />
      {contacts.length > 0 ? (
        <View style={styles.listContainer}>
          <FlatList
            data={filterContacts ? contactsToShow : contacts}
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
  searchContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
  },
  searchBar: {
    flex: 1,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchReset: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    opacity: 0.4,
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
