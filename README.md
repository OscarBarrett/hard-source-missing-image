This is a minimal reproduction for an issue with `hard-source-webpack-plugin` and `mini-css-extract-plugin` where images aren't emitted on subsequent builds.

## To demonstrate the issue:
`yarn missing`

Example:
```
$ yarn missing
yarn run v1.7.0
$ rm -rf node_modules/.cache/hard-source && webpack && webpack
[ '.../git/hard-source-missing-image/node_modules/mini-css-extract-plugin/dist/loader.js',
  'css-loader' ]
[hardsource:732a4d8a] Writing new cache 732a4d8a...
[hardsource:732a4d8a] Tracking node dependencies with: yarn.lock.
Hash: 93387b7e6d922eb02dcc
Version: webpack 4.10.2
Time: 513ms
Built at: 2018-05-31 16:39:07
                               Asset       Size  Chunks             Chunk Names
0664f2314191f751fb55dfff2b33caf2.jpg  364 bytes          [emitted]  
                            main.css   67 bytes    main  [emitted]  main
                             main.js   4.39 KiB    main  [emitted]  main
Entrypoint main = main.css main.js
[./index.js] 23 bytes {main} [built]
[./styles.css] 39 bytes {main} [built]
    + 1 hidden module
Child mini-css-extract-plugin node_modules/css-loader/index.js!styles.css:
                                   Asset       Size  Chunks             Chunk Names
    0664f2314191f751fb55dfff2b33caf2.jpg  364 bytes          [emitted]  
    Entrypoint mini-css-extract-plugin = *
    [./images/test.jpg] 82 bytes {mini-css-extract-plugin} [built]
    [./node_modules/css-loader/index.js!./styles.css] ./node_modules/css-loader!./styles.css 304 bytes {mini-css-extract-plugin} [built]
        + 2 hidden modules
        
[ '.../git/hard-source-missing-image/node_modules/mini-css-extract-plugin/dist/loader.js',
  'css-loader' ]
[hardsource:732a4d8a] Tracking node dependencies with: yarn.lock.
[hardsource:732a4d8a] Reading from cache 732a4d8a...
Hash: 380f97ba8a09b134b2bf
Version: webpack 4.10.2
Time: 160ms
Built at: 2018-05-31 16:39:08
   Asset      Size  Chunks             Chunk Names
main.css  67 bytes    main  [emitted]  main
 main.js  4.39 KiB    main  [emitted]  main
Entrypoint main = main.css main.js
   3 modules
✨  Done in 2.30s.

```

## Without mini-css-extract-plugin
`yarn no-extract`

Example:
```
$ yarn no-extract
yarn run v1.7.0
$ rm -rf node_modules/.cache/hard-source && webpack --env.NO_EXTRACT=true && webpack --env.NO_EXTRACT=true
[ 'css-loader' ]
[hardsource:2d062c2e] Writing new cache 2d062c2e...
[hardsource:2d062c2e] Tracking node dependencies with: yarn.lock.
Hash: 3a9206b4d9968477ebe2
Version: webpack 4.10.2
Time: 426ms
Built at: 2018-05-31 16:35:59
                               Asset       Size  Chunks             Chunk Names
0664f2314191f751fb55dfff2b33caf2.jpg  364 bytes          [emitted]  
                             main.js   8.82 KiB    main  [emitted]  main
Entrypoint main = main.js
[./images/test.jpg] 82 bytes {main} [built]
[./index.js] 23 bytes {main} [built]
[./styles.css] 304 bytes {main} [built]
    + 2 hidden modules

[ 'css-loader' ]
[hardsource:2d062c2e] Tracking node dependencies with: yarn.lock.
[hardsource:2d062c2e] Reading from cache 2d062c2e...
Hash: 3a9206b4d9968477ebe2
Version: webpack 4.10.2
Time: 154ms
Built at: 2018-05-31 16:36:00
                               Asset       Size  Chunks             Chunk Names
0664f2314191f751fb55dfff2b33caf2.jpg  364 bytes          [emitted]  
                             main.js   8.82 KiB    main  [emitted]  main
Entrypoint main = main.js
   5 modules
✨  Done in 2.06s.
```
