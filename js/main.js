//Create a new component for product-details with a prop of details. 
let eventBus = new Vue();


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
});



Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
  <div class="product">
  <div class="product-image">
      <img :src="image" :alt="altText"/>
  </div>
  <div class="product-info">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <a v-bind:href="link">More products like this</a> <br>
      <p v-if="inStock">In stock</p>
      <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
      <p v-else style="text-decoration: line-through">Out of Stock</p>
      <span v-if="onSale">ON SALE</span>
      
      <span v-else="onSale"></span> 
      <p>{{sale}}</p>
      <div v-for="size in sizes">{{size}}</div>      
      
      <div class="color-box" v-for="(variant, index) in variants" 
      :key="variant.variantId" 
      :style="{ backgroundColor:variant.variantColor }" @mouseover="updateProduct(index)">
      </div>

      <button 
      v-on:click="addToCart":disabled="!inStock"
        :class="{ disabledButton: !inStock }"> Add to cart </button><br>
        <button v-on:click="removeToCart">Remove from cart</button>
  </div>
      <product-tabs :reviews="reviews" :shipping="shipping" :details="details"></product-tabs>
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
    addToCart() {
      this.$emit(
        "add-to-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    removeToCart() {
      this.$emit(
        "remove-to-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
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
        },
        sale() {
          if (this.onSale) {
            return this.brand + " " + this.product + " are on sale";
          }
          return this.brand + " " + this.product + " are not sale";
        },
      },
      mounted() {
        eventBus.$on("review-submitted", (productReview) => {
          this.reviews.push(productReview);
        });
      },

    },
    Vue.component("product-review", {
      template: `
          <form class="review-form" @submit.prevent="onSubmit">
               <p>
               <label for="name">Name:</label>
               <input required id="name" v-model="name" placeholder="name">
               <input @click="hideReview" type="submit" value="Confirm name"> 
               <p v-if="Visibility" class="butrad">??Would you recommend this product???.</p>
                
              <p>
               <label style="display: none" v-show="Visibility" for="radiobuttonfirst" id="rating">yes</label>
               <input style="display: none" v-show="Visibility" type="radio" id="radiobuttonfirst" name="223" value="yes" v-model="question"> 
              </p>

              <p>
               <label style="display: none" v-show="Visibility" for="radiobuttontwo" id="rating">no</label>
               <input style="display: none" v-show="Visibility" type="radio" id="radiobuttontwo" name="223" value="no" v-model="question">
              </p>

               <p>
               <label style="display: none" v-show="Visibility" for="review">Review:</label>
               <textarea required style="display: none" v-show="Visibility" id="review" v-model="review"></textarea>
               </p>

               <p v-if="question == 'yes'">
               <label style="display: none" v-show="Visibility" for="rating">Rating:</label>
               <select style="display: none" v-show="Visibility" id="rating" v-model.number="rating">
                   <option>5</option>
                   <option>4</option>
                   <option>3</option>
                 </select>
               </p>

               <p v-if="question == 'no'">
               <label style="display: none" v-show="Visibility" for="rating">Rating:</label>
               <select style="display: none" v-show="Visibility" id="rating" v-model.number="rating">
                   <option>3</option>
                   <option>2</option>
                   <option>1</option>
                 </select>
               </p>

               <p>
                 <input type="submit" value="Submit"> 
               </p>

                  <p v-if="errors.length">
                       <b>Please correct the following error(s):</b>
                       <ul>
                          <li v-for="error in errors">{{ error }}</li>
                       </ul>
                  </p>
         </form>
   `,
      data() {
        return {
          Visibility: false,
          name: null,
          review: null,
          rating: null,
          question: null,
          errors: [],
        };
      },
      methods: {
        hideReview() {
          this.Visibility = true;},
        onSubmit() {
          if (this.name && this.review && this.rating) 
            
          {
            let productReview = {
              name: this.name,
              review: this.review,
              rating: this.rating,
              question: this.question,
            };
            eventBus.$emit("review-submitted", productReview);
            eventBus.$emit("on-message", "?????????? ????????????????????");
            this.name = null;
            this.review = null;
            this.rating = null;
            this.question = null;
          } else {
            if (!this.name) this.errors.push("Name required.");
            if (!this.review) this.errors.push("Review required.");
            if (!this.rating) this.errors.push("Rating required.");
            if (!this.question) this.errors.push("Question required.");
          }
        },
      },
    }),
    Vue.component("product-tabs", {
      props: {
        reviews: {
          type: Array,
          required: false,
        },
        shipping: {
          required: true,
        },
        details: {
          type: Array,
          required: true,
        },
      },
      template: `
       <div>   
         <ul>
           <span class="tab" 
           :class="{ activeTab: selectedTab === tab }"
           v-for="(tab, index) in tabs"
           @click="selectedTab = tab"
           :key="tab"
           >{{ tab }}</span>
         </ul>
         <div v-show="selectedTab === 'Reviews'">
           <p v-if="!reviews.length">There are no reviews yet.</p>
           <ul v-else>
             <li v-for="review in reviews"
             :key="index">
             <p>{{ review.name }}</p>
             <p>Rating: {{ review.rating }}</p>
             <p>{{ review.review }}</p>
             <p>{{review.question}}</p>
             </li>
           </ul>
         </div>
         <div v-show="selectedTab === 'Make a Review'">
           <product-review ></product-review>
         </div>
         <div v-show="selectedTab === 'Shipping'">
          <p>{{ shipping }}</p>
        </div>
        <div v-show="selectedTab === 'Details'">
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
        </div>
       </div>
  `,
      data() {
        return {
          tabs: ["Reviews", "Make a Review","Shipping", "Details"],
          selectedTab: "Reviews",
        };
      },
    })
  );
  

  let app = new Vue({
    el: "#app",
    data: {
      premium: true,
      cart: [],
    },
    methods: {
      updateCart(id) {
        this.cart.push(id);
      },
      removeCart(id) {
        for (let i = this.cart.length - 1; i >= 0; i--) {
          if (this.cart[i] === id) {
            this.cart.splice(i, 1);
          }
        }
      },
    },
  });