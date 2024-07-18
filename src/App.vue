<script setup>
import Calculator from "./components/Calculator.vue";
</script>
<template>
  <div>
    <main>
      <div class="calculator-heading">
        <img src="/Imagen2.png" alt="" width="150" height="150">
        <h1>Calculadora Ley de Gay-Lussac</h1>
      </div>
      <Calculator />
      <div class="footer">
        <p>Hecho por Enrique para mi primo Juan © 2024</p>
      </div>
    </main>
  </div>
</template>
<style #scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 820px;
  margin: auto;
}

.calculator-heading {
  text-align: center;
  padding: 0 4rem;
}

h1 {
  color: black;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>