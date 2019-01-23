<template>
    <div class="users-list">
        Search
        <input v-model="searchQuery">
        <button @click="showOnlyFavorites = !showOnlyFavorites">Show only favorites</button>
        <users-list-grid :filter-key="searchQuery" :showOnlyFavorites="showOnlyFavorites"/>
    </div>
</template>

<script>
import UsersListGrid from "./UsersListGrid";
export default {
    name: "UsersList",
    data() {
        return {
            showOnlyFavorites: false,
            searchQuery: ""
        };
    },
    components: {
        UsersListGrid
    }
};
</script>

<style>
.users-list {
    display: inline-block;
}
</style>
