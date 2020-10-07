 
  ymaps.ready(init);

  function init(){
    // Создание карты.
    
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76, 37.64],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
      zoom: 15,
      controls: [],

    }),
      
    
        // Создадим пользовательский макет ползунка масштаба.
        ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map-buttons'>" +
            "<div id='zoom-in' class='btn'><i class='icon-plus'></i></div><br>" +
            "<div id='zoom-out' class='btn'><i class='icon-minus'></i></div>" +
            "</div>", {

            // Переопределяем методы макета, чтобы выполнять дополнительные действия
            // при построении и очистке макета.
            build: function () {
                // Вызываем родительский метод build.
                ZoomLayout.superclass.build.call(this);

                // Привязываем функции-обработчики к контексту и сохраняем ссылки
                // на них, чтобы потом отписаться от событий.
                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                // Начинаем слушать клики на кнопках макета.
                $('#zoom-in').on('click', this.zoomInCallback);
                $('#zoom-out').on('click', this.zoomOutCallback);
            },

            clear: function () {
                // Снимаем обработчики кликов.
                $('#zoom-in').off('click', this.zoomInCallback);
                $('#zoom-out').off('click', this.zoomOutCallback);

                // Вызываем родительский метод clear.
                ZoomLayout.superclass.clear.call(this);
            },

            zoomIn: function () {
                var map = this.getData().control.getMap();
                map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
            },

            zoomOut: function () {
                var map = this.getData().control.getMap();
                map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
            }
        }),
      zoomControl = new ymaps.control.ZoomControl({
        options: { layout: ZoomLayout }
      });

    myMap.controls.add(zoomControl);


    var geolocationControl = new ymaps.control.GeolocationControl({
      options: {
          layout: 'round#buttonLayout'
      }
  });
  myMap.controls.add(geolocationControl);
    
  };


