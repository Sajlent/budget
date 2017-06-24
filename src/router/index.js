import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import expense from '@/components/addExpense';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'expense',
      component: expense
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
});
