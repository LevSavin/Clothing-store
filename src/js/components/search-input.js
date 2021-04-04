Vue.component('search-input', {
    template: `<input class="featured__search" v-model="search" v-on:input="searchHandler" placeholder="What are we looking for?">`,
    data() {
        return {
            search: '',
        }
    },
    methods: {
        searchHandler() {
            this.$emit('search', this.search);
        },
    }
})