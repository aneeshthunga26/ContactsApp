import React from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchIcon from '../app/resources/SearchIcon.svg';
import ResetIcon from '../app/resources/ResetIcon.svg';

interface ContactsSearchProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setFilterContacts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactsSearch: React.FC<ContactsSearchProps> = ({
  text,
  setText,
  setFilterContacts,
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.searchBar}
        placeholder="Search"
      />
      <Pressable
        style={styles.searchReset}
        onPress={() => {
          setText('');
          setFilterContacts(false);
          Keyboard.dismiss();
        }}>
        <ResetIcon width={25} height={25} />
      </Pressable>
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => {
          setFilterContacts(true);
          Keyboard.dismiss();
        }}>
        <SearchIcon width={25} height={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
