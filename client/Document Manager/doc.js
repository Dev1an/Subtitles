Template.doc.events({
	'click .edit': function(event, template) {
		var nameField = template.find('.name');
		nameField.contentEditable = true;
		nameField.focus();
		
		event.target.style.visibility = "hidden";
	},
	'blur .name': function(event, template) {
		event.target.contentEditable = false;
		template.find('.edit').style.visibility = "";
	},
	'keydown .name': function(event) {
		// Enter
		if (event.which == 13) {
			event.preventDefault();
			event.target.blur();

			var newName =  event.target.innerText;
			if (this.name != newName) {
				// Update Database
				Documents.update(this._id, {$set: {name: newName}});
			}
		} 
		
		// Escape
		else if (event.which == 27) {
			event.target.innerText = this.name;
			event.target.blur();
		}
	},
	'click .delete': function() {
		Documents.remove(this._id);
	}
});