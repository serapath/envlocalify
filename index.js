var localenv = require('localenv/noload');
var path = require('path');
var args = process.argv.slice(2)
var argv = require('subarg')(args);

module.exports = function envlocalify(file, opts) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  var environment = [];

  if (argv.envlocalify) {
    if (argv.envlocalify.localenvfile === 'false') {
      // dont use environment extension
    } else if (argv.envlocalify.localenvfile) {
      environment.push(argv.envlocalify.localenvfile);
    } else {
      environment.push('.env.local');
    }
  } else {
    environment.push('.env.local');
  }

  if (argv.envlocalify && argv.envlocalify.envfile) {
    environment.push(argv.envlocalify.envfile);
  } else if (!opts.envfile) {
    environment.push('.env');
  } else {
    environment.push(opts.envfile);
  }

  environment.forEach(function (env) {
    localenv.inject_env(path.resolve(process.cwd(), env));
  });

  return require('envify')();
};
