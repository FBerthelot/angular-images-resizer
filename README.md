Angular-image-resizer
=====================
[ ![Codeship Status for FBerthelot/angular-images-resizer](https://www.codeship.io/projects/3846cd60-4732-0132-6b8e-12291817bdc0/status)](https://www.codeship.io/projects/45512)
[![Coverage Status](https://img.shields.io/coveralls/FBerthelot/angular-images-resizer.svg)](https://coveralls.io/r/FBerthelot/angular-images-resizer)
[![devDependency Status](https://david-dm.org/FBerthelot/angular-images-resizer/dev-status.svg)](https://david-dm.org/FBerthelot/angular-images-resizer#info=devDependencies)

This is a simple angular service which resizes images client-side. With this component, you will liberate some ressources on your server! Let your client work for you, and save bandwidth. If you don't care about supporting every browsers then this component is for you.

You can test this module on this site exemple: http://fberthelot.github.io/angular-images-resizer/

##Get started
Add this module to your project with bower:
```javascript 
bower install angular-image-resize
```

Add the component to your app:
```javascript
angular.module('app', ['resize']); 
```

Then simply add the service to your code and start resizing your images!
```javascript 
  angular.module('app', ['resizeService', '$scope',
        function(resizeService, $scope) {
          var mysImageSource = $('#myImage').src;
          resizeService.startResize(myImageSource , function(err, image){
            if(err) {
              console.error(err);
              return;
            }
            
            var myImageResized = image; // return a base64 image
          });
    }]);
```

##Compatibility
This module uses canvas, so it's only compatible with:
* Firefox ??+
* Chrome ??+
* Internet explorer 9+
* ios ?+
* Android browser ??+
* Chrome for android ?+

##I need help
* This angular component doesn't work on iPhones with iOS 8.1, but works on iPad and iPod touch with iOS 8.1. I still don't understand why, if someone has an explanation, it would be nice.
* I don't know how to test the resizeLocalPic service. If someone can help me on this subject.
* I wanna load local files when karma run tests. If someone can tell me how to load relative path in the proxies' karma.
Thanks

##Special thanks
* This module is widely inspired by this article of the [liip blog] (https://blog.liip.ch/archive/2013/05/28/resizing-images-with-javascript.html).
* [Viseo] (http://www.viseo.com/)

##Licence
MIT
