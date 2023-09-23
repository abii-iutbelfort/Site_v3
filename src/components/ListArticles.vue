<template>
  <n-divider/>
  <n-scrollbar style="height: calc(100vh - 240px);">
    <n-grid cols="2 s:3 m:4 l:5 xl:4 2xl:7" responsive="screen">
      <n-grid-item
          v-for="product in products">
        <article-card :product="product"/>
      </n-grid-item>
    </n-grid>
  </n-scrollbar>
</template>

<script setup>
import ArticleCard from "@/components/Article.vue";
import axios from "@/axios.js";
import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user.js";
import {useMessage} from "naive-ui";

const userStore = useUserStore()
const message = useMessage()
const products = ref([])

async function fetchProducts() {
  try {
    const productsResponse = await axios.get('/products')
    if (productsResponse.status === 200) {
      products.value = productsResponse.data.data
      console.log("PRODUIT", products.value)
    } else {
      message.error(productsResponse.data.message)
    }
  } catch (e) {
    console.error(e)
  }
}
const user = ref(null)
const {isLoggedIn} = storeToRefs(userStore)
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    fetchProducts()
  }
})

</script>


<style scoped>
.article-card {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
