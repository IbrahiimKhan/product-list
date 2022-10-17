const search = document.querySelector(".search")
const collection = document.querySelector(".collection")
const liItem = document.querySelector(".collection_item")
const form = document.querySelector("form")
const nameInput =document.querySelector(".name")
const priceInput =document.querySelector(".price")
const msgElm = document.querySelector(".msg")
const deleteItem = document.querySelector(".delete")
const ulElm = document.querySelector("ul")



//getting user data
const userData =()=>{  
 name = nameInput.value
 price = priceInput.value
 return {name,price}
}

//error message

const removeMsg = ()=>{
    msgElm.textContent = ""
}
const showMsg = (msg)=>{
    msgElm.textContent = msg
    setTimeout(()=>{
        removeMsg()
     },2000)
}


let products = []

// valditaing form

const validInput = (name,price)=>{
    // checking input empty
    let isValid = true
    if (name =="" || price =="") {
        isValid = false
       showMsg("please fill the input properly")
    }
    if (Number(name)=== Number(name)) {
        isValid = false
        showMsg("Name input mush be name not a number")
    }
    return isValid
    
}
//adding product  into arr
const addProductToArr = (name,price)=>{
    const product = {
        id:products.length+1,
        name,
        price
    }
    products.push(product)
    return product 
   // console.log(products)
}
//adding product to ui
const addProductToUI = (productInfo)=>{
  const{id,name,price} = productInfo
  let list = `<li data-element= "${id}">
  <div>
<strong>Product Name: ${name}</strong>
<strong>Product Price ${price}</strong>
<button class="update">Update</button>
<button class="Delete">Delete</button>
  </div>
</li>`
collection.insertAdjacentHTML("afterbegin",list)
showMsg("Product added successfully")

}

//deleteing the item from array memory
function deleteItemArr(elId){
console.log(typeof elId)
   products =  products.filter((product)=>{
        if (product.id !==elId) {
            return product
        }
    })
    //console.log("item removed from array")
}
//deleting the item from ui
const delItemFromUi=(id)=>{
    // console.log(id)
    document.querySelector(`[data-element="${id}"]`).remove()
    showMsg("Item deleted successfully")
}
//get list id
const getListId =(e)=>{
   if (e.target.classList.contains("Delete")) {
    const idVal = e.target.parentElement.parentElement.getAttribute("data-element")
    const id = Number(idVal)
    deleteItemArr(id)
    delItemFromUi(id)
   }
}
//reset input
const resetInput = ()=>{
    nameInput.value = ""
    priceInput.value = ""

}
//submitting form
const formData = ()=>{
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        //receiving product
        
        const {name,price} =  userData()
        //validating
       const isValid =  validInput(name,price)
       if (!isValid) {
        return
       }
       //resetting input form
       resetInput()
    //    insert in list
   const product =  addProductToArr(name,price)
   addProductToUI(product)
   ///console.log(name,price) 
    
    })
}
formData()

//deleteing list item
ulElm.addEventListener("click",getListId)