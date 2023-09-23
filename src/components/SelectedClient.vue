<template>
  <div class="container">
    <n-space vertical>
      <n-h1 v-if="selectedClientStore.getSelectedClient() !== null">
        {{ selectedClientStore.getSelectedClient().clientFirstName }}
        {{ selectedClientStore.getSelectedClient().clientLastName }}
        <n-icon v-if="selectedClientStore.getSelectedClient().clientMembership !== null"
                :component="VerifiedUserFilled" style="margin-left: 10px;"/>
      </n-h1>
      <n-skeleton v-else :width="250" size="large" :sharp="false"/>
      <n-h6 v-if="selectedClientStore.getSelectedClient() !== null"
            style="margin-top: -30px; color: rgba(255, 255, 255, 0.5);">
        {{ selectedClientStore.getSelectedClient().clientUUID }}
      </n-h6>
      <n-skeleton v-else :width="400" :height="25" size="small" :sharp="false"/>
      <n-popover trigger="click"
                 placement="bottom"
                 v-model:show="showPopover"
                 :show-arrow="true"
                 :style="{ width: '100%', position: 'relative' }"
      >
        <template #trigger>
          <n-gradient-text type="success" style="font-size: 50px; margin-top: -20px;"
                           v-if="selectedClientStore.getSelectedClient() !== null">
            {{ selectedClientStore.getSelectedClient().clientSolde }}
          </n-gradient-text>
          <n-skeleton v-else :width="200" :height="50" size="large" :sharp="false"/>
        </template>
        <div>
          <div style="display: flex; flex-direction: row; margin-bottom: 5px">
            <NInputNumber v-model:value="value" placeholder="0" style="text-align: center;width: 30%" :precision="2"
                          :show-button="false"/>
            <n-tabs type="segment" style="width: 60%;margin-left: 10px" size="small">
              <n-tab-pane name="SumUp"/>
              <n-tab-pane name="Espèces"/>
              <n-tab-pane name="Paypal"/>
            </n-tabs>
            <n-button @click="handleValidateButtonClick()" :disabled="value === 0"
                      type="primary" style="width: 20%; margin-left: 10px;">Ajouter
            </n-button>
          </div>
          <n-grid cols="5">
            <n-grid-item v-for="price in priceButtons" :span="1">
              <n-button secondary class="n-grid-button" :type="price > 0 ? 'primary' : 'error'"
                        @click="updateValue(price)">{{
                  price > 0 ? '+' : (price < 0 ? '-&nbsp;' : '')
                }}{{ Math.abs(price) }}€
              </n-button>
            </n-grid-item>
          </n-grid>
        </div>
      </n-popover>
    </n-space>
  </div>
</template>

<script setup>
import {defineComponent, h, ref} from 'vue'
import {useSelectedClientStore} from "@/stores/selectedClient.js";
import {VerifiedUserFilled} from "@vicons/material";
import {NButton, NGrid, NInputNumber, NText, useMessage} from "naive-ui";
import axios from "@/axios.js";

const selectedClientStore = useSelectedClientStore()
const priceButtons = [1, 0.5, 0.2, 0.1, 0.05, -1, -0.5, -0.2, -0.1, -0.05]
const value = ref(0)
const message = useMessage()
const showPopover = ref(false)

const updateValue = (price) => {
  value.value = parseFloat((value.value + price).toFixed(2));
};

const loading = ref()

async function handleValidateButtonClick() {
  try {
    loading.value = true
    const response = await axios.post('/transactions/products', {
      clientId: selectedClientStore.getSelectedClient().clientId,
      transactionValue: value.value,
      transactionPaymentMethod: 'cash'
    }).then((response) => {
      message.success(response.data.message)
    }).catch((error) => {
      console.log(selectedClientStore.getSelectedClient().clientId)
      message.error(error.response.data.message)
    })
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
    showPopover.value = false
  }
}


</script>

<style scoped>
.container {
  margin-top: 20px;
}


.n-grid-button {
  width: 90px;
  margin: 5px;
}
</style>
