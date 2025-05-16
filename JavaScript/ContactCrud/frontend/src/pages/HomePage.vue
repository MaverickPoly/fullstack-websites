<script setup>
import useContactStore from '@/store/contactsStore.js';
import { onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { DataView } from 'primevue';

const contactStore = useContactStore();
const toast = useToast();

onMounted(async () => {
  const { success, message } = await contactStore.fetchContacts();

  if (success) {
    toast.add({ severity: 'success', detail: message, life: 2000 });
  } else {
    toast.add({ severity: 'error', detail: message, life: 2000 });
  }
});
</script>

<template>
  <div class="loading" v-if="contactStore.loading"></div>
  <div class="container" v-else>
    <h1>Contacts CRUD</h1>

    <DataView :value="contactStore.contacts" paginator :rows="9">
      <template #list="slotProps">
        <div class="list">
          <RouterLink
            :to="`/contact/${contact.id}`"
            class="contact-card"
            v-for="contact in slotProps.items"
            :key="contact.id"
          >
            <div class="contact-info">
              <h3>{{ contact.name }}</h3>
              <p><strong>Phone:</strong> {{ contact.phone }}</p>
              <p><strong>Email:</strong> {{ contact.email }}</p>
              <p>
                <small>{{ new Date(contact.created_at).toLocaleString() }}</small>
              </p>
            </div>
          </RouterLink>
        </div>
      </template>
    </DataView>
  </div>
</template>

<style scoped>
.loading {
}

.container {
  max-width: 1200px;
  width: 100%;
  padding: 10px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 40px;
    margin-bottom: 20px;
    background: linear-gradient(to right, #a8ffa8, #cdffcd);
    align-self: start;
    background-clip: text;
    color: transparent;
  }
}

.list {
  padding: 20px 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.contact-card {
  border: 1px solid #444;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  background: #18181b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition:
    border-color 0.4s ease,
    background 0.3s ease;
  text-decoration: none;
}

.contact-card:hover {
  border-color: #999;
  background: #212125;
}

.contact-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: white;
}

.contact-info p {
  margin: 0.3rem 0;
  font-size: 0.95rem;
  color: #eee;
}

.contact-info small {
  font-size: 0.8rem;
  color: #ccc;
}

@media (max-width: 850px) {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 550px) {
  .list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
