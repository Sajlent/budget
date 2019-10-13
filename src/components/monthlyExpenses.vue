<template>
    <div>
        <h2>Monthly expenses</h2>
        <single-month v-for="(month) in months" :monthData="month" v-bind:key="month.id"></single-month>
    </div>
</template>

<script>
    import SingleMonth from './singleMonth';

    export default {
        name: 'monthlyExpenses',
        components: { SingleMonth },
        props: ['expenses'],
        data: () => {
            return {
                months: []
            };
        },
        mounted() {
            this.expenses.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const id = doc.id;
                    const month = { id, ...doc.data() };
                    this.months.push(month);
                });
            });
        }
    };
</script>