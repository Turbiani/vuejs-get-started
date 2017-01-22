const LOAD_NUM = 10;

function binarySearch(array, key) {
    let inicio = 0,
        fim = array.length - 1,
        meio,
        elemento;
    while (inicio <= fim) {
        meio = ((inicio + fim) >> 1);
        elemento = array[meio].id;
        if (elemento < key) {
            inicio = meio + 1;
        } else if (elemento > key) {
            fim = meio - 1;
        } else {
            return meio;
        }
    }
    return -1;
}

new Vue({
    el : '#app',
    data: {
        total: 0,
        items: [],
        results: [],
        cart: [],
        newSearch: 'anime',
        lastSearch: '',
        loading: false,
        price: 9.99
    },
    computed:{
        noMoreItems: function () {
            return this.items.length === this.results.length && this.results.length > 0;
        }
    },
    methods: {
        appendItems: function () {
            if(this.items.length < this.results.length){
                let append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
                this.items = this.items.concat(append);
            }
        },
        onSubmit: function () {
            if(this.newSearch.length){
                this.items = [];
                this.loading = true;
                this.$http.get('/search/'.concat(this.newSearch)).then(function (response) {
                    this.lastSearch = this.newSearch;
                    this.results = response.data;
                    this.appendItems();
                    this.loading = false;
                });
            }
        },
        addItem: function(index){
            var item = this.items[index];
            this.total += this.price;
            var found = binarySearch(this.cart, item.id);

            if(found === 0){
                this.cart[index].qty++;
            }

            if(found < 0){
                this.cart.push({
                    id: item.id,
                    title:  item.title,
                    qty: 1,
                    price: this.price
                });
            }
        },
        inc: function (item) {
            item.qty++;
            this.total += this.price;;
        },
        dec: function (item, index) {
            var found = binarySearch(this.cart, item.id);
            item.qty--;
            this.total -= this.price;
            if (item.qty <= 0){
                this.cart.splice(index, 1);
            }
        }
    },
    filters: {
        currency: function(price){
            return 'R$ '.concat(price.toFixed(2));
        }
    },
    mounted: function () {
        this.onSubmit();

        var vueInstance = this;
        var elem = document.getElementById("product-list-bottom");
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function () {
            vueInstance.appendItems();
        });
    }
});