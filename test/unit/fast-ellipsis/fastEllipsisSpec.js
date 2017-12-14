'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('thls.fast-ellipsis');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('thls.fast-ellipsis.config')).to.be.ok;
  });

  

  

  

});