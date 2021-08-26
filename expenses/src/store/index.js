import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categoryList: [],
    },
    mutations: {
        setPaymentsListData(state, payload) {
            state.paymentsList = payload;
        },
        addDataToPaymentsList(state, payload) {
            state.paymentsList.push(payload);
        },
        setCategoryList(state, payload) {
            state.categoryList = payload;
        },
        deleteItemFromPaymentsList(state, payload) {
            state.paymentsList = state.paymentsList.filter(item => item.id !== payload)
        },
        updateDataToPaymentsList(state, payload) {
            let item = state.paymentsList.find(item => item.id === payload.id)
            if(item) {
                Object.assign(item, payload)
            }
        }
    },
    actions: {
        fetchData({commit}) {
            return new Promise(res => {
                setTimeout(() => {
                    const items = []
                    let obj = {
                        "page1": [
                            {"id": 1, "date": "2021-08-12", "category": "Internet", "value": 169},
                            {"id": 2, "date": "2021-08-12", "category": "Navigation", "value": 50},
                            {"id": 3, "date": "2021-08-12", "category": "Sport", "value": 450}
                        ],
                        "page2": [
                            {"id": 4, "date": "2021-04-12", "category": "Sport", "value": 969},
                            {"id": 5, "date": "2021-05-09", "category": "Education", "value": 1500},
                            {"id": 6, "date": "2021-08-05", "category": "Food", "value": 200}
                        ],
                    }
                    for (let objKey in obj) {
                        obj[objKey].forEach((item) => {
                            items.push(item)
                        })
                    }
                    res(items);
                }, 2000);
            })
                .then(res => {
                    commit("setPaymentsListData", res);
                })
                .catch("error");
        },
        fetchCategory({commit}) {
            return new Promise((res) => {
                setTimeout(() => {
                    res(['Food', 'Sport', 'Education', 'Car', 'Internet'])
                }, 1000)
            }).then(res => {
                commit('setCategoryList', res)
            })
        }
    },

    getters: {
        getPaymentsList: state => state.paymentsList,
        getFullPaymentValue: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
        },
        getCategoryList: state => state.categoryList,
    }
});
