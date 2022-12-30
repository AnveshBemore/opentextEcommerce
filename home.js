var slideIndex=0;
function slideImg(){
    var img_slide=document.getElementsByClassName("slide_img");
   
    for(var j=0;j<img_slide.length;j++)
    img_slide[j].style.display='none';

    if(slideIndex>=img_slide.length)slideIndex=0;
    img_slide[slideIndex].style.display="block";
    slideIndex+=1;
    setTimeout(slideImg, 2000);

}