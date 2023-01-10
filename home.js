var slideIndex=0;
var products_cart=new Map();
var product_names=new Set();
function slideImg(){
    var img_slide=document.getElementsByClassName("slide_img");
   
    for(var j=0;j<img_slide.length;j++)
    img_slide[j].style.display='none';

    if(slideIndex>=img_slide.length)slideIndex=0;
    img_slide[slideIndex].style.display="block";
    slideIndex+=1;
    setTimeout(slideImg, 2000);

}



function putData(){
    fetch("data.json")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        var sectionImg=document.getElementsByClassName("product_section_img");
        for(var i=0;i<sectionImg.length&&i<data["product_section_img"].length;i++){//i<data["product_section_img"].length
            sectionImg[i].src=data["product_section_img"][i];
        }   
        var sectionName=document.getElementsByClassName("product_section_name");
        for(var i=0;i<sectionName.length&&i<data["product_section_name"].length;i++){//i<data["product_section_name"].length
            sectionName[i].innerHTML=data["product_section_name"][i];
        }   

        var slide_img=document.getElementsByClassName("slide_img");
        for(var i=0;i<slide_img.length&&i<data["slide_img"].length;i++){
            slide_img[i].src=data["slide_img"][i];
        }
        
        var product_img=document.getElementsByClassName("product_img");
        // for(var i=0;i<product_img.length&&i<data["product_img"].length;i++){
        //     product_img[i].src=data["product_img"][i];
        // }

        var product_name=document.getElementsByClassName("product_name");
        // for(var i=0;i<product_name.length&&i<data["product_name"].length;i++){
        //     product_name[i].innerHTML=data["product_name"][i];
        //     //enter product names to set
        //    product_names.add(product_name[i]);
           
        // }

        var product_price=document.getElementsByClassName("product_price");
        // for(var i=0;i<product_price.length&&i<data["product_price"].length;i++){
        //     product_price[i].innerHTML=data["product_price"][i];
        // }

        for(var i=0;i<data["products"].length;i++){
            console.log(data["products"][i]["product_name"]);
            console.log(data["products"][i]["product_img"]);
            console.log(data["products"][i]["product_price"]);
            product_img[i].src=data["products"][i]["product_img"];
            product_name[i].innerHTML=data["products"][i]["product_name"];
            product_price[i].innerHTML=data["products"][i]["product_price"];
            
        }
        



        
    })
    
    var cart_count=0;
    for(var[key,value] of Object.entries(localStorage)){
        // console.log(key+" "+value);
        cart_count+=Number(value);
    }
    document.getElementById("cart_count").innerHTML=cart_count;
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
   
    var cart_count=0;
    for(var[key,value] of Object.entries(localStorage)){
        console.log(key+" "+value);
        cart_count+=Number(value);
    }
    document.getElementById("cart_count").innerHTML=cart_count;
    // localStorage.removeItem("cart_count");
}


function addToCart(ele){
    
    var elements=ele.parentNode.children;
    for(var i=0;i<elements.length;i++){
        if("product_name"===elements[i].className){
            addProductsCart(elements[i].innerHTML);
        }
    }
    
}

putData();
