# It's Hackademic!

## Start Grunt

1. `git clone https://github.com/robdodson/its-hackademic.git`
2. `cd its-hackademic`
3. `npm install`
4. `grunt`
5. Open `http://localhost:8080/` in your browser

## Vulcanizing

If you're making changes to `static/imports.html` or `static/index.imports.html` make sure to run `static/vulcanize.sh` when you're finished for changes to show up.

## Releasing

Make sure to bump the version number in `bower.json`, `package.json` and `app.yaml`. This project follows semver for its version numbers, but `app.yaml` does not accept dots in a version number so replace them with dashes.

```
ex: app.yaml

version: 2-1-0
```
