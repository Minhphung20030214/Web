let carts = document.querySelectorAll('.btn');
let products =[
    {
        name: 'Áo croptop caro',
        tag: 'Áo',
        price: 10.5,
        incart: 0
    }
] 
for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.numberCart').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.numberCart').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.numberCart').textContent = 1;
    } 
    setItem(product);
}
function setItem(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        cartItems['Áo']
        cartItems[product.tag].incart += 1;
    }else{
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
     
     product.incart = 1;
     localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product){
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is",cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price)
    }
}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
     console.log(cartItems);
    if(cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <div class="product-details">
                        <i class="fa fa-times-circle" id="iconClose" aria-hidden="true"></i>
                        <img src="../img/${3}.jpg">
                        <span>${item.name}</span>
                    </div>
                    
                    <div class="price">$${item.price},00</div> 
                    
                    <div class="quantity">
                        <i class="fa fa-chevron-circle-left"></i>
                        <span>${item.incart}</span>
                        <i class="fa fa-chevron-circle-right"></i>
                    </div> 

                    <div class="total">
                        $${item.incart * item.price},00
                    </div>
                </div>
            `
        })
    }
}
    onLoadCartNumbers();
    displayCart();