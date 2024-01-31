require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/ImageryLayer",
        "esri/layers/support/RasterFunction"
      ], (Map, MapView, ImageryLayer, RasterFunction) => {

        const imagePopupTemplate = {
          // autocasts as new PopupTemplate()
          // SensorName is actually null for most of the data
          title: "Data from {dataset_id} satellite",
          content: `
            Rendered RGB values: <b>{Raster.ServicePixelValue} </b>
            <br>Original values (B, G, R, NIR): <b>{Raster.ItemPixelValue} </b>
            `
        };

        const serviceRFT = new RasterFunction({
          functionName: "NDVI Colorized",
          variableName: "Raster"
        });

        const layer = new ImageryLayer({
          url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
          rasterFunction: serviceRFT,
          popupTemplate: imagePopupTemplate
        });

        const map = new Map({
          basemap: "hybrid",
          layers: [layer]
        });

        const view = new MapView({
          container: "viewDiv",
          map: map,
          center: {
            // autocasts as esri/geometry/Point
            x: -93.88338462979141,
            y: 40.83095739836335
            //midwest = 40.83095739836335, -93.88338462979141
            //spatialReference: 3857
          },
          zoom: 10,
          popup: {
            actions: []
          }
        });
      });
