<template>
    <div class="box">
        <h3>Salary</h3>
        <p>{{ salary }} PLN</p>
    </div>
</template>

<script>
    export default {
        name: 'salary',
        props: ['income'],
        data: () => {
            return {
                salary: 0
            };
        },
        mounted() {
            const incomeRef = this.income.doc('salary');

            incomeRef.get().then((doc) => {
                this.salary = doc.data().quota;
            });
        }
    }
</script>