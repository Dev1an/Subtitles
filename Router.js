Router.route('/', function () {
  this.render('docManager');
});

Router.route('/editor/:document', function () {
  this.render('editor', {
  	data: function() {
  		return {
  			titles: Titles.find({document: this.params.document}),
  			document: Documents.findOne(this.params.document)
  		}
  	}
  });
}, {
	name: "editor"
});