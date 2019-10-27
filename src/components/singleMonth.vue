<template>
    <table class="table">
        <caption>{{ this.id }}</caption>
        <tbody>
        <tr v-for="(item, key) in this.monthData.expenses" v-bind:key="key">
            <td>{{ key }}</td>
            <td>{{ item }} PLN</td>
            <td class="controls">
                <button @click="deleteExpense(key)" class="btn btn--delete">x</button>
            </td>
        </tr>
        </tbody>
        <tfoot>
        <tr class="table__sum">
            <td>SUM</td>
            <td>{{ this.sum }} PLN</td>
            <td></td>
        </tr>
        </tfoot>
    </table>
</template>

<script>

    export default {
        name: 'singleMonth',
        props: ['monthData', 'id', 'onDelete'],
        data: () => {
            return {
                monthName: '',
                items: [],
                sum: 0
            };
        },
        mounted() {
            this.monthName = this.monthData.month;
            this.sumExpenses();
        },
        methods: {
            sumExpenses() {
                for (let expense in this.monthData.expenses) {
                    if (this.monthData.expenses.hasOwnProperty(expense)) {
                        this.sum += this.monthData.expenses[expense];
                    }
                }
            },
            deleteExpense(key) {
                delete this.monthData.expenses[key];
                this.onDelete(this.id, key);

                this.$forceUpdate();
            }
        }
    };
</script>