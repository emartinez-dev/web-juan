<script setup>
import Calculator from "./components/Calculator.vue";
</script>
<template>
  <div>
    <main>
      <div class="calculator-heading">
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
  height: 100vh;
  max-width: 820px;
  margin: auto;
}

.calculator-heading {
  text-align: center;
  padding: 0 4rem;
  font-size: 1.1rem;
}

h1 {
  color: black;
  font-weight: bold;
}
</style>