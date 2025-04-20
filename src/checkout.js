let label = document.getElementById("label")
let wishList = document.getElementById("wish-list-cart")

// ? getting the data saved on our local storage in order to update the checkout page 
let store = JSON.parse(localStorage.getItem("db")) || [];
// console.log(store)

let calculation = () => {
    let cartnum = document.getElementById("cart-amount")

    cartnum.innerHTML = store.map((item) => item.qty).reduce((acc, q) => acc+q, 0)
    // console.log(store.map((item) => item.qty).reduce((acc, q) => acc+q, 0))
    
}

// ? every time when  the web is run envoke this, by this if there is anything in the localstorage then it calculate those update the ui 
calculation()

// ? two cases here 1 - if we have data in our local storage ...
// ! 2 - if we don't have the data on local storage ...
let generateCart = () => {
    if (store.length !== 0){
        return (wishList.innerHTML = store.map((items) => {
            let {id, qty} = items;

            // ! searching for the selected if it is in our data.js and extracting some info from it like name and img..... 
            let search = data.find((product) => product.id === id) || [];
            
            // ?destructuring 
            let {img, name, price} = search;

            return( `
            <div class = "cartItem">
                <img width = "100" height="100"src=${img} alt="t-shirt" />
                <div class = "details">

                    <div class="item-price">
                        <h4 class="name-price">
                            <p>${name}</p>
                            <p class="price"><i class="bi bi-currency-rupee"></i> ${price}</p>
                            
                        </h4>
                        <i onClick="removeCard(${id})" class="bi bi-x-lg"></i>
                    </div>


                    <div class="button">
                        <i onClick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="qty">${qty}</div>
                        <i onClick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>


                    <h3><i class="bi bi-currency-rupee"></i> ${qty * price}</h3>
                </div>

            </div>
            `);
        }).join(''))
    }
    // ! run only when localstorage is empty..... 
    else{
    wishList.innerHTML = ``
    label.innerHTML = `
    <h2>Cart is empty </h2>
    <a href="index.html">
        <button class = "homeButton">Go to Home</button>
    </a>
    ` 
        


        
    }
}

generateCart()

// ! responsible for increasing the qty ....
let increment = (id) => {
    let selectedItem  = id;

    // searching for the whether it is in the store or not ......
    
    let search = store.find((x) => x.id === selectedItem.id)

    // ? if the item is not in store then add it in store and set qty - 1 else just increase the qty of that item......
    if(search === undefined){
        store.push({
            id: selectedItem.id,
            qty: 1,
        })
    }else{
        search.qty += 1
    }
    // console.log(store)
    generateCart()
    update(selectedItem.id)

    // ! adding local storage functionality so that when we refresh the changes remain same doesn't reset......
    // ? we want when we click increment or  decrement localstorage should invoked

    localStorage.setItem("db", JSON.stringify(store));
}

// ! responsible for decreasing the qty ....
let decrement = (id) => {
    let removedItem  = id;

    let search = store.find((x) => x.id === removedItem.id)

    if (search === undefined) return
    // ? if the item qty is 0 then stop decrement else decrement 1 by everyclick......
    else if(search.qty === 0){
        return
    }else{
        
        search.qty -= 1
    }

    update(removedItem.id) 

    // ? here we filtering out those data which qty is not 0 in the 'store' array....
    store = store.filter((x) => x.qty !== 0)

    // ! when card or item qty hit 0 it rerenders our cart and print only those whose have some qty ...
    // when hit 0 it again go to generateCart
    generateCart()
    // console.log(store)
    

     // ! setting the localstorage here .....
    // ? then updating the localstorage with data of store array........
    localStorage.setItem("db", JSON.stringify(store));
}

// ! responsible for updating the qty number....
let update = (id) => {

    // ? creating search funtion ----- if and only if the item exist in store the number will increase.....


    let search = store.find((x) => x.id === id)


    // ! updating the qty number by accessing it with id...... 
    document.getElementById(id).innerHTML = search.qty

    // console.log(search.qty);

    calculation();
    totalBill();
}


let removeCard = (id) => {
    let choosedItem = id

    // ! by filtering out we romve the choosed item from store-data 
    store = store.filter((card) => card.id !== choosedItem.id);

    // ! rerender the generateCart() again to show the latest data  
    generateCart()
    totalBill()

    calculation();
    localStorage.setItem("db", JSON.stringify(store));
    
    
}

// ? here also two when we have some data and other where we do not anything

let clearCart = () => {
    store = [];
    generateCart();
    calculation();
    localStorage.setItem("db", JSON.stringify(store));
    
}

let totalBill = () => {
    if (store.length !== 0){
        let amt = store.map((product) => {
            let {qty, id} = product
            // ! search according to id and locate the data ... 
            let search = data.find((product) => product.id === id) || [];

            return (qty * search.price)

        }).reduce((acc, total) => acc + total, 0)
        // console.log(amt)
        label.innerHTML = `
        <h2>Total Bill: <i class="bi bi-currency-rupee"></i> ${amt}</h2>
        <button class="Checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear</button>
        `
    }
    else{
        return
    }
}

totalBill()

