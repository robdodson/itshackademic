var retina=window.devicePixelRatio>1;if(retina){var src=document.getElementById("badge").getAttribute("src");document.getElementById("badge").setAttribute("src",src.replace(".png","@2x.png"))}$(document).stellar(),$("#faq label").click(function(){$(this).parents("li").toggleClass("open")}),$(".scroll-to").click(function(){return $("html, body").animate({scrollTop:$($(this).attr("href")).offset().top},750),!1});