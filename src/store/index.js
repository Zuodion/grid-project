import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import UserModel from '../models/UserModel.js'

Vue.use(Vuex);

const RECEIVE_USERS = 'RECEIVE_USERS';
const CHANGE_USER_FAVORITE = 'CHANGE_USER_FAVORITE';

const state = {
    users: [],
    favoriteUsers: localStorage.getItem('favoriteUsers') || []
}

const getters = {
    users: state => state.users
}

const actions = {
    sendRequest({
        commit
    }) {
        axios.get('/users.json').then((response) => {
            const users = response.data.users;
            commit(RECEIVE_USERS, users)
        })
    },
    changeUserFavorite({
        commit
    }, data) {
        commit(CHANGE_USER_FAVORITE, data)
    }
}

const mutations = {
    [RECEIVE_USERS](state, data) {
        let users = [];
        for (let userId = 0; userId < data.length; userId++) {
            const user = new UserModel(data[userId])
            if (state.favoriteUsers.indexOf(user.name) !== -1) {
                user.favorite = true;
            }
            users.push(user)
        }
        state.users = users;
    },
    [CHANGE_USER_FAVORITE](state, {
        user,
        favorite
    }) {
        user.favorite = favorite
        if (user.favorite) {
            state.favoriteUsers.push(user.name)
            localStorage.setItem('favoriteUsers', state.favoriteUsers)
        } else {
            state.favoriteUsers.splice(state.favoriteUsers.indexOf(user.name), 1);
            localStorage.setItem('favoriteUsers', state.favoriteUsers)
        }
    }
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;