import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categories: []
    },
    mutations: {
        setPaymentListData(state, payload) {
            // Реактивность 
            //state.paymentsList[0] = payload
            //state.paymentsList = [...state.paymentsList]
            //Vue.set(state.paymentsList,0, payload)
            state.paymentsList = payload
        },
        addDataToPaymentList(state, payload) {
            state.paymentsList.push(payload)
        },
        setCategoriesListData(state, payload) {
            state.categories = payload
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
            if(this.state.paymentsList.length) return 
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    const items = []
                    for (let i = 0; i < 20; i++) {
                        items.push({
                            date: "12.08.2021",
                            category: "Internet",
                            value: i+101
                        })
                    }
                    resolve(items)
                },2000)
            })
            .then(res=> commit('setPaymentListData', res))
        },
        fetchCategoryList({commit}) {
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    const categories = ['Sport', 'Food', "Education", 'Internet', 'Other']
        
                    resolve(categories)
                },2000)
            })
            .then(res=> commit('setCategoriesListData', res))
        }
    },
})