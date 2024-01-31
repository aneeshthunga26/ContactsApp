import axios from 'axios';
import { Contact } from './contactsSlice';

const baseUrl = 'https://reqres.in';

interface ContactsApiResponse {
  data: Contact[];
}

/**
 * Fetches contact data from an external API
 * @returns Array of contacts
 */
export const fetchContacts = async () => {
  const url = `${baseUrl}/api/users`;
  const response = await axios.get<ContactsApiResponse>(url);
  console.log(response.data);
  return response.data.data;
};
