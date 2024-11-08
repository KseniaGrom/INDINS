<template>
    <Header></Header>
    <div class="cart-container">
      <h1 class="cart-title">Корзина</h1>
      <div v-if="cartItems.length" class="cart-items">
        <table class="cart-table">
          <thead>
          <tr>
            <th class="cart-product">Товар</th>
            <th>Цена, $</th>
            <th>Кол-во</th>
            <th>Сумма, $</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td class="product-column">{{ item.title }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price * item.quantity }}</td>
            <td class="cart-trash">
              <button @click="removeFromCart(item)" class="trash-button">
                <img :src="getImagePath('icon_trash.png')" alt="Корзина"/>
              </button>
            </td>
          </tr>
          <tr>
            <td class="font-bold">Итог</td>
            <td></td>
            <td class="font-bold">{{ totalQuantity }}</td>
            <td class="font-bold">{{ total }}</td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <div class="pay-container">
          <button id="pay-button">Плачу за всё!</button>
        </div>
      </div>
      <div v-else class="empty-cart">
        <h2>Корзина пуста</h2>
      </div>
    </div>
    <Footer></Footer>
</template>

<script>
import { ref, computed } from 'vue';
import Header from '@/components/UI/Header.vue';
import Footer from '@/components/UI/Footer.vue';

export default {
  name: 'Cart',
  components: {
    Header,
    Footer,
  },
  setup() {
    const cartItems = ref([]);

    const getImagePath = (filename) => {
      return process.env.BASE_URL + filename;
    };

    if (localStorage.getItem('cartItems')) {
      cartItems.value = JSON.parse(localStorage.getItem('cartItems'));
    }

    const total = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    });

    const totalQuantity = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    const increaseQuantity = (item) => {
      item.quantity++;
      updateLocalStorage();
    };

    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        item.quantity--;
        updateLocalStorage();
      }
    };

    const removeFromCart = (item) => {
      const index = cartItems.value.indexOf(item);
      if (index > -1) {
        cartItems.value.splice(index, 1);
        updateLocalStorage();
      }
    };

    const updateLocalStorage = () => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
      window.dispatchEvent(new Event('cartUpdated'));
    };

    return {
      getImagePath,
      cartItems,
      total,
      totalQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart
    };
  }
};
</script>

<style>

.cart-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 140px - 162px);
}

.cart-table thead, .font-bold{
  font-size: 22px;
  font-weight: bold;
}

.cart-table tbody{
  font-size: 18px;
}

.cart-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #235948;
  margin-bottom: 24px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;
  border: 2px solid;
}

.cart-product {
  width: 45%;
}

.cart-table th, .cart-table td {
  padding: 15px;
  text-align: left;
  color: #235948;
}

.cart-table th {
  border-bottom: 2px solid #235948;
}

.cart-table tr {
  border-bottom: 2px solid #235948;
}

.cart-trash{
  width: 30px;
}

.cart-trash img{
  width: 25px;
}

.trash-button {
  background: none;
  border: none;
  color: #235948;
  cursor: pointer;
}

.pay-container{
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}

#pay-button{
  background-color: #235948;
  color: white;
  padding: 15px 70px;
  border: 0;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
}

.empty-cart {
  text-align: center;
  padding: 50px;
  color: #666;
}
</style>