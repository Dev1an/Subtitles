Template.docManager.helpers({
	document: function() {
		return Documents.find({}, {sort: {creation: -1}});
	}
});

var safe;
var init;

Template.docManager.events({
	'click .toolbar .newDocument': function(event, template) {
		// display the document creation form:
		var form = template.find('li.form');
		form.style.display = 'list-item';
		
		// focus on the name field
		var nameField = $(form).find('.name')[0];
		nameField.focus();
		nameField.innerText = "Name";
		init = true;
		safe = false;
		
		// blur any selected document
		deSelect();
	},
	'keydown .form .name': function(event, template) {
		// key: Return
		if (event.which == 13) {
			// Prevent a the insertion of a 'new line' character
			event.preventDefault();
			
			safe = true;
			event.target.blur();
		}
		
		// key: Escape
		else if (event.which == 27) {
			event.target.blur();
			event.preventDefault;
		}
		
		// key: Delete
		else if (event.which == 8 && event.target.innerText=="\n") {
			event.preventDefault();
		}
	},
	'keypress': function() {
		if (init) {
			event.target.innerText = "";
			init = false
		}
	},
	'blur .form .name': function(event, template) {
		if (safe)
			Documents.insert({
				name: event.target.innerText,
				creation: new Date()
			});
		template.find('li.form').style.display = "none";
	}
});