<script setup>
import useContactStore from '@/store/contactsStore.js';
import { ref } from 'vue';

import { FloatLabel, IconField, InputIcon, InputText, Button } from 'primevue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const contactStore = useContactStore();
const formData = ref({ name: '', phone: '', email: '' });
const toast = useToast();
const router = useRouter();

const handleSubmit = async () => {
  const { name, phone, email } = formData.value;

  if (!name || !phone || !email) {
    toast.add({ detail: 'All fields are required!', severity: 'warn', life: 3000 });
    return;
  }

  const { success, message } = await contactStore.createContact({ name, phone, email });
  if (success) {
    toast.add({ severity: 'success', detail: message, life: 3000 });
    await router.push('/');
  } else {
    toast.add({ severity: 'error', detail: message, life: 3000 });
  }
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <h2 class="title">Create Contact</h2>

      <FloatLabel variant="in">
        <IconField>
          <InputIcon class="pi pi-user" />
          <InputText
            id="in_label"
            v-model="formData.name"
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
            v-model="formData.phone"
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
            v-model="formData.email"
            autocomplete="off"
            variant="filled"
            type="email"
          />
        </IconField>
        <label for="in_label">Email</label>
      </FloatLabel>

      <Button label="Create" type="submit" class="btn" />
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

form {
  display: flex;
  border: 1px solid #666;
  padding: 28px;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  border-radius: 10px;
  gap: 10px;
  box-shadow: 0 0 30px rgba(173, 255, 224, 0.3);

  .title {
    font-size: 34px;
    margin-bottom: 3rem;
    text-align: center;
  }

  .btn {
    margin-top: 20px;
  }
}

.p-float-label,
.p-inputtext,
.p-inputwrapper,
.p-icon-field {
  width: 100%;
  display: block;
}
</style>
