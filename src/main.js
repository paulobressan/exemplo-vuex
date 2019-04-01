import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.config.productionTip = false

//Usando o vuex
Vue.use(Vuex)

// Criando um store Global
const store = new Vuex.Store({
  // Estado da aplicação
  state: {
    count: 3,
    // definindo uma lista
    todo: [
      { id: 1, text: 'teste', done: true },
      { id: 2, text: 'teste2', done: false }
    ]
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    //Exemplo mudando o estado de um item de uma lista
    //O getter que usa essa lista é tambem atualizado
    doneTodo: state => {
      state.todo = state.todo.map((todo, index) => {
        if (index == 1)
          todo.done = !todo.done
        return todo
      })
      return state.todo
    },
    // Podemos passar argumentos para um mutation e alterar o estado de acordo com esse argumento
    incrementNumber: (state, number) => state.count = state.count + parseInt(number),
    incrementNumberPayload: (state, payload) => state.count = state.count + parseInt(payload.number)
  },
  /** 
   * O Vuex nos permite definir getters no store. 
   * Você pode pensar neles como dados computados para os stores. 
   * Como os dados computados, o resultado de um getter é armazenado em cache com base em suas dependências
   *  e só será reavaliado quando algumas de suas dependências forem alteradas.
  */
  getters: {
    // Getter para filtrar os done(concluido) da lista de todo no estado
    doneTodos: state => state.todo.filter(todo => todo.done)
  }
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
