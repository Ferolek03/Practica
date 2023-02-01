// let product = "Socks";

let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        brand: "Vue Mastery",
        description: "A pair of warm, fuzzy socks.",
        altText: "A pair of socks",
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventory: 100,

        selectedVariant: 0,


        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10,
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantQuantity: 0,
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            }
        ], cart: 0, onSale: true,
    },

    methods: {
        addToCart() {
            this.cart += 1
        },
        delToCart() {
            this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }

    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            return this.brand + ' ' + this.product + ' are not on sale'
        }


    }



})
