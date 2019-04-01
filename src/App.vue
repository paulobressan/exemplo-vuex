<template>
  <div id="app">
    <h1>{{count}}</h1>
    <button @click="incrementa">+</button>
    <button @click="decrementa">-</button>
    <br>
    <button @click="incrementaColor" :class="color">Local</button>
    <br>
    <ul>
      <li v-for="todo of doneTodos" :key="todo.id">{{todo.text}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      localCount: 4
    };
  },
  methods: {
    incrementa() {
      this.$store.commit("increment");
    },
    decrementa() {
      this.$store.commit("decrement");
    },
    incrementaColor() {
      this.localCount++;
      //Exemplo de alterando um item da lsita de todo depois de 1 minuto.
      //Alteração feita atraves de commit
      setTimeout(() => {
        this.$store.commit("doneTodo");
      }, 1000);
    }
  },
  // Para usar o estado do vuex, temos que chamar a variavel passada por props, this.$store.state
  // Ou usar o mapState para maperar os estados para o componente
  //computed: mapState(["count"])
  // Porem podemos ter mais de um dado computado e para isso podemos usar o spread operator(...) para desmenbrar
  // O retorno da função mapState e computar um objeto computado
  computed: {
    color() {
      return this.localCount > 10 ? "red" : "blue";
    },
    ...mapState({
      // Para mapear, temos usar um callback esperando o state e o retorno no caso a baixo é o count que esta definido no state da store
      count: state => state.count,
      // Podemos realizar operações com o estado da store e o estado local do componente
      countPlusLocalCount(state) {
        return state.count + this.localCount;
      }
    }),
    //Acessando um getter
    todoDone() {
      return this.$store.getters.doneTodos;
    },
    //Acessando um getter com um helper mapGetters
    ...mapGetters(["doneTodos"]),
    //Ou podemos mapear um getter com um nome diferente
    ...mapGetters({
      getterDoneTodos: "doneTodos"
    })
  }
  //Podemos passar um array com os nomes dos estados que quemos utilizar no contexto do componente
  // Evitando sempre chamar um callback para mapear os state
  /**
   ...mapState([
      'count'
   ])
   */
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.red {
  background: red;
}

.blue {
  background: blue;
}
</style>


// {
//     count: state => state.count,
//     countAlias: "count",
//     countPlusLocalState(state) {
//       return state.count + this.localCount;
//     }
//   }
