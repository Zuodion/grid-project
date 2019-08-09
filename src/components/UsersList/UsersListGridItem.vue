<template>
    <tr>
        <td>{{ model.name }}</td>
        <td :class="model.age < 150 ? 'normal' : 'odd'">{{ model.age }}</td>
        <td>{{ model.email }}</td>
        <td>{{ model.country }}</td>
        <td @click="favorite(model)">
            <favorite-user :favorite="model.favorite"/>
        </td>
    </tr>
</template>

<script>
import UserModel from "../../models/UserModel.js";
import FavoriteUser from "./FavoriteUser";
export default {
    name: "UsersListGridItem",
    components: {
        FavoriteUser
    },
    props: {
        model: UserModel,
        filteredData: Function
    },
    methods: {
        favorite(user) {
            this.$store.dispatch("changeUserFavorite", {
                user: user,
                favorite: !user.favorite
            });
        }
    }
};
</script>

<style>
.normal {
    color: black;
}
.odd {
    color: brown;
}

td {
    background-color: antiquewhite;
    min-width: 120px;
    text-align: center;
    padding: 10px 20px;
}
</style>
