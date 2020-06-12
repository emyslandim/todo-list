import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        activities: []
    },
    mutations: {
        addActivity(state, activity) {
            state.activities.push(activity);
            localStorage.setItem('activities', JSON.stringify(state.activities))
        },
        deleteActivity(state, activity) {
            state.activities = state.activities.filter((item) => item.id !== activity);
            localStorage.setItem('activities', JSON.stringify(state.activities))
        },
        finishedActivity(state, activity) {
            state.activities.map(item => {
                item.id === activity ? item.completed = !item.completed : false
            })
            localStorage.setItem('activities', JSON.stringify(state.activities));
        }
    },
    actions: {
        addActivity({ commit }, activity) {
            commit('addActivity', activity)
        },
        deleteActivity({ commit }, activity) {
            commit('deleteActivity', activity)
        },
        finishedActivity({ commit }, activity) {
            commit('finishedActivity', activity)
        }
    },
    getters: {
        getActivities(state) {
            const activities = JSON.parse(localStorage.getItem("activities"));
            if (activities !== null) {
                state.activities = activities;
            }

            return state.activities
        }
    }
})

export default store;