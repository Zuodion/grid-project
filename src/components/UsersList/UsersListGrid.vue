<template>
    <div>
        <thead>
            <tr>
                <th
                    v-for="(key, index) in columns"
                    @click="sortBy(key)"
                    :key="index"
                    :class="{ active: sortKey === key }"
                >
                    {{ key }}
                    <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
                </th>
            </tr>
        </thead>
        <tbody>
            <UsersListGridItem
                v-for="(entry, index) in filteredData"
                :key="index"
                :model="entry"
                :columns="columns"
            />
        </tbody>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import UsersListGridItem from "./UsersListGridItem.vue";
export default {
    name: "UsersListGrid",
    components: {
        UsersListGridItem
    },
    props: {
        showOnlyFavorites: Boolean,
        filterKey: String
    },
    data() {
        let sortOrders = {};
        let columns = ["name", "age", "email", "country", "favorite"];
        columns.forEach(function(key) {
            sortOrders[key] = 1;
        });
        return {
            columns: columns,
            sortKey: "",
            sortOrders: sortOrders
        };
    },
    computed: {
        ...mapGetters(["users"]),
        filteredData() {
            let sortKey = this.sortKey;
            let filterKey = this.filterKey && this.filterKey.toLowerCase();
            let order = this.sortOrders[sortKey] || 1;
            let data = this.users;
            if (filterKey) {
                data = data.filter(function(row) {
                    return Object.keys(row).some(function() {
                        return (
                            String(row.name)
                                .toLowerCase()
                                .indexOf(filterKey) > -1 ||
                            String(row.email)
                                .toLowerCase()
                                .indexOf(filterKey) > -1 ||
                            String(row.country)
                                .toLowerCase()
                                .indexOf(filterKey) > -1
                        );
                    });
                });
            }
            if (this.showOnlyFavorites) {
                data = data.filter(user => user.favorite === true);
            }
            if (sortKey) {
                data = data.slice().sort(function(a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }

            return data;
        }
    },
    methods: {
        sortBy: function(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
        }
    },
    mounted() {
        this.$store.dispatch("sendRequest");
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
th {
    background-color: rgba(120, 120, 120, 0.66);
    color: rgba(0, 0, 0, 0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    min-width: 120px;
    padding: 10px 20px;

    &.active {
        color: #999;
        background-color: #333;

        &.arrow {
            opacity: 1;
        }
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;

        &.dsc {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #999;
        }

        &.asc {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid #999;
        }
    }
}
</style>