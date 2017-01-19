new Vue({
    el : '#app',
    data: {
        total: 0,
        items: [
            { id:1, title: 'Item 1', price: 33.98},
            { id:2, title: 'Item 2', price: 10.08},
            { id:3, title: 'Item 3', price: 110.90}
        ],
        cart: []
    },
    methods: {
        addItem: function(index){
            var item = this.items[index];
            this.total += item.price;
            var found = false;
            for(var i = 0; i < this.cart.length; i ++){
                if(this.cart[i].id == item.id){
                    this.cart[i].qty++;
                    found = true;
                }
            }

            if(!found){
                this.cart.push({
                    id: item.id,
                    title:  item.title,
                    qty: 1,
                    price: item.price
                });
            }
        }
    },
    filters: {
        currency: function(price){
            return 'R$ '.concat(price.toFixed(2));
        }
    }
})