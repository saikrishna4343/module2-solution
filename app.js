(function(){
'use strict'

angular.module("shoppingListApplication",[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ["ShoppingListCheckOffService"]
function ToBuyController(ShoppingListCheckOffService){
  let itemsToBuy = this
  itemsToBuy.items = ShoppingListCheckOffService.getItems("itemsToBuyArray")
  itemsToBuy.addToBought = function(itemName,quantity,index){
    try{
      ShoppingListCheckOffService.addItemBought(itemName,quantity,index)
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

  service.addItemBought = function(itemName,quantity,itemIndex){
    let item ={
      itemName: itemName,
      quantity: quantity
    }


    let indexNumber  = service.search(itemName, itemsBought)

    debugger

    if(indexNumber === -1){
      itemsBought.push(item)
      debugger
      itemsTOBuyArray.splice(itemIndex,1)
      debugger

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
// !function(){"use strict";function t(t){let e=this;e.items=t.getItems("itemsToBuyArray"),e.addToBought=function(i){try{t.addItemBought(i),e.errorMessage="",t.checkEmpty()}catch(t){e.errorMessage=t.message}}}function e(t){this.items=t.getItems("itemsBought")}angular.module("shoppingListApplication",[]).controller("ToBuyController",t).controller("AlreadyBoughtController",e).service("ShoppingListCheckOffService",function(){let t=this,e=[{itemName:"Milk",quantity:10},{itemName:"Cookies",quantity:10},{itemName:"water",quantity:10},{itemName:"Cookies",quantity:5},{itemName:"Rice",quantity:20}],i=[];t.addItemBought=function(r,n,o){let s={itemName:r,quantity:n},u=t.search(r,i);if(-1!==u)throw e.splice(o,1),new Error("Item Already Bought");i.push(s),e.splice(o,1)},t.getItems=function(t){if("itemstobuyarray"===t.toLowerCase())return e;if(i.length===e.length)throw new Error("All items bought");return i},t.search=function(t,e){if(0===e.length)return-1;for(let i=0;i<e.length;i++)if(e[i].itemName===t)return i;return-1},t.checkEmpty=function(){if(0===e.length)throw new Error("Everything is Bought!")}}),t.$inject=["ShoppingListCheckOffService"],e.$inject=["ShoppingListCheckOffService"]}();
