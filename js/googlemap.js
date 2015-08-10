/////////////////* GOOGLE MAP */////////////////////////

function googlemap() {
    google.maps.Map.prototype.setCenterWithOffset= function(latlng, offsetX, offsetY) {
    var map = this;
    var ov = new google.maps.OverlayView();
    ov.onAdd = function() {
        var proj = this.getProjection();
        var aPoint = proj.fromLatLngToContainerPixel(latlng);
        aPoint.x = aPoint.x+offsetX;
        aPoint.y = aPoint.y+offsetY;
        map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
    };
    ov.draw = function() {};
    ov.setMap(this);
};
    var latlng = new google.maps.LatLng(34.169594, -118.228836);

    var stylez = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { saturation: -100 }
      ]
    }
];

    var myMapOptions = {
        zoom: 12,
        scrollwheel: false,
        disableDefaultUI: true,
        mapTypeControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.MEDIUM,
          
        },
        center: latlng,
        mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
    }
    };

    var map = new google.maps.Map(document.getElementById("google-map"), myMapOptions);
    map.setCenterWithOffset(latlng, 30, 0);

    var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
    // map.mapTypes.set('tehgrayz', mapType);
    // map.setMapTypeId('tehgrayz');
    var image = 'images/pin.png';

    var marker = new google.maps.Marker({
        draggable: false,
        animation: google.maps.Animation.DROP,
        map: map,
        position: latlng
    });
    var infowindow = new google.maps.InfoWindow({
      content:"<h4>Parkview Pet Clinic</h4><br>"
      });

    infowindow.open(map,marker);
    google.maps.event.addListener(marker,'click',function() {
      map.setZoom(14);
      map.setCenter(marker.getPosition());
      });


}
