<template>
  <n-card hoverable embedded>
    <template #cover>
      <img src="https://i0.wp.com/commechezmams.fr/wp-content/uploads/2021/01/COCA-33cl.jpg?fit=800%2C800&ssl=1">
      <div style="position: absolute; top: 0; left: 0; width: 40%; background-color: #009900; border-radius: 20px; margin: 5px; display: flex; align-items: center;">
        <n-text strong style="font-size: 18px; margin: 0 auto;">
          {{ props.product.productNormalPrice }}€
        </n-text>
      </div>
      <div style="position: absolute; top: 35px; left: 0; width: 40%; background-color: #ffbf00; border-radius: 20px; margin: 5px; display: flex; align-items: center;">
        <n-text strong style="font-size: 18px; margin: 0 auto;">
          {{ props.product.productDiscountPrice }}€
        </n-text>
      </div>
      <div style="position: absolute; top: -15px; right: -15px; width: 40px; height: 40px; background-color: dimgrey; border-radius: 50%; margin: 5px; display: flex; align-items: center; justify-content: center;">
        <n-text strong style="font-size: 18px; margin: 0;">
          {{ props.product.productStock }}
        </n-text>
      </div>
      <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 5px; background-color: rgba(0, 0, 0, 0.8); display: flex; justify-content: space-between; align-items: center;">
        <n-text strong style="font-size: 20px;">{{ props.product.productLibelle }}</n-text>
        <n-input-number v-model:value="value" min="0" :max="props.product.productStock" placeholder="0" button-placement="both" style="width: 90px; text-align: center;" />
      </div>
    </template>
  </n-card>
</template>


<script setup>
import { NCard } from "naive-ui";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.n-card {
  max-width: 250px;
  margin: 10px;
}
</style>
