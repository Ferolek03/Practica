//Create a new component for product-details with a prop of details. 

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})



Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
   <div class="product">
        
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
          <h1>{{ product }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>
          <div v-for="size in sizes">{{size}}</div>      
          <info-tabs :shipping="shipping" :details="details"></info-tabs> 
          <product-details :details="details"></product-details>

          <div class="color-box"
               v-for="(variant, index) in variants" 
               :key="variant.variantId"
               :style="{ backgroundColor: variant.variantColor }"
               @mouseover="updateProduct(index)"
               >
          </div> 

          <p>Cart({{ cart.length }})</p>

          <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
          Add to cart
          </button>

          <button 
            v-on:click="removeToCart">Remove from cart
          </button>

          <div class="cart">
            <p>Cart({{ cart }})</p>
          </div>

       </div>  
    
    </div>
   `,


  data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        description: "A pair of warm, fuzzy socks",
        selectedVariant: 0,
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        altText: "A pair of socks",
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        reviews: [],
        variants: [
          {
            variantId: 2234,
            variantColor: 'green',
            variantImage:  'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
            variantQuantity: 10     
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
            variantQuantity: 0     
          }
        ],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        cart: 0
    };
  },
    methods: {
      addToCart: function() {
        this.$emit("add-to-cart",
        this.variants[this.selectedVariant].variantId);
      },
      updateProduct: function(index) {  
          this.selectedVariant = index; 
          console.log(index);
      }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product  
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
          if (this.premium) {
            return "Free"
          }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: [],
    },
    methods: {
      updateCart(id) {
        this.cart.push(id);
      },
   }
   
})