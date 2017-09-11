import Vuex from 'vuex';
import Vue from 'vue';
import ajax from '../ajax';
import URI from '../uri';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tree: [],
        hash: null
    },
    getters: {
        current(state) {
            for (let i = 0; i < state.tree.length; i++) {
                const tree = state.tree[i];
                if (tree.hash === state.hash) {
                    return tree;
                }
            }
        }
    },
    mutations: {
        ['SET-TREE'](state, data) {
            state.tree = data;
        },
        ['SET-HASH'](state, data) {
            state.hash = data;
        }
    },
    actions: {
        async ['DETAIL']({ commit }, { fetch, hash, key }) {
            commit('SET-HASH', hash);
            await fetch(async () => {
                const result = await ajax.get(URI.path('Service:Detail', { hash, key }).toString());
                commit('SET-TREE', result);
            });
        }
    }
});

export default store;