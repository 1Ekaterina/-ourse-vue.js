import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categories: []
    },
    mutations: {
        setPaymentsListData(state, payload) {
            // Реактивность 
            //state.paymentsList[0] = payload
            //state.paymentsList = [...state.paymentsList]
            //Vue.set(state.paymentsList,0, payload)
            state.paymentsList = payload;
        },
        addDataToPaymentList(state, payload) {
            state.paymentsList.push(payload)
        },
        setCategoriesListData(state, payload) {
            state.categories = [...state.categories, ...payload]
        },
        deleteItemFromPaymentsList(state, payload) {
            state.paymentsList = state.paymentsList.filter(item => item.id !== payload)
        },
        updateDataToPaymentsList(state, payload) {
            const item = state.paymentsList.find(item => item.id === payload.id)
            if (item) {
                Object.assign(item, payload)
            }
        }
    },
    getters: {
        getPaymentsList: state => state.paymentsList,
        getFullPaymentValue: state => {
            return state.paymentsList.reduce((res, cur)=>res + cur.value, 0)
        },
        getCategories: state => state.categories
    },
    actions: {
         fetchData({commit}) {
            return new Promise(res => {
                setTimeout(() => {
                    const items = []
                    let obj = {
                        "page1": [
                            {"id": 1, "date": "20.03.2020", "category": "Food", "value": 169},
                            {"id": 2, "date": "21.03.2020", "category": "Navigation", "value": 50},
                            {"id": 3, "date": "22.03.2020", "category": "Sport", "value": 450}
                        ],
                        "page2": [
                            {"id": 4, "date": "23.03.2020", "category": "Entertaiment", "value": 969},
                            {"id": 5, "date": "24.03.2020", "category": "Education", "value": 1500},
                            {"id": 6, "date": "25.03.2020", "category": "Food", "value": 200}
                        ],
                    }
                    for (let objKey in obj) {
                        obj[objKey].forEach((item) => {
                            items.push(item)
                        })
                    }
                    res(items);
                }, 100);
            })
                .then(res => {
                    commit("setPaymentsListData", res);
                })
                .catch("error");
        },
        fetchCategoryList({commit}) {
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    const categories = ['Sport', 'Food', "Education", 'Internet', 'Other']
        
                    resolve(categories)
                },2000)
            })
            .then(res=> commit('setCategoriesListData', res))
        },
        addData({commit}, payload){
            console.log(commit, payload)
        }
    },
})