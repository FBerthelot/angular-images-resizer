Angular-image-resizer
=====================
[ ![Codeship Status for FBerthelot/angular-images-resizer](https://www.codeship.io/projects/3846cd60-4732-0132-6b8e-12291817bdc0/status)](https://www.codeship.io/projects/45512)
[![Coverage Status](https://img.shields.io/coveralls/FBerthelot/angular-images-resizer.svg)](https://coveralls.io/r/FBerthelot/angular-images-resizer)
[![devDependency Status](https://david-dm.org/FBerthelot/angular-images-resizer/dev-status.svg)](https://david-dm.org/FBerthelot/angular-images-resizer#info=devDependencies)

This is a simple angular service which resize images client-side. With this component you will liberate some ressources on your server! Let's your client work for you, and save bandwidth. If your don't care about support any browsers this component is for you.

##Get started
Add this module to your project with bower :
```javascript 
bower install angular-image-resize
```

Add the components to your app :
```javascript
angular.module('app', ['resize']); 
```

Then add the service to your code and start resize your image !
```javascript 
  angular.module('app', ['resizeService', '$scope',
        function(resizeService, $scope) {
          var mysImageSource = $('#myImage').src;
          resizeService.startResize(myImageSource , function(err, image){
            if(err) {
              console.error(err);
              return;
            }
            
            var myImageResized = image; //return a base64 image
          });
    }]);
```

##Compatibility
This module use canevas, so it's only compatible with :
* Firefox ??+
* Chrome ??+
* Internet explorer 9+
* ios ?+
* Android browser ??+
* Chrome for android ?+

##I need help
* This angular components doesn't work on iphone 8.1, but work on ipad and ipod touch 8.1. I still don't understand why, if someone can explain me why.
* I don't know how to test the resizeLocalPic service. If someone can help me on this subjet.
* I wanna load local file when karma testing. If someone can tell me how to load relative path in the proxies' karma.
Thanks

##Special thanks
* This module is widely inspered by this article of the [liip blog] (https://blog.liip.ch/archive/2013/05/28/resizing-images-with-javascript.html).
* [Viseo] (http://www.viseo.com/)

##Licence
MIT
