<script setup>

</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button size="large" tertiary @click="showScanCardModal = true">
        <template #icon>
          <n-icon :component="DocumentScannerFilled"/>
        </template>
      </n-button>
    </template>
    Scannez une carte
  </n-tooltip>

  <n-modal v-model:show="showScanCardModal">
    <n-card
      style="width: 600px"
      title="Scannez une carte"
      size="huge"
      role="dialog"
      aria-modal="true"
      >
      <n-space vertical>
        <n-spin :show="show">
          <n-alert title="En cours de scan" type="info" closable>
            <template #description>
              Veuillez patienter...
            </template>
          </n-alert>
        </n-spin>
      </n-space>
    </n-card>
  </n-modal>
</template>

<style scoped>

</style>

<script>
import {defineComponent, ref} from "vue";
import { DocumentScannerFilled } from "@vicons/material";
import {
  useMessage
} from "naive-ui";

export default defineComponent({
  setup() {
    const showScanCardModal = ref(false)

    return {
      showScanCardModal,
      DocumentScannerFilled
    }
  }
})

</script>
