<template>
  <header>
    <div class="container-header">
      <div class="logo">
        <h1>Штуки</h1>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/Main">Главная</router-link>
          </li>
          <li>
            <router-link to="/">Магазин</router-link>
          </li>
        </ul>
      </nav>
      <div class="basket">
        <router-link to="/Cart">
          <img :src="getImagePath('icon_buy.png')" alt="Корзина"/>
          <span class="basket-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Header',
  setup() {
    const cartItemCount = ref(0)

    const getImagePath = (filename) => {
      return process.env.BASE_URL + filename;
    };

    const updateCartCount = () => {
      const cartItems = localStorage.getItem('cartItems')
      if (cartItems) {
        const items = JSON.parse(cartItems)
        cartItemCount.value = items.reduce((total, item) => total + item.quantity, 0)
      } else {
        cartItemCount.value = 0
      }
    }

    onMounted(() => {
      updateCartCount()
      window.addEventListener('storage', updateCartCount)
      window.addEventListener('cartUpdated', updateCartCount)
    })

    return {
      getImagePath,
      cartItemCount
    }
  }
}
</script>

<style>
header {
  background-color: #fff;
  padding: 20px 0;
  margin: 0;
  color: #235948;
}

.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 3px solid #235948;
}

.logo {
  font-size: 16px;
  margin-left: 30px;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  margin-left: 30px;
  font-size: 20px;
}

nav a {
  text-decoration: none;
  color: #235948;
}

.basket {
  display: flex;
  align-items: center;
  margin-right: 30px;
  position: relative;
}

.basket img{
  width: 30px;
}

.basket-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #d24040;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
}

</style>