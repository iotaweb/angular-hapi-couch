(function() {

  var module = angular.module('cores.services');

  // Create a new file id
  var createFileId = (function(id) {
    return function() { return 'file' + ++id; };
  })(0);


  // Create a new modal id
  var createModalId = (function(id) {
    return function() { return 'modal-' + ++id; };
  })(0);


  // Create a new object id
  var createObjectId = (function(id) {
    return function() { return 'object-' + ++id; };
  })(0);


  var slugify = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    var slug = '';
    var map = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss',
                '/': '-', '_': '-', ',': '-', ':': '-', ';': '-', '.': '-' };

    for (var i = 0; i < str.length; ++i) {
      var c = str.charAt(i);
      slug += map[c] || c;
    }

    slug = slug.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes
      .replace(/^-|-$/g, ''); // trim dashes

    return slug;
  };


  var capitalize = function(str) {
    if (!str || str.length === 0) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.substr(1);
  };


  var trim = function(str) {
    return this.replace(/^\s+|\s+$/g, '');
  };
  
  var getPathFromType = function(type) {
    var path = '/' + type.toLowerCase() + 's';
    return path;  
  }; 


  var merge = function(a, b) {
    for (var x in b) {
      a[x] = b[x];
    }
    return a;
  };


  module.service('crCommon', function($q) {

    return {
      createFileId: createFileId,
      createModalId: createModalId,
      createObjectId: createObjectId,

      slugify: slugify,
      capitalize: capitalize,

      merge: merge,

	  getPathFromType: getPathFromType
    };
  });

})();