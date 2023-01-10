
let img=[]
let product_name=[]
let product_price=[]
let quantity=[]
var totalAmount=0;
let countHtmlSrc=0;
var kthProduct=0;
var kthNameQuant=0;

//remove unused text and console.log
function count_cart(){
    let cart_cnt=0;
    for(var[key,value] of Object.entries(localStorage)){
        // console.log(key+" key - value"+value);
        cart_cnt+=Number(value);
    }
    // console.log("cart count "+cart_cnt);
    document.getElementById("cart_count").innerHTML=cart_cnt;

    return cart_cnt;
}
function cartProducts(){
    let noOfCartProducts=0;

    for(var[key,value] of Object.entries(localStorage)){
        // console.log(key+" key  pair- value"+value);
        noOfCartProducts++;
    }
    return noOfCartProducts;
}
function totalPrice(quantityProduct,price){
totalAmount+=quantityProduct*price;
// console.log("qunat "+quantityProduct+" pricee "+price+" - "+(quantityProduct*price));
document.getElementById("total_price").innerHTML=totalAmount;

}

function decreasePrice(price){
    totalAmount-=price;
    // console.log("qunat "+quantityProduct+" pricee "+price+" - "+(quantityProduct*price));
    document.getElementById("total_price").innerHTML=totalAmount;
    
    }
function setData(){
    
    totalAmount=0;
   count_cart();
    fetch("data.json")
    .then(function(response){
        return response.json();
    }).then(function(data){
        
    
        for(var[key,value] of Object.entries(localStorage)){
            // console.log(key+" hai "+value+" image length "+data["products"].length);
            assignNameQuantity(key,value);
            
            for(var i=0;i<data["products"].length;i++){
                if(data["products"][i]["product_name"]===key){
                    // console.log("image of "+i+" at "+data["products"][i]["product_img"])
                    img.push(data["products"][i]["product_img"]);
                    assignImgPrice(data["products"][i]["product_img"],data["products"][i]["product_price"]);
                    totalPrice(value,data["products"][i]["product_price"]);
                }
            }
        }     
    })
    // console.log("total amount finally "+totalAmount);
    // document.getElementById("total_price").innerHTML=totalAmount;
    // console.log("image length after fetch "+img.length);
}
  
function assignImgPrice(img,product_price){

    var prod_img=document.getElementsByClassName("product_img");
    prod_img[kthProduct].src=img;
    var prod_price=document.getElementsByClassName("product_price");
    prod_price[kthProduct].innerHTML=product_price;
    // console.log(kthProduct);
    kthProduct++;

}

setData();


function createHtml(){
    var product_frame=document.getElementById("products_frame");
    // console.log("Entered createHTML");
    var cart_products="";
    var cartDivTemplate="<div class=\"cart_products\">    <img src=\"\" alt=\"\" class=\"product_img\">    <div class=\"product_name\"></div>    <div class=\"ruppe\">&#8377 </div>    <div class=\"product_price\"></div>    <div class=\"plus\" onclick=\"increaseProd(this)\">&plus;</div>    <div class=\"quantity\"></div>    <div class=\"minus\" onclick=\"decreaseProd(this)\">&minus;	</div></div>";
    // console.log(cartDivTemplate);
    count_cart();
    // console.log("no of cart products"+cartProducts());

    for(var i=0;i<cartProducts();i++)
    cart_products+=cartDivTemplate;
    product_frame.innerHTML=cart_products;
    // console.log(cart_products);
    // console.log(product_frame.innerText);
    
}
createHtml();

function assignNameQuantity(name_product,quant){
    var prod_name=document.getElementsByClassName("product_name");
    var prod_quantity=document.getElementsByClassName("quantity");
    // console.log("kth name "+kthNameQuant+" name product "+name_product+" quant -- "+quant+" prodNmae "+prod_name.length+" qunatity "+prod_quantity.length);
    prod_name[kthNameQuant].innerHTML=name_product;
    prod_quantity[kthNameQuant].innerHTML=quant;
    kthNameQuant++;
}


function increaseProd(product){
    var elementsInParent=product.parentNode.children;
    for(var i=0;i<elementsInParent.length;i++){
        if(elementsInParent[i].className==="product_name"){
            console.log(elementsInParent[i].innerHTML);
            console.log("total price"+document.getElementById("total_price").innerHTML);
            addProductsCart(elementsInParent[i].innerHTML);
            kthNameQuant=0;
            kthProduct=0;
            setData();
        }

    }
}



function decreaseProd(product){
    var elementsInParent=product.parentNode.children;
    for(var i=0;i<elementsInParent.length;i++){
        if(elementsInParent[i].className==="product_name"){
            console.log(elementsInParent[i].innerHTML);
            decreasePrice(elementsInParent[i+2].innerHTML);
            // console.log("get price og product "+elementsInParent[i+2].innerHTML);
            decreaseProductsCart(elementsInParent[i].innerHTML);
            kthNameQuant=0;
            kthProduct=0;
            setData();
        }

    }
}



function addProductsCart(product_name){
    // products.push(product_name);
    if(product_name in localStorage){
        var count=Number(localStorage.getItem(product_name))+1;
        localStorage.setItem(product_name,count);
    }
    else
    localStorage.setItem(product_name,1);
   
   
    console.log("local storage "+new Blob(Object.values(localStorage)).size);
   
    document.getElementById("cart_count").innerHTML=count_cart();
    // localStorage.removeItem("cart_count");
}
function removeDiv(divClassName){
    var divs=document.getElementsByClassName(divClassName);
    if(divs.length!=0){
        divs[0].remove();
    }
}
function decreaseProductsCart(product_name){
    // products.push(product_name);
    console.log("entered "+product_name);
    var count=Number(localStorage.getItem(product_name))-1;
    
    console.log("entered decreased product -- productName "+product_name+" count value "+count);
    if(count==0){
        localStorage.removeItem(product_name);
        removeDiv("cart_products");
    }
    else
    localStorage.setItem(product_name,count);
   
   
    console.log("local storage "+new Blob(Object.values(localStorage)).size);
   
}

function deleteProduct(deleteBtn){
    var childEle=deleteBtn.parentNode.children;
    // for(var )
}














// function defaultSetUp(){
    

//     //count cart number and assign
//     for(var[key,value] of Object.entries(localStorage)){
        // console.log(key+" key - value"+value);
//         cart_count+=Number(value);

//         product_name.push(key);
//         quantity.push(value);
//     }
//     document.getElementById("cart_count").innerHTML=cart_count;
    
//     var x=false;
//     fetch("data.json")
//     .then(function(response){
//         return response.json();
//     }).then(function(data){
        // console.log("enntered data ");
        
//        for(var[key,value] of Object.entries(localStorage)){
            // console.log(key+" hai "+value+" image length "+data["product_img"].length);
            
//             for(var j=0;j<data["product_name"].length;j++){
//                 console.log("product name at index "+data["product_name"][j]);
//                 if(key===data["product_name"][j]){
//                     console.log("product at j "+j+" key "+key+" product at j "+data["product_name"][j]);
//                     assignImage(data["product_img"][j]);
                    
//                     console.log("image at j in array is ---- "+img[0]);
//                     assignPrice(data["product_price"][j]);
//                     console.log("image at j in array is ---- "+product_price[0]);
//                     countHtmlSrc=img[0];
//                     break;
//                 }
//             }
            
//         }
//         x=true;
//         console.log("print inside fetch "+img+" img lenght "+img.length+"  conut lene "+countHtmlSrc);
//     })
//     console.log("print after  fetch "+img);
//     console.log("print after  fetch var x "+x);
    
//     console.log("image at 0 "+img[0]);
//     console.log("product price at 0 "+product_price[0]);
    
//     console.log("img  --length- before function call "+img.length);
//     assignData();
// }

// function assignImage(imgUrl){
//     img.push(imgUrl);
//     console.log("image length in fuinction"+img.length)

// }
// function assignPrice(price){
//     product_price.push(price);

// }
// function assignData(){
//     // var productuct_name=
//     var prod_img=document.getElementsByClassName("product_img");
//     var prod_name=document.getElementsByClassName("product_name");
//     var prod_price=document.getElementsByClassName("product_img");
//     var prod_quantity=document.getElementsByClassName("quantity");
//     console.log(prod_img.length);
//     console.log( "img  array"+img.length); 
//     console.log(prod_name.length);
//     console.log("prodname array"+product_name.length); 
//     console.log(prod_price.length);
//     console.log("prodprice array"+product_price.length); 
//     console.log(prod_quantity.length);
//     console.log("product_quantity array"+quantity.length+" var "+countHtmlSrc);
   
    
//     for(var i=0;i<img.length;i++){
//         prod_img[i].src=img[i];
//         console.log("iiiimg "-img[i]);
//     }
//     for(var i=0;i<product_name.length;i++){
//         prod_name[i].innerHTML=product_name[i];
//         console.log(product_name[i]);
//     }
//     for(var i=0;i<product_price.length;i++){
//         prod_price[i].innerHTML=product_price[i];
//         console.log(product_price[i]);
//     }
//     for(var i=0;i<quantity.length;i++){
//         prod_quantity[i].innerHTML=quantity[i];
//         console.log(quantity[i]);
//     }
   


// }

// defaultSetUp()