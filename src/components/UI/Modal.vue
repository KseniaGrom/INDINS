<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2 class="modal-title">
        {{ product.title }}
        <button class="close" @click="$emit('close')">&times;</button>
      </h2>
      <div class="modal-content">
        <div class="modal-img">
          <img :src="product.image" :alt="product.title">
        </div>
        <div class="product-description">
          <h4>Описание:</h4>
          <p>{{ product.description }}</p>
          <h4>Категория:</h4>
            <p>{{ product.category }}</p>
          <h4>Рейтинг:</h4>
          <p>{{ product.rating.rate }}</p>
          <div class="price-and-button">
            <p class="price">{{ product.price }} $ </p>
            <button class="modal-button" @click="buyProduct">Купить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    product: {
      type: Object,
      required: true,
    },
    addToCart: {
      type: Function,
      required: true,
    }
  },
  methods: {
    buyProduct() {
      this.addToCart(this.product);
    }
  }
};
</script>

<style>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  width: 900px;
  height: auto;
}

.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #235948;
  padding: 30px 30px;
  margin: 0;
  color: #ffffff;
}

.modal-content {
  display: flex;
}

.modal-img {
  margin-top: 20px;
  padding: 30px;
}

.modal-img img {
  width: 300px;
  height: auto;
}

.product-description {
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.modal h4{
  margin-block: 0;
  color: gray;
  font-size: 18px;
}

.modal p{
  margin-top: 5px;
  color: #235948;
  font-weight: bold;
}

.close {
  background: transparent;
  border: none;
  font-size: 35px;
  color: #ffffff;
  cursor: pointer;
}

.price-and-button {
  margin-top: auto;
}

.price{
  font-size: 35px;
  margin-bottom: 10px;
}

.modal-button{
  background-color: #235948;
  color: white;
  padding: 15px 30px;
  border: 2px solid #235948;
  border-radius: 5px;
  font-size: 20px;
  width: 100%;
  cursor: pointer;
}

</style>