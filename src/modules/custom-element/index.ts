import { defineCustomElement } from "vue";


const MyVueElement = defineCustomElement({
  setup(props, ctx) {

  },

});


customElements.define("my-vue-elemnt", class extends HTMLElement {

});
