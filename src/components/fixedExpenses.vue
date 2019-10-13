<template>
    <div>
        <table>
            <caption>Fixed monthly expenses</caption>
            <tbody>
                <tr v-for="(item, index) in items" v-bind:key="item.id" :id="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.cost }} PLN</td>
                    <td class="controls">
                        <button v-on:click="deleteExpense(index, item.id)" class="btn btn-delete"></button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>SUM</td>
                    <td>{{ this.sum }}</td>
                </tr>
            </tfoot>
        </table>
    </div>

</template>

<script>
    export default {
        name: 'fixedExpenses',
        props: ['fixedExpensesData'],
        data: () => {
            return {
                items: [],
                sum: 0
            };
        },
        mounted() {
            this.fixedExpensesData.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const id = doc.id;
                    const expense = { id, ...doc.data() };

                    this.items.push(expense);
                });

                this.sumExpenses();
            });
        },
        methods: {
            deleteExpense(i, id) {
                this.items.splice(i, 1);
                this.fixedExpensesData.doc(id).delete();
                // this.calculateBalance();
            },
            sumExpenses() {
                this.items.forEach((expense) => {
                    this.sum += expense.cost;
                });
            }
        }
    }
</script>