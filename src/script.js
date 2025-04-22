let shop = document.getElementById('shop')
 
 // ! " {JSON.parse(localStorage.getItem("db")) } "  get the data from our local storage if there is not any data in the local storage  to prevent error we pass an empty array.....
 let store = JSON.parse(localStorage.getItem("db")) || []
 
 
 let generateCard = () => {
     return (shop.innerHTML= data.map((item) => {
         let {id, name, price, description, img} = item;
         
         // ? if we find anything in the localStorage then get the qty or do nothing
 
         let search = store.find((x) => x.id === id) || [];
 
         return(
             `
         <div id=product-id-${id} class="item">
             <img width="220" src=${img} alt="t-shirt">
 
 
             <div class="details">
                 <h3>${name}</h3>
                 <p>${description}</p>
 
             
                 <div class="price-qty">
                     <h2><i class="bi bi-currency-rupee"></i>${price}</h2>
 
                     <div class="button">
                         <i onClick="decrement(${id})" class="bi bi-dash-lg"></i>
                         <div id=${id} class="qty">${search.qty === undefined? 0 : search.qty}</div>
                         <i onClick="increment(${id})" class="bi bi-plus-lg"></i>
                     </div>
                 </div>
 
             </div>
         </div>
     `
         )
     }).join(''))
 }
 
 
 generateCard();
 
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
 
     calculation()
 }
 
 
 let calculation = () => {
     let cartnum = document.getElementById("cart-amount")
 
     cartnum.innerHTML = store.map((item) => item.qty).reduce((acc, q) => acc+q, 0)
     // console.log(store.map((item) => item.qty).reduce((acc, q) => acc+q, 0))
     
 }
 
 // ? every time when  the web is run envoke this, by this if there is anything in the localstorage then it calculate those update the ui 
 calculation()
