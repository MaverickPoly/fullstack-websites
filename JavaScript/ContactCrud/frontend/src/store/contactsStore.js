import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/lib/axios.js';

const useContactStore = defineStore('contact', () => {
  const contacts = ref([]);
  const loading = ref(false);

  const fetchContacts = async () => {
    loading.value = true;
    try {
      const response = await api.get('/contacts');
      contacts.value = response.data.data;
      return { success: true, message: response.data.message };
    } catch (e) {
      return { success: false, message: `Error fetching contacts: ${e.response.data.message}` };
    } finally {
      loading.value = false;
    }
  };

  const createContact = async ({ name, phone, email }) => {
    loading.value = true;
    try {
      const response = await api.post('/contacts', { name, phone, email });
      contacts.value = [...contacts.value, response.data.data];
      return { success: true, message: response.data.message };
    } catch (e) {
      return { success: false, message: `Error creating a contact: ${e.response.data.message}` };
    } finally {
      loading.value = false;
    }
  };

  const getContact = async (id) => {
    loading.value = true;
    try {
      const response = await api.get(`/contacts/${id}`);
      return { success: true, message: response.data.message, data: response.data.data };
    } catch (e) {
      return { success: false, message: `Error fetching a contact: ${e.response.data.message}` };
    } finally {
      loading.value = false;
    }
  };

  const updateContact = async (id, { name, phone, email }) => {
    loading.value = true;
    try {
      const response = await api.put(`/contacts/${id}`, { name, phone, email });
      contacts.value = contacts.value.map((contact) =>
        contact.id === id ? response.data.data : contact,
      );
      return { success: true, message: response.data.message };
    } catch (e) {
      return { success: false, message: `Error updating a contact: ${e.response.data.message}` };
    } finally {
      loading.value = false;
    }
  };

  const deleteContact = async (id) => {
    loading.value = true;
    try {
      const response = await api.delete(`/contacts/${id}`);
      contacts.value = contacts.value.filter((contact) => contact.id !== id);
      return { success: true, message: response.data.message };
    } catch (e) {
      return { success: false, message: `Error deleting a contact: ${e.response.data.message}` };
    } finally {
      loading.value = false;
    }
  };

  return {
    contacts,
    loading,
    fetchContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
  };
});

export default useContactStore;
