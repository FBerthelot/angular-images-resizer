# Angular-image-resizer

[![Build Status](https://travis-ci.org/FBerthelot/angular-images-resizer.svg?branch=master)](https://travis-ci.org/FBerthelot/angular-images-resizer)
[![Coverage Status](https://img.shields.io/coveralls/FBerthelot/angular-images-resizer.svg)](https://coveralls.io/r/FBerthelot/angular-images-resizer)
[![devDependency Status](https://david-dm.org/FBerthelot/angular-images-resizer/dev-status.svg)](https://david-dm.org/FBerthelot/angular-images-resizer#info=devDependencies)

This is a simple angular service which resizes images client-side. With this component, you will liberate some resources on your server!
Let your client work for you, and save bandwidth. If you don't care about supporting every browsers then this component is for you.

You can test this module on this site example: http://fberthelot.github.io/angular-images-resizer/

## Breaking changes in the 2.0.0 version

In this version the `resizeService.resizeImage` function return a promise. No need to use a callback anymore.

## Get started
Add this module to your project with bower or npm:

```bash 
bower install angular-images-resizer
```

```bash
npm install angular-images-resizer
```

Add the component to your app:
```javascript
angular.module('app', ['images-resizer']); 
```

Then simply add the service to your code and start resizing your images :

```javascript 
angular.module('app', function ($document, $log, $scope, resizeService) {
  resizeService
    .resizeImage('resources/imageToResize', {
        size: 100, 
        sizeScale: 'ko'
        // Other options ...
    })
    .then(function(image){    
      // Add the resized image into the body
      var imageResized = document.createElement('img');
      imageResized.src = image;
      $document[0].querySelector('body').appendChild(imageResized);
    })
    .catch($log.error); // Always catch a promise :)
```

## Availables functions

[Click here to see the Full documentation](http://fberthelot.github.io/angular-images-resizer/docs/)

#### resizeImage
This is the main function of this service. The function take 3 argument, the src of the image, the options to resize the image and the callback.
The src can be an base 64image.

###### Options
- height: desired height of the resized image
- width: desired width of the resized image
- size: desired size of the resized image (Size are by default in Octet)
- sizeScale: 'o' || 'ko' || 'mo' || 'go'
- step: number of step to resize the image, by default 3. Bigger the number, better is the final image. Bigger the number, bigger the time to resize is.
- outputFormat: specify the image type. Default value is 'image/jpeg'. [Check this page to see what format are supported.] (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
- crossOrigin: Specify the crossOrigin of the image to resize

## Compatibility
This module uses canvas, so it's only compatible with:
* Firefox 4+
* Chrome 14+
* Internet explorer 9+
* Safari 5+
* ios ??
* Android browser 4+
* Chrome for android All

## I need help
* This angular component doesn't work on iPhones with iOS 8.1, but works on iPad and iPod touch with iOS 8.1. I still don't understand why, if someone has an explanation, it would be nice.
* I don't know how to test the resizeLocalPic service. If someone can help me on this subject.
Thanks

## Special thanks
* This module is widely inspired by this article of the [liip blog] (https://blog.liip.ch/archive/2013/05/28/resizing-images-with-javascript.html).

## Licence
MIT
