<template>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Text</label>
            <input type="text" id="text" v-model="text" placeholder="Enter text...">
        </div>
        <div class="form-control">
            <label for="amount">
                Amount <br>(negative - expense, positive - income)
            </label>
            <input type="text" name="amount" id="amount" v-model="amount" placeholder="Enter amount...">
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>
<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const text = ref('')
const amount = ref('');
const emit = defineEmits('transactionSubmitted')
const onSubmit = () =>{
    if(!text.value || !amount.value ){
        toast.error(
          "Please fill all the gaps",
        )
        return;
    }
    const transactionData = {
        text: text.value,
        amount: parseFloat(amount.value)
    }
    emit('transactionSubmitted', transactionData)
    text.value = '';
    amount.value = '';
}
</script>