     window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
     window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
     window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
     if (!window.indexedDB) 
     { 
        window.write("Your browser doesn't support a stable version of IndexedDB."); 
     }
                
       //prepare the data here
      var data=[{productId:productId,quantity:1}];
      var db;
      var request =window.indexedDB.open("localDatabase",1);
request.onerror=function(event){};
request.onsuccess=function(event){db=request.result;};
                
//upgrading
request.onupgradeneeded=function(event)
{
var db = event.target.result; 
var objectStore = db.createObjectStore("cart", {keyPath: "id"}); 
for (var i in data) 
{objectStore.add(data[i]); }     
}
                
//inserting the data
var request = db.transaction(["cart"], "readwrite").objectStore("cart").add(data}); 
request.onsuccess = function(event) {  //increase the count here }; 
request.onerror = function(event) { };