<template v-on:load="calculateBalance">
  <div class="table-total">
    <div class="category">
      Income
      <span id="income-total" class="category-sum">{{ income }} zł</span>
    </div>
    <div class="category">
      Expense
      <span id="expense-total" class="category-sum">{{ expense }} zł</span>
    </div>
    <div class="category">
      Balance
      <span id="balance" class="category-sum">{{ balance }} zł</span>
    </div>
    <table class="total" cellpadding="0" cellspacing="0">
      <tr v-for="(item, index) in items" :id="item.id">
        <td>
          {{ item.name }}
          <span class="date">{{ item.date }}</span>
        </td>
        <td>{{ item.cost }} zł</td>
        <td class="controls"><button v-on:click="deleteExpense(index, item.id)" class="btn btn-delete"></button></td>
      </tr>
    </table>
    <button v-on:click="show = !show" class="btn btn-add">Add new</button>
    <transition name="fade">
      <div v-if="show" class="expense">
        <form v-on:submit.prevent="addExpense()" id="add-expense">
          <input id="category" class="input input-category" name="category" type="text" placeholder="Category">
          <input id="cost" class="input input-number" name="cost" type="number" placeholder="Cost" pattern="[0-9]+([\.,][0-9]+)?" step="any" formnovalidate>
          <button class="btn btn-save">Save</button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
  import { db } from './firebase';
  const ref = db.ref();

  export default {
    name: 'expense',
    data: () => {
      return {
        income: 0,
        expense: 0,
        balance: 0,
        show: false,
        items: []
      };
    },
    methods: {
      addExpense () {
        const date = new Date().toJSON().slice(0, 10);
        const categoryInput = document.getElementById('category');
        const cost = parseFloat(document.getElementById('cost').value);

        if (!isNaN(cost)) {
          let newItemKey = ref.child('expense').push().key;
          let itemData = {
            id: newItemKey,
            date: date,
            name: categoryInput.value,
            cost: cost
          };
          this.items.push(itemData);
          let updates = {};
          updates['/expense/' + newItemKey] = itemData;
          ref.update(updates);
          this.calculateBalance();
        }
      },
      deleteExpense (i, id) {
        this.items.splice(i, 1);
        ref.child('/expense/' + id).remove();
        this.calculateBalance();
      },
      calculateBalance () {
        this.expense = 0;
        this.items.forEach((el) => {
          this.expense = this.expense + el.cost;
        });
        this.expense = this.expense.toFixed(2);
        this.balance = this.income - this.expense;
        this.balance = this.balance.toFixed(2);
      }
    },
    mounted () {
      let expenseQuery = db.ref('expense').orderByKey();
      let incomeQuery = db.ref();
      incomeQuery.once('value').then((snapshot) => {
        this.income = snapshot.val().income;
      });
      expenseQuery.once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = childSnapshot.val();
          this.items.push(item);
        });
        this.calculateBalance();
      });
    }
  };
</script>

<style lang="scss">
  .total {
    width: 75%;
    margin: 50px auto;
    td {
      font-size: 1.2em;
      text-align: left;
      padding: 10px;
      margin: 0;
      border-bottom: 1px solid #e5e5e7;
      &.controls {
        text-align: right;
      }
    }
  }
  .date {
    font-size: .8em;
    color: #666666;
    display: block;
  }
  .category {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 2px;
    &-sum {
      display: block;
      font-size: 2em;
      letter-spacing: normal;
      text-transform: none;
      padding: 0 25px;
    }
  }
  .btn {
    background: transparent;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    opacity: .5;
    transition: opacity .3s ease;
    &:hover {
      opacity: 1;
    }
    &-add {
      color: #956C1F;
      margin-bottom: 20px;
      padding: 15px 30px;
      border: 2px solid #956C1F;
    }
    &-delete {
      width: 30px;
      height: 30px;
      position: relative;
      border: 1px solid #180F01;
      border-radius: 50%;
      &:before, &:after {
        content: '';
        width: 1px;
        height: 15px;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        background: #180F01;
        backface-visibility: hidden;
      }
      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
    &-save {
      color: #956C1F;
      padding: 15px 30px;
      border: 2px solid #956C1F;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-leave-active {
    opacity: 0
  }
</style>
