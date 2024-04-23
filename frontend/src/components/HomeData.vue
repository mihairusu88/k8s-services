<template>
  <div class="page">
    <h1>Welcome to frontend service!</h1>
    <p>Click buttons to consume API's</p>
    <div>
      <button type="button" @click="onClickGetAllProducts">GET /api/products</button>
      <button type="button" @click="onClickGetProduct">GET /api/products/10</button>
      <button type="button" @click="onClickGetProductCategories">GET /api/categories</button>
      <button type="button" @click="onClickLogin">POST /api/auth/login</button>
      <button type="button" @click="onClickGetUser">GET /api/auth/user</button>
    </div>
    <div class="data" v-if="data && !isLoading" >
      <div class="data__item" v-for="item in data" :key="item.id">
        <vue-json-pretty :data="item" :deep="4" :showLine="true" :showLineNumber="true" :showIcon="true" />
      </div>
    </div>
    <div class="loader" v-if="isLoading"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getAllProducts, getProduct, getProductCategories, login, getUser } from '@/api'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const token = ref(null)
const isLoading = ref(false);
const data = ref<Record<string, any>[] | null>(null)

const onClickGetAllProducts = async () => {
  isLoading.value = true;
  data.value = null;
  const response = await getAllProducts();

  if (!response.success) {
    return;
  }

  data.value = response.data

  isLoading.value = false
}

const onClickGetProduct = async () => {
  isLoading.value = true;
  data.value = null;
  const response = await getProduct(10);

  if (!response.success) {
    return;
  }

  data.value = [response.data]

  isLoading.value = false
}

const onClickGetProductCategories = async () => {
  isLoading.value = true;
  data.value = null;
  const response = await getProductCategories();

  if (!response.success) {
    return;
  }

  data.value = [response.data]

  isLoading.value = false
}

const onClickLogin = async () => {
  isLoading.value = true;
  data.value = null;
  const response = await login();

  if (!response.success) {
    return;
  }

  data.value = [response.data]
  token.value = response.data.token

  isLoading.value = false
}

const onClickGetUser = async () => {
  isLoading.value = true;
  data.value = null;
  const response = await getUser(token.value);

  if (!response.success) {
    return;
  }

  data.value = [response.data]

  isLoading.value = false
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

p {
  margin-bottom: 50px;
}

button {
  background: #42b883;
  color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}

.data {
  margin: 15px 0;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  background: #eee;
  max-height: 500px;
  overflow-y: auto;
}
.data__item {
  font-size: 14px;
}

.loader {
  display: flex;
  margin: 50px auto;
  width: 40px;
  height: 40px;
  border: 3px solid #35495e;
  border-radius: 50%;
  border-top-color: #42b883;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
