$(document).ready(function() {
    
    $.getJSON('assets/js/banners.json', function(data) {
        
        $.each(data, function(index, item) {
            if(item.type=="Desktop"){
                
                $("#sliderBannersDesktop").append('<li><a href="'+item.urlbutton+'"><img src="'+item.imageUrl+'"></a></li>');
                $("#buttonsBannersDesktop").append("<button></button>");
            }
            if(item.type=="Mobile"){
                $("#sliderBannersMobile").append('<li><a href="'+item.urlbutton+'4"><img src="'+item.imageUrl+'"></a></li>');
                $("#buttonsBannersMobile").append("<button></button>");
            }
            //console.log(item.imageUrl)
            //$('#banner-list').append('<li>' + item.name + '</li>');
        });
    }).fail(function() {
        console.log("Error al cargar el archivo JSON.");
    });
});
