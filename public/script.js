function binarySearch(array, key) {
    var lo = 0,
        hi = array.length - 1,
        mid,
        element;
    while (lo <= hi) {
        mid = ((lo + hi) >> 1);
        element = array[mid].id;
        if (element < key) {
            lo = mid + 1;
        } else if (element > key) {
            hi = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

new Vue({
    el : '#app',
    data: {
        total: 0,
        items: [
            { id:1, title: 'Item 1', price: 33.98},
            { id:2, title: 'Item 2', price: 10.08},
            { id:3, title: 'Item 3', price: 110.90},
            { id:4, title: 'Item 4', price: 10.90},
            { id:5, title: 'Item 5', price: 11.91},
            { id:6, title: 'Item 6', price: 7.03},
            { id:7, title: 'Item 7', price: 3.80},
            { id:8, title: 'Item 8', price: 4.25},
            { id:9, title: 'Item 9', price: 1100.07},
        ],
        cart: []
    },
    methods: {
        addItem: function(index){
            var item = this.items[index];
            this.total += item.price;
            var found = binarySearch(this.cart, item.id);

            if(found === 0){
                this.cart[index].qty++;
            }

            if(found < 0){
                this.cart.push({
                    id: item.id,
                    title:  item.title,
                    qty: 1,
                    price: item.price
                });
            }
        },
        inc: function (item) {
            item.qty++;
            this.total += item.price;
        },
        dec: function (item, index) {
            var found = binarySearch(this.cart, item.id);
            item.qty--;
            this.total -= item.price;
            if (item.qty <= 0){
                this.cart.splice(index, 1);
            }
        }
    },
    filters: {
        currency: function(price){
            return 'R$ '.concat(price.toFixed(2));
        }
    }
})