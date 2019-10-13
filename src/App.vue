<template>
  <div id="app">
    <section>
      <salary v-if="database" :income="income"></salary>
      <fixed-expenses v-if="database" :fixedExpensesData="fixedExpensesData"></fixed-expenses>
    </section>
    <aside>
      <monthly-expenses v-if="database" :expenses="expenses"></monthly-expenses>
    </aside>
    <loading></loading>
  </div>
</template>

<script>
  import { db } from './components/firebase';
  import Loading from './components/loading';
  import Salary from './components/salary'
  import FixedExpenses from './components/fixedExpenses';
  import MonthlyExpenses from './components/monthlyExpenses';

  export default {
    name: 'app',
    components: {Loading, Salary, FixedExpenses, MonthlyExpenses},
    data: () => {
      return {
        database: db,
        income: db.collection('income'),
        fixedExpensesData: db.collection('fixedExpenses'),
        expenses: db.collection('expenses')
      }
    }
  };
</script>

<style lang="scss">
  @import "assets/sass/main.scss";
</style>
