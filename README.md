# envlocalify
envify and localenv combined as a browserify transform
# envlocalify

[hughsk/envify](https://github.com/hughsk/envify) and
[defunctzombie/localenv](https://github.com/defunctzombie/localenv) combined for [substack/node-browserify](https://github.com/substack/node-browserify) modules.

## Installation

```shell
npm install envlocalify --save-dev
```

## USAGE

**This browserify transform can be used like [envify](https://github.com/hughsk/envify)**, but
in addition, if you use [atomify](https://github.com/atomify/atomify), then:

```js
// [index.js]
var foo = process.env.FOO;
console.log(foo);
```

And a `.env` file sitting in your current working dir.

```sh
# [.env]
FOO=bar
```

**Running atomify with the envlocalify transform:**  
*(if you change **environment files** in atomify server and/or watch mode, you need to restart atomify)*

```shell
atomify --envlocalify
```
results in
```js
// [index.js]
var foo = "bar";
console.log(foo);
```

`.env` should be checked into the repository. Locally, you can overwrite properties specified in it, by creating a `.env.local` file, which should be added to `.gitignore`, so every contributor can his own file.

## Advanced
This is useful if you want to create `npm tasks` for atomify, e.g.:
```js
// [package.json]
//...
"scripts": {
  "start": "atomify <see usage below>"
//...
```

```shell
# replaces ".env" as the default env file
atomify --envlocalify [ --envfile .envCustom ]
```

```shell
# overwrites ".env.local" as the default file which extends '.env'
atomify --envlocalify [ --localenvfile .env.mylocal ]
```

```shell
# disables extending '.env'
atomify --envlocalify [ --localenvfile false ]
```
You can combine both parameters.

## Specifying a custom env file

[defunctzombie/localenv](https://github.com/defunctzombie/localenv) only loads .env files when `NODE_PRODUCTION !== 'production'`.

You can pass transform options to envlocalify to load custom .env files.


## .env files

.env file format is described in [defunctzombie/localenv readme](https://github.com/defunctzombie/localenv#env-files).

You should use .env files for developer or test environments, not for production* environments.
