import {defineStore} from "pinia";
import {ref} from "vue";

export const useSelectedClientStore = defineStore('selectedClient', () => {
  const selectedClient = ref(null)

  function setSelectedClient(client) {
    selectedClient.value = client
  }

  function getSelectedClient() {
    return selectedClient.value
  }


  return {
    setSelectedClient,
    getSelectedClient
  }
})
