require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/ImageryLayer",
        "esri/layers/support/RasterFunction"
      ], (Map, MapView, ImageryLayer, RasterFunction) => {
        /***************************************
         * Set up popup template of image layer
         **************************************/

        const imagePopupTemplate = {
          // autocasts as new PopupTemplate()
          // SensorName is actually null for most of the data
          title: "Data from {dataset_id} satellite",
          content: `
            Rendered RGB values: <b>{Raster.ServicePixelValue} </b>
            <br>Original values (B, G, R, NIR): <b>{Raster.ItemPixelValue} </b>
            `
        };
            /*******************************************************************
         * Create image layer with server defined raster function templates
         ******************************************************************/

        const serviceRFT = new RasterFunction({
          functionName: "NDVI Colorized",
          variableName: "Raster"
        });

        const layer = new ImageryLayer({
          url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
          rasterFunction: serviceRFT,
          popupTemplate: imagePopupTemplate
        });
        /*************************
         * Add image layer to map
         ************************/
        const map = new Map({
          basemap: "hybrid",
          layers: [layer]
        });

        const view = new MapView({
          container: "viewDiv",
          map: map,
          center: {
            // autocasts as esri/geometry/Point
            x: -90.1994,
            y: 38.6270
            //spatialReference: 3857
          },
          zoom: 10,
          popup: {
            actions: []
          }
        });
      });
