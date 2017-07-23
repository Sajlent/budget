import Vue from 'vue';
import Router from 'vue-router';
import Expense from '@/components/addExpense';
import Converter from '@/components/currencyConverter';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'expense',
      component: Expense
    },
    {
      path: '/converter',
      name: 'converter',
      component: Converter
    }
  ]
});
