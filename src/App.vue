<script setup>
import listClients from './components/ListClients.vue'
import SelectedClient from "@/components/SelectedClient.vue";
import Articles from './components/ListArticles.vue'
import LoginModal from "./components/LoginModal.vue";
import Cart from '@/components/Cart.vue';

import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NLayoutContent,
  NH2,
  NButton,
  NList,
  NInput,
  NIcon,
  NCard,
  NSpace
} from 'naive-ui'
import AddUser from "./components/AddUser.vue";

</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>

      <login-modal/>

      <div style="position: absolute; height: auto; width: 20%;">
        <list-clients/>
      </div>
      <div style="position: absolute; height: auto; width: 60%; left: 20%;">
        <selected-client/>
        <Articles/>
      </div>
      <div style="position: absolute; height: auto; width: 20%; left: 80%;">
        <cart/>
      </div>
      <n-global-style/>
    </n-message-provider>
  </n-config-provider>

</template>

<script>
import {defineComponent} from 'vue'
import {darkTheme} from 'naive-ui'

export default defineComponent({
  name: 'App',
  setup() {
    return {
      darkTheme,
    };
  },
})

</script>

<style>
.n-layout-scroll-container {
  overflow-x: auto;
  height: auto;
}
</style>
