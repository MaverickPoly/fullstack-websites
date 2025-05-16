<script setup>
import useContactStore from '@/store/contactsStore.js';
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter, useRoute } from 'vue-router';
import { Button, FloatLabel, IconField, InputIcon, InputText } from 'primevue';

const route = useRoute();
const { id } = route.params;

const contactStore = useContactStore();
const contact = ref(null);
const toast = useToast();
const router = useRouter();

const handleSave = async () => {
  const { name, phone, email } = contact.value;

  if (!name || !phone || !email) {
    toast.add({ detail: 'All fields are required!', severity: 'warn', life: 2000 });
    return;
  }

  const { success, message } = await contactStore.updateContact(id, contact.value);

  if (success) {
    toast.add({ severity: 'success', detail: message, life: 3000 });
    await getContact();
  } else {
    toast.add({ severity: 'error', detail: message, life: 3000 });
  }
};

const handleDelete = async () => {
  const { success, message } = await contactStore.deleteContact(id);

  if (success) {
    toast.add({ severity: 'success', detail: message, life: 3000 });
    await router.push('/');
  } else {
    toast.add({ severity: 'error', detail: message, life: 3000 });
  }
};

const getContact = async () => {
  const { success, message, data } = await contactStore.getContact(id);

  if (success) {
    toast.add({ severity: 'success', detail: message, life: 2000 });
    contact.value = data;
  } else {
    toast.add({ severity: 'error', detail: message, life: 2000 });
  }
};

onMounted(getContact);
</script>

<template>
  <div class="container" v-if="contact">
    <div class="actions">
      <h2 class="title">Contact</h2>

      <div class="buttons">
        <Button label="Delete" icon="pi pi-trash" severity="danger" @click="handleDelete" />
        <Button label="Update" icon="pi pi-pencil" severity="warn" @click="handleSave" />
      </div>
    </div>

    <div class="contact">
      <FloatLabel variant="in">
        <IconField>
          <InputIcon class="pi pi-user" />
          <InputText
            id="in_label"
            v-model="contact.name"
            autocomplete="off"
            variant="filled"
            type="text"
          />
        </IconField>
        <label for="in_label">Full Name</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <IconField>
          <InputIcon class="pi pi-phone" />
          <InputText
            id="in_label"
            v-model="contact.phone"
            autocomplete="off"
            variant="filled"
            type="text"
          />
        </IconField>
        <label for="in_label">Phone Number</label>
      </FloatLabel>
      <FloatLabel variant="in">
        <IconField>
          <InputIcon class="pi pi-envelope" />
          <InputText
            id="in_label"
            v-model="contact.email"
            autocomplete="off"
            variant="filled"
            type="email"
          />
        </IconField>
        <label for="in_label">Email</label>
      </FloatLabel>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  width: 100%;
  margin: 60px auto;
  display: flex;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 12px;
}

.actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  flex: 1;
  padding: 10px;

  h2.title {
    font-size: 32px;
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.contact {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 18px;

  .p-float-label,
  .p-inputtext,
  .p-inputwrapper,
  .p-icon-field {
    width: 100%;
    display: block;
  }
}
</style>
