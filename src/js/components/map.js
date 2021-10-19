if ($('body').hasClass('home') || $('body').hasClass('page-template-page-contacts')) {
    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [62.157260, 73.596215],
            zoom: 17,
            controls: []
        });

        myMap.behaviors.disable('scrollZoom');
        // myMap.behaviors.disable('drag');

        myPlacemark = new ymaps.Placemark([62.157258, 73.596215], {
            hintContent: 'Мы находимся тут',
            balloonContent: `Ханты-Мансийский автономный округ–Югра,
            Сургутский район, с.п. Русскинская,
            ул. Русскиных, д.30`,
            // iconImageHref: '/img/home.svg',
            // iconImageSize: [30, 42],
            iconImageOffset: [-33, -42]
        });

        myMap.geoObjects.add(myPlacemark);
    }

}