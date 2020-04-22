(function(){

angular.module("shoppingListApplication",[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ["ShoppingListCheckOffService"]
function ToBuyController(ShoppingListCheckOffService){
  let itemsToBuy = this
  itemsToBuy.items = ShoppingListCheckOffService.getItems("itemsToBuyArray")
  itemsToBuy.addToBought = function(itemName){
    try{
      ShoppingListCheckOffService.addItemBought(itemName)
      itemsToBuy.errorMessage=""
      ShoppingListCheckOffService.checkEmpty()
    }catch(error){
      itemsToBuy.errorMessage= error.message
    }
  }

}

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]
function AlreadyBoughtController(ShoppingListCheckOffService){
  let itemsBought= this

  itemsBought.items = ShoppingListCheckOffService.getItems("itemsBought")
}

function ShoppingListCheckOffService(){
  let service = this

  let itemsTOBuyArray=[{
    itemName:"Milk",
    quantity: 10
  },
{
  itemName:"Cookies",
  quantity: 10
},{
  itemName: "water",
  quantity: 10
},{
  itemName: "Cookies",
  quantity: 5
},{
  itemName:"Rice",
  quantity: 20
}]

  let itemsBought = []

  service.addItemBought = function(itemName,itemQuantity,itemIndex){
    let item ={
      itemName: itemName,
      quantity: itemQuantity
    }


    let indexNumber  = service.search(itemName, itemsBought)


    if(indexNumber === -1){
      itemsBought.push(item)
      itemsTOBuyArray.splice(itemIndex,1)

    }
    else{
      itemsTOBuyArray.splice(itemIndex,1)
      throw new Error("Item Already Bought")
    }
  }

  service.getItems = function(arrayName){
    if(arrayName.toLowerCase() === "itemstobuyarray"){
      return itemsTOBuyArray
    }
    else{
      if(itemsBought.length === itemsTOBuyArray.length){
        throw new Error("All items bought")
      }
      else{
          return itemsBought
      }

    }
  }

  service.search= function(itemName, itemsBought){
    if(itemsBought.length === 0){
      return -1
    }

    for (let i=0; i < itemsBought.length; i++) {
      if (itemsBought[i].itemName=== itemName) {
          return i
      }
    }
    return -1
  }

  service.checkEmpty = function(){
    if(itemsTOBuyArray.length ===0){
      throw new Error("Everything is Bought!")
    }
  }
}


})();
