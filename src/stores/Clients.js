import {defineStore} from "pinia";
import axios from "@/axios.js";
import {ref} from "vue";
import {useMessage} from "naive-ui";


export const useClientsStore = defineStore('clients', () => {
  const clients = ref([])

  function setClients(newClients) {
    clients.value = newClients
  }

  function getClients() {
    return clients.value
  }

  function addClient(client) {
    clients.value.push(client)
  }

  function removeClient(client) {
    const index = clients.value.indexOf(client)
    clients.value.splice(index, 1)
  }

  async function fetchClients() {
    try {
      const clientsResponse = await axios.get('/clients')
      if (clientsResponse.status === 200) {
        setClients(clientsResponse.data.data)
        console.log("CLIENT", clients.value)
      } else {
        useMessage().error(clientsResponse.data.message)
      }
    } catch (e) {
      console.error(e)
    }
  }


  return {
    setClients,
    getClients,
    addClient,
    removeClient,
    fetchClients
  }
})
