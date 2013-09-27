
module.exports = {

  views: {
    all: {
      map: function(doc) {
        if (doc.type_ === 'User') {
          emit(doc._id, doc);
        }
      }
    },
    names: {
      map: function(doc) {
        if (doc.type_ === 'User') {
          emit(doc._id, doc.firstname + ' ' + doc.lastname);
        }
      }        
    }
  }
};