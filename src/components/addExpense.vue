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
            <tr v-for="(item, index) in items">
                <td>
                  {{ item.name }}
                  <span class="date">{{ item.date }}</span>
                </td>
                <td>{{ item.cost }}</td>
                <td class="controls"><button v-on:click="deleteExpense(index)" class="btn btn-delete"></button></td>
            </tr>
        </table>
        <button v-on:click="show = !show" class="btn btn-add">Add new</button>
        <transition name="fade">
          <div v-if="show" class="expense">
            <form v-on:submit.prevent="addExpense()" id="add-expense">
              <input id="category" class="input input-category" name="category" type="text" placeholder="Category">
              <input id="cost" class="input input-cost" name="cost" type="number" placeholder="Cost" pattern="[0-9]+([\.,][0-9]+)?" step="any" formnovalidate>
              <button class="btn btn-save">Save</button>
            </form>
          </div>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'expense',
    data: () => {
      return {
        income: 5000,
        expense: 0,
        balance: 5000,
        show: false,
        items: [
          { date: '2017-01-01', name: 'Fly to Paris', cost: 300.45 },
          { date: '2017-01-01', name: 'Cosmetics', cost: 46.95 },
          { date: '2017-01-01', name: 'Winter jacket', cost: 129.99 }
        ]
      };
    },
    methods: {
      addExpense () {
        let date = new Date().toJSON().slice(0, 10);
        let categoryInput = document.getElementById('category');
        let cost = parseFloat(document.getElementById('cost').value);

        // cost = cost
        console.log(cost);

        if (!isNaN(cost)) {
          this.items.push({
            date: date,
            name: categoryInput.value,
            cost: cost
          });
          this.calculateBalance();
        }
      },
      deleteExpense (i) {
        this.items.splice(i, 1);
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
      this.calculateBalance();
    }
  };
</script>

<style lang="scss" scoped>
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
      font-size: .9em;
      color: #666666;
      display: block;
    }
    .category {
      display: inline-block;
      text-transform: uppercase;
      &-sum {
        display: block;
        font-size: 2em;
        text-transform: none;
        padding: 0 15px;
      }
    }
    .btn {
      background: transparent;
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      opacity: .5;
      transition: all .3s ease;
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
          width: 2px;
          height: 15px;
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          background: #180F01;
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
    .input {
      background: transparent;
      padding: 15px;
      margin-right: 10px;
      border: none;
      border-bottom: 1px solid #180F01;
      &-cost {
        -moz-appearance:textfield;
        -webkit-appearance: none;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-leave-active {
      opacity: 0
    }
</style>
