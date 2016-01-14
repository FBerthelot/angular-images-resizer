#!/usr/bin/env bash

git branch -D gh-pages
git checkout -b gh-pages
npm install
gulp build:ghPage
rm -R bower_components
rm -R node_modules
mv dist/**/* ./
git add -A
git commit -m 'See changelog from master branch'
git push -f origin gh-pages
