<template>
  <div class="container">
    <n-tabs type="segment">
      <n-tab-pane name="Panier"/>
      <n-tab-pane name="Logs"/>
    </n-tabs>
    <n-card style="background-color: transparent; height: calc(100vh - 210px);" bordered>
      <n-scrollbar style="max-height: calc(100vh - 240px);">
        <n-button v-for="i in 10"
                  style="width: 100%; margin-bottom: 10px;">
        </n-button>
      </n-scrollbar>
    </n-card>
    <n-checkbox>
      Sale merde
    </n-checkbox>

    <n-button secondary
              type="success"
              style="width: 100%; margin-top: 5px;"
              size="large"
    >
      <n-icon :component="PersonOffRound" style="margin-right: 4px"/>
      Confirmer le panier
    </n-button>
  </div>
</template>


<script setup>

import {PersonOffRound} from "@vicons/material";
</script>
<style scoped>
.container {
  margin: 20px;
}
</style>
