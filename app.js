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
    }catch(error){
      itemsToBuy.errorMessage= error.message
    }
  }

}

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]
function AlreadyBoughtController(ShoppingListCheckOffService){
  let itemsBought= this

  try{
    itemsBought.items = ShoppingListCheckOffService.getItems("itemsBought")
    debugger
  }catch(error){
    itemsBought.errorMessage = error.message
  }

}

function ShoppingListCheckOffService(){
  let service = this

  let itemsTOBuyArray=[{
    itemName:"Milk"
  },
{
  itemName:"Chicken"
},{
  itemName: "water"
}]

  let itemsBought = []

  service.addItemBought = function(itemName){
    let item ={
      itemName: itemName
    }

    let indexNumber  = itemsBought.indexOf(item.itemName)
    debugger
    if(indexNumber === -1){
      itemsBought.push(item.itemName)
    }
    else{
      debugger
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
}


})();
