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
        cart: [],
        newSearch: 'anime',
        lastSearch: '',
        loading: false,
        price: 9.99
    },
    methods: {
        onSubmit: function () {
            this.items = [];
            this.loading = true;
            this.$http.get('/search/'.concat(this.newSearch)).then(function (response) {
                this.lastSearch = this.newSearch;
                this.items = response.data;
                this.loading = false;
            });
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
    }
})