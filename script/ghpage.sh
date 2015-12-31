git clone git@github.com:FBerthelot/angular-images-resizer.git
cd angular-images-resizer
git checkout gh-pages
find . -mindepth 1 -delete ! -wholename './.git/*'
cd ..
cp -R exemple/* angular-images-resizer/
cd angular-images-resizer
npm install
git add -A
git commit -m 'See changelog from master branch'
git push orgin gh-pages