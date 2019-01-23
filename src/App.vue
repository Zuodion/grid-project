<template>
    <UsersList/>
</template>

<script>
import UsersList from './components/UsersList/UsersList'

export default {
  name: 'app',
  components: {
    UsersList
  }
}
</script>

<style>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}
</style>
