<template>
  <div class="container">
    <n-input-group>
      <n-input autofocus
               v-model:value="searchText"
               placeholder="Chercher un gars"
               filterable
               clearable
               size="large"
               style="margin-bottom: 10px;"
               :on-keydown="handleKeyDownSearch"
      >
        <template #prefix>
          <n-icon :component="PersonSearchFilled"/>
        </template>
      </n-input>

      <scan-card/>

      <add-user/>

    </n-input-group>
    <n-tabs type="segment">
      <n-tab-pane name="Tous"/>
      <n-tab-pane name="Adhérents"/>
      <n-tab-pane name="Connards"/>
    </n-tabs>
    <n-card style="background-color: transparent; height: calc(100vh - 200px);;" bordered>
      <n-scrollbar style="max-height: calc(100vh - 240px);">
        <div v-if="filteredClients.length === 0"
             style="display: flex; justify-content: center; align-items: center; height: 100%;">
          Aucuns résultats...
        </div>
        <n-button ghost
                  :id="client.clientId"
                  v-for="client in filteredClients"
                  :key="client.clientId"
                  :on-click="() => selectedClientStore.setSelectedClient(client)"
                  :type="selectedClientStore.getSelectedClient() !== null && selectedClientStore.getSelectedClient().clientId === client.clientId ? 'primary' : 'default'"
                  style="width: 100%; margin-bottom: 10px;"
                  text-color="white"
                  size="large"
                  bordered
                  round
        >
          {{ client.clientFirstName }} {{ client.clientLastName }}
        </n-button>
      </n-scrollbar>
      <template #action>
        <n-button
            style="width: 100%; margin-top: 5px;"
            size="large"
            round
            text-color="white"
            text
        >
          <n-icon :component="PersonOffRound" style="margin-right: 4px"/>
          Anonyme
        </n-button>
      </template>
    </n-card>
    <div v-if="isLoggedIn"
         style="margin-top: 10px; display: flex; align-items: flex-start; width: 100%;">
      <n-avatar size="large" :style="{ backgroundColor: stringToColour(user.login) }">
        {{ user.firstname[0] }}{{ user.lastname[0] }}
      </n-avatar>
      <div style="display: flex; flex-direction: column; margin-left: 10px;">
        <n-text style="margin-left: 10px; font: 500 16px/24px 'Inter', sans-serif; color: rgba(255, 255, 255, 0.8);">
          {{ user.firstname }} {{ user.lastname }}
        </n-text>
        <n-text style="margin-left: 10px; color: rgba(255, 255, 255, 0.5);">
          {{ user.login }}
        </n-text>
      </div>
    </div>
    <n-skeleton v-else style="margin-top: 10px;" size="large"/>
  </div>
</template>

<script setup>
import {computed, reactive, ref, watch} from 'vue'
import {PersonOffRound, PersonSearchFilled} from '@vicons/material'
import axios from "@/axios.js";
import {useUserStore} from "@/stores/user.js";
import {useSelectedClientStore} from "@/stores/selectedClient.js";
import {useClientsStore} from "@/stores/Clients.js";
const clientsStore = useClientsStore()

import {useMessage} from "naive-ui";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const selectedClientStore = useSelectedClientStore()

let clients = reactive([])


const searchText = ref('')

const message = useMessage()

const filteredClients = computed(() => {
  if (clients.value === undefined) {
    return []
  }
  return clients.value.filter(client => {
    return client.clientFirstName.toLowerCase().includes(searchText.value.toLowerCase()) || client.clientLastName.toLowerCase().includes(searchText.value.toLowerCase())
  })
})

const user = ref(null)
const {isLoggedIn} = storeToRefs(userStore)
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    clientsStore.fetchClients().then(() => {
      clients.value = clientsStore.getClients()
    })
    console.log("CLIENTS", clients)
    user.value = userStore.getUserData()
  }
})

watch(clientsStore.getClients, (newValue) => {
  clients.value = newValue
})

// merci copilot ça fait plaisir
function stringToColour(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var j = 0; j < 3; j++) {
    // eslint-disable-next-line no-bitwise
    var value = (hash >> (j * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

function handleKeyDownSearch(event) {
  if (event.key === 'Enter') {
    selectedClientStore.setSelectedClient(filteredClients.value[0])
  }

  if (event.key === 'ArrowDown') {
    if (selectedClientStore.getSelectedClient() === null) {
      selectedClientStore.setSelectedClient(filteredClients.value[0])
      return
    }
    const index = filteredClients.value.findIndex(client => {
      return client.clientId === selectedClientStore.getSelectedClient().clientId
    })
    if (index === filteredClients.value.length - 1) {
      selectedClientStore.setSelectedClient(filteredClients.value[0])
    } else {
      selectedClientStore.setSelectedClient(filteredClients.value[index + 1])
    }
  }
  if (event.key === 'ArrowUp') {
    if (selectedClientStore.getSelectedClient() === null) {
      return
    }
    const index = filteredClients.value.findIndex(client => {
      return client.clientId === selectedClientStore.getSelectedClient().clientId
    })
    if (index === 0) {
      selectedClientStore.setSelectedClient(filteredClients.value[filteredClients.value.length - 1])
    } else {
      selectedClientStore.setSelectedClient(filteredClients.value[index - 1])
    }
  }
}


</script>


<style scoped>
.container {
  height: 100%;
  overflow-y: scroll;
  margin: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>


