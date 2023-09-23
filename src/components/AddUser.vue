<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button size="large" tertiary @click="showAddUserModal = true">
        <template #icon>
          <n-icon :component="PersonAddAlt1Filled"/>
        </template>
      </n-button>
    </template>
    Ajouter un gars
  </n-tooltip>


  <n-modal v-model:show="showAddUserModal">
    <n-card
      style="width: 600px"
      title="Ajouter un gars"
      size="huge"
      role="dialog"
      aria-modal="true"
  >
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="card" label="Carte">
        <n-input v-model:value="model.clientUUID" @keydown.enter.prevent style="margin-right: 10px"
        placeholder="Scannez une carte"
        />
        <scan-card/>
      </n-form-item>
      <n-form-item path="nom" label="Nom">
        <n-input v-model:value="model.clientLastName" @keydown.enter.prevent
        placeholder="Nom du nouveau gars"
        />
      </n-form-item>
      <n-form-item path="prenom" label="Prénom">
        <n-input v-model:value="model.clientFirstName" @keydown.enter.prevent
        placeholder="Prénom du nouveau gars"
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
                :disabled="model.nom === null"
                round
                type="primary"
                @click="handleValidateButtonClick"
            >
              Validate
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import {defineComponent, ref} from "vue";
import { PersonAddAlt1Filled } from "@vicons/material";
import {
  useMessage
} from "naive-ui";
import {useClientsStore} from "@/stores/Clients.js";
const clientsStore = useClientsStore()

import axios from "@/axios.js";

const showAddUserModal = ref(false)


const model = ref({
  clientUUID: null,
  clientFirstName: null,
  clientLastName: null
})

const rules = {
  card: [
    {required: false, message: 'Carte is required'},
    {min: 3, message: 'Carte must be at least 3 characters long'},
    {max: 10, message: 'Carte must be at most 10 characters long'}
  ],
  nom: [
    {required: true, message: 'Nom is required'},
    {min: 3, message: 'Nom must be at least 3 characters long'},
    {max: 10, message: 'Nom must be at most 10 characters long'}
  ],
  prenom: [
    {required: true, message: 'Prénom is required'},
    {min: 3, message: 'Prénom must be at least 3 characters long'},
    {max: 10, message: 'Prénom must be at most 10 characters long'}
  ]
}

const formRef = ref(null)

const loading = ref(false)
async function handleValidateButtonClick() {
  try {
    loading.value = true
    const response = await axios.post('/clients', model.value)
        .then(response => {
          message.success(response.data.message)
        })
        .catch(error => {
          message.error(error.response.data.message)
        })

    loading.value = false
    showAddUserModal.value = false
    await clientsStore.fetchClients()
  } catch (e) {
    console.error(e)
  }
}

</script>

<style scoped>

</style>
