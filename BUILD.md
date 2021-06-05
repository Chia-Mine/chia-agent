# Build from source

```shell
$ cd <Directory you like>
$ git clone https://github.com/Chia-Mine/chia-agent . # Don't forget '.'
$ git checkout <branch you like>
$ npm run build # Build files into /build directory which git ignores

# If you check how package is build for release:
$ npm run build:prod
```

## `npm install` or `yarn add` from source

As of June 5, 2021, `npm install` nor `yarn add` can not install npm module from subdirectory in GitHub repository.  
So if you want to install npm module from source:
- Build npm module from source as described above. (`npm run build:prod`)
- Install it from local path.
  - `npm install /path/to/repository/chia-agent/dist`
  - or `yarn add /path/to/repository/chia-agent/dist`
