<template>
  <footer>
    <div class="container-footer">
      <div class="logo">
        <h1>Штуки</h1>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Главная</a>
          </li>
          <li>
            <a href="#">Магазин</a>
          </li>
        </ul>
      </nav>
      <button id="button-footer">Напишите нам</button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>

footer {
  background-color: #235948;
  padding: 20px 0;
  margin: 0;
  color: #ffffff;
}

.container-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

footer nav a {
  color: #ffffff;
}

#button-footer{
  background-color: #235948;
  color: white;
  padding: 15px 30px;
  border: 2px solid white;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  margin-right: 30px;
}

</style>