<template>
    <table class="table">
        <caption>{{ this.monthData.month }}</caption>
        <tbody>
        <tr v-for="(item, index) in this.monthData.monthlyExpenses" v-bind:key="item.id" :id="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.cost }} PLN</td>
            <td class="controls">
<!--                <button v-on:click="deleteExpense(index, item.id)" class="btn btn-delete"></button>-->
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
</template>

<script>
    export default {
        name: 'singleMonth',
        props: ['monthData'],
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
                this.monthData.monthlyExpenses.forEach((expense) => {
                    this.sum += expense.cost;
                });
            }
        }
    };
</script>