<template>
    <div>
        <h2>Monthly expenses</h2>
        <single-month v-for="(month) in months" :monthData="month" :id="month.id" :onDelete="deleteExpense"
                      v-bind:key="month.id"></single-month>
    </div>
</template>

<script>
    import Firebase from 'firebase';
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
                    const month = { id, expenses: doc.data() };
                    this.months.push(month);
                });
            });
        },
        methods: {
            deleteExpense(id, key) {
                this.expenses.doc(id).update({
                    [key]: Firebase.firestore.FieldValue.delete()
                })
            }
        }
    };
</script>