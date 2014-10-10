# It's Hackademic!

## Start Grunt

1. `cd PATH/TO/PROJECT`
2. `grunt`
3. `http://localhost:8080/`

## Vulcanizing

If you're making changes to `static/imports.html` or `static/index.imports.html` make sure to run `static/vulcanize.sh` when you're finished for changes to show up.

## Releasing

Make sure to bump the version number in `bower.json`, `package.json` and `app.yaml`. This project follows semver for its version numbers, but `app.yaml` does not accept dots in a version number so replace them with dashes.

```
ex: app.yaml

version: 2-1-0
```

## Source Locations
|Output    |Source
|:---------|:-----------------------
|app.js    |`src/javascript/app.js`
|main.scss |`src/scss/main.scss`
|index.html|`static/index.html`
|images    |`static/images`
|codelabs  |`static/codelabs`
