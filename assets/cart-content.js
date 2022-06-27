  fetch('/cart.js')
  .then((res)=>res.json())
  .then((data)=>{
    if(data.items.length>0){
      data.items.forEach(function(product, index){
        var price = "'{{ product.line_price }}'";
        console.log(price);
        document.getElementById('drawer_cart_items').innerHTML = '<img src="' + product.featured_image.url + '" alt="' + product.featured_image.alt +'" /><h5>' + product.title + '</h5><p>' + product.quantity +' x ' + {{ product.line_price | money_without_currency }} + '</p>'
      });
    }
    else{
      document.getElementById('drawer_cart_items').innerHTML ='<p>Please add some items</p>';
      document.getElementById('drawer_checkout_btn').setAttribute('button','disabled');
      document.getElementById('drawer_checkout_btn').style.pointerEvents = 'none';
      
    }
    
      document.getElementById('drawer_total_amount').innerHTML = data.total_price;
  });




  <script>
  const loadData = async () => {
    const response = await fetch(window.Shopify.routes.root + 'cart.js')
    const data = await response.json()
    addItems(data);
  }

  let cartItems = document.getElementById('drawer_cart_items');
  const checkBtn = document.getElementById('drawer_checkout_btn');
  const totalAmount = document.getElementById('drawer_total_amount');

  const addItems = (products) => {
    console.log(products);
    const itemEl = document.createElement('div');
    
    products.items.forEach(function(item){
      console.log(item.title);
      const {id, featured_image, title, url, quantity} = item;
      itemEl.classList.add('drawer__items');

      let itemHTML = `
      <div class="drawer__itemm">
        <div class="drawer__item">
        <img src=${featured_image.url} alt="${featured_image.alt}"/>
        <div class="cart_item_title">
          <a href="${url}">${title}</a>
          <p> ${item.final_line_price} </p>
        </div>
        <div class="update_qty">
          <button class="update-btn" data-action="decrement" onclick="updateQty(${id},0)" data-id="${id}">-</button>
          <span>${quantity}</span>
          <button class="update-btn" data-action="increment" onclick="updateQty(${id},1) data-id="${id}">+</button>
        </div>
      </div>
      </div>
      `;
      itemEl.innerHTML += itemHTML;
    })
    cartItems.appendChild(itemEl);
  }

  loadData();



<script>
  var firstChange = true;
  function reloadCart(){
    var target = document.querySelector(`[data-cart-subtotal]`);

    if (!target)return
  
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (firstChange){
        firstChange = false;
        return;
      } else{
          firstChange = true;
        setTimeout(window.location.reload(), 1000);
      }
      
    });    
  });
  
  var config = { attributes: true, childList: true, characterData: true };
  observer.observe(target, config);
    
  }
  document.addEventListener("DOMContentLoaded", function() {
    
    reloadCart();
  });
    
    selectElements = document.getElementsByClassName(`cart__qty-input`);
      var allOne = true;
    
    for (i = 0; i < selectElements.length; i++ ) {
        if (selectElements[i].getAttribute("value") > 1) {
          allOne = false;
        }
    }
  //   console.log(allOne);
    if (allOne == true) {
      firstChange = false;
    }

</script>


{%- if cart != empty -%}
      <div id="drawer_cart_items">
        {%- for item in cart.items -%}
          {%- if item.image -%}
            <div class="">
              <img
                src="{{ item.image | image_url: width: 140 }}"
                alt="{{ item.image.alt | escape }}"
                width="20"
                height="20"
                loading="lazy"
              >
              <div class="cart_item_title">
                <a href="{{ item.url }}">{{ item.title }}</a>
                <p> {{ item.final_line_price | money }} </p>
              </div>
            </div>
            <div class="qty-update">
              <input data-ajax-cart-quantity-input="{{ forloop.index }}" value="{{ item.quantity }}" type="number" />
            </div>
          {%- else -%}
              <h4>Please add some products to your cart to continue</h4>
          {%- endif -%}
        {%- endfor -%}
      <div id="drawer_cart_bottom">
        <h4>Total amount: <span id="drawer_total_amount">{{ cart.total_price | money }}</span></h4>
        <a href="{{ routes.cart_url }}" id="drawer_checkout_btn" class="button" style="width:100%">Checkout</a>
      </div>
      {%- endif -%}


<section class="drawer" id="drawer-name" data-drawer-target>
  <div class="drawer__overlay" data-drawer-close tabindex="-1"></div>
  <div class="drawer__wrapper">
    <div class="drawer__header">
      <button class="drawer__close" data-drawer-close aria-label="Close Drawer"></button>
      <div class="drawer__title">
        My Cart
      </div>
      
    </div>
    <div class="drawer__content">
      {%- if cart != empty -%}
      <div id="drawer_cart_items">
        {%- for item in cart.items -%}
          {%- if item.image -%}
            <div class="">
              <img
                src="{{ item.image | image_url: width: 140 }}"
                alt="{{ item.image.alt | escape }}"
                width="70"
                height="{{ 70 | divided_by: item.image.aspect_ratio | ceil }}"
                loading="lazy"
              >
              <div class="cart_item_title">
                <a href="{{ item.url }}">{{ item.title }}</a>
                <p> {{ item.final_line_price | money }} </p>
              </div>
            </div>
            
          {%- endif -%}
        {%- endfor -%}
      <div id="drawer_cart_bottom">
        <h4>Total amount: <span id="drawer_total_amount"></span></h4>
        <a href="{{ routes.cart_url }}" id="drawer_checkout_btn" class="button" style="width:100%">Checkout</a>
      </div>
      {%- endif -%}
  </div>
</section>
































    
</script>