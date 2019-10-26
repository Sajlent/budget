<template>
  <div id="app" class="row">
    <loading v-if="loading"></loading>
    <section class="main-content">
      <error v-if="error"></error>
      <monthly-expenses v-if="expenses" :expenses="expenses"></monthly-expenses>
    </section>
    <aside class="aside">
      <salary v-if="income" :income="income"></salary>
      <fixed-expenses v-if="fixedExpensesData" :fixedExpensesData="fixedExpensesData"></fixed-expenses>
    </aside>
  </div>
</template>

<script>
  import { firebaseConfig } from "./utils/config";
  import Firebase from 'firebase';
  import Loading from './components/loading';
  import Salary from './components/salary'
  import FixedExpenses from './components/fixedExpenses';
  import MonthlyExpenses from './components/monthlyExpenses';
  import Error from "./components/error";

  export default {
    name: 'app',
    components: { Error, Loading, Salary, FixedExpenses, MonthlyExpenses },
    data: () => {
      return {
        income: null,
        fixedExpensesData: null,
        expenses: null,
        loading: true,
        error: false
      }
    },
    mounted() {
      if (!Firebase.apps.length) {
        this.initDatabase();
      }
    },
    methods: {
      initDatabase() {
        const firebaseApp = Firebase.initializeApp(firebaseConfig);

        firebaseApp.auth().signInWithEmailAndPassword(process.env.VUE_APP_FIREBASE_EMAIL,
                process.env.VUE_APP_FIREBASE_PASSWORD)
                .then(() => {
                  const db = firebaseApp.firestore();

                  this.income = db.collection('income');
                  this.fixedExpensesData = db.collection('fixedExpenses');
                  this.expenses = db.collection('expenses');
                  this.loading = false;
                })
                .catch(() => {
                  this.error = true;
                  this.loading = false;
                });
      }
    }
  };
</script>

<style lang="scss">
  @import "assets/sass/main.scss";
</style>
