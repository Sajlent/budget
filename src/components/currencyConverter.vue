<template>
  <div class="converter">
    <h2>Currency converter</h2>
    <p>Type amount of money in PLN you want to convert.</p>
    <input v-on:change="calculateSum" id="base-currency" class="input input-number" name="base-currency" type="number" placeholder="Base sum" pattern="[0-9]+([\.,][0-9]+)?" step="any">
    <select id="currency" class="custom-select"></select>
    <p class="result-text">You will receive <span id="result"></span>.</p>
  </div>
</template>

<script>
  export default {
    name: 'converter',
    data: () => {
      return {
        converter: 0
      };
    },
    methods: {
      populateSelect () {
        const currency = Object.keys(this.exchange.rates);
        let optionsTmpl = '';

        currency.forEach((el) => {
          optionsTmpl += `<option id="${el}">${el}</option>`;
        });
        this.currencySelect.insertAdjacentHTML('afterbegin', optionsTmpl);
      },
      calculateSum (e) {
        let currency = this.currencySelect.value;
        let result = (this.exchange.rates[currency] * e.target.value).toFixed(2);

        this.resultWrap.innerText = `${result} ${currency}`;
        this.resultParagraph.style.display = 'block';
      }
    },
    mounted () {
      this.currencySelect = document.getElementById('currency');
      this.resultParagraph = document.querySelector('.result-text');
      this.resultWrap = this.resultParagraph.querySelector('#result');
      this.$http.get('//api.fixer.io/latest?base=PLN').then(response => {
        this.exchange = response.body;
        this.populateSelect();
      }, response => {
        // error callback
      });
    }
  };
</script>

<style lang="scss" scoped>
  .result-text {
    display: none;
  }
</style>
