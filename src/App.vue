<template>
  <Header/>
  <div class="container">
    <Balance :total="total"/>
    <IncomeExpense :income="income" :expenses="expenses"/>
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted"/>
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpense from './components/IncomeExpense.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { ref, computed, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const transactions = ref([]);

onMounted(() =>{
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if(savedTransactions){
    transactions.value = savedTransactions
  }
})

// Get income
const income = computed(() =>{
  return transactions.value
  .filter((transaction) => transaction.amount > 0)
  .reduce((acc, transaction) =>{
    return acc + transaction.amount
  }, 0)
  .toFixed(2)
})
// Get expenses
const expenses = computed(() =>{
  return transactions.value
  .filter((transaction) => transaction.amount < 0)
  .reduce((acc, transaction) =>{
    return acc + transaction.amount
  }, 0)
  .toFixed(2)
})
// Get total
const total = computed(() =>{
  return transactions.value.reduce((acc, transaction) =>{
    return acc + transaction.amount
  }, 0)
})

// Add transaction data
const handleTransactionSubmitted = (transactionData) =>{
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount
  })
  saveTransactionsToLocalStorage()
  toast.success('Transaction added !!')
}

// generate unique ID
const generateUniqueId = () =>{
  return Math.floor(Math.random() * 1000000)
}

// Delete a transaction 
const handleTransactionDeleted = (id) =>{
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
  saveTransactionsToLocalStorage()
  toast.success('Transaction deleted')
}

// Save to localStorage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>