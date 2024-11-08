<template>
  <Header></Header>
  <div class="main-image">
    <img :src="getImagePath('marketing.JPG')" alt="Рекламная картинка"/>
  </div>

  <h1 class="new">Новинки</h1>
  <div class="product-card">
    <div class="product-title" v-for="product in products" :key="product.id" @click="openModal(product)">
      <div class="product-img">
        <img :src="product.image" :alt="product.title">
      </div>
      <h2 class="product-title">{{ product.title }}</h2>
      <button class="buy-button" @click.stop="addToCart(product)">Купить</button>
    </div>
  </div>

  <modal v-if="isModalOpen" @close="isModalOpen = false" :product="selectedProduct" :addToCart="addToCart"></modal>

  <Footer></Footer>
</template>

<script>
import { ref, onMounted } from 'vue';
import Header from '@/components/UI/Header.vue';
import Footer from '@/components/UI/Footer.vue';
import Modal from '@/components/UI/Modal.vue';

export default {
  name: 'Main',
  components: {
    Header,
    Footer,
    Modal,
  },
  setup() {
    const products = ref([]);
    const isModalOpen = ref(false);
    const selectedProduct = ref(null);
    const cartItems = ref([]);

    onMounted(() => {
      fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(json => {
            products.value = json;
            console.log(json);
          })
    });

    const getImagePath = (filename) => {
      return process.env.BASE_URL + filename;
    };

    const openModal = (product) => {
      selectedProduct.value = product;
      isModalOpen.value = true;
    };

    const addToCart = (product) => {
      const existingProduct = cartItems.value.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cartItems.value.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
      window.dispatchEvent(new Event('cartUpdated'));

    };

    if (localStorage.getItem('cartItems')) {
      cartItems.value = JSON.parse(localStorage.getItem('cartItems'));
    }

    return {
      products,
      getImagePath,
      isModalOpen,
      openModal,
      selectedProduct,
      cartItems,
      addToCart
    };
  },
};
</script>

<style>

.new{
  text-align: center;
  font-size: 50px;
  color: #235948;
}

.main-image {
  text-align: center;
  margin: 20px 0;
}

.main-image img {
  max-width: 100%;
  height: auto;
}

.product-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-title {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 40px;
  align-items: center;
}

.product-title h2{
  padding: 0;
  font-weight: 600;
  color: #235948;
}

.product-img{
  margin-top: 20px;
}

.product-img img{
  width: 300px;
  height: 300px;
}

.buy-button {
  margin-top: auto;
  background-color: #ffffff;
  color: #235948;
  padding: 15px 30px;
  border: 2px solid #235948;
  border-radius: 5px;
  font-size: 20px;
  width: 100%;
  cursor: pointer;
}

.buy-button:hover {
  background-color: #235948;
  color: #ffffff;
}

</style>
