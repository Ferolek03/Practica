// let product = "Socks";

let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        description:  "A pair of warm, fuzzy socks.",
        image: "./assets/vmSocks-blue-onWhite.jpg",
        altText: "A pair of socks",
        inStock: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        onSale: true,
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventory: 100,
        cart: 0,
       
         
        
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            }
        ]
    },

    methods: {
        addToCart() {
            this.cart += 1
        },
        delToCart() {
            this.cart -= 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
         }
         
     }
     


})
 