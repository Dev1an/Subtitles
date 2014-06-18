Template.doc.helpers({
	isSelected: function() {
		return isSelected(this._id) ? "selected" : "";
	}
});

Template.doc.events({
	'click .document': function() {
		if (key.command)
			toggleSelection(this._id);
		else
			setSelection(this._id);
	},
	'dblclick .document': function(event, template) {
		console.log("open "+this.name);
	},
	'click .name': function(event, template) {
		var selection = isSelected(this._id);
		if (selection && (new Date())-selection.time>800) {
			setTimeout(function() {
				event.target.contentEditable = true;
				event.target.focus();
			}, 800);
		}
	},
	'blur .name': function(event, template) {
		event.target.contentEditable = false;
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
	'click .delete': function(event) {
		//prevent further propagation to .document
		event.stopPropagation();
		Documents.remove(this._id);
	}
});

selection = new Meteor.Collection(null);

var s = isSelected('');

/**
 * Returns whether a document is selected or not
 * @param {String} id - The id of the document to lookup
 * @returns {Object}
 */
function isSelected(id) {
	return selection.findOne(id);
}

/**
 * Select a document in the Document Manager
 * @param {String} id - The id of the document to select
 */
function setSelection(id) {
	if (!isSelected(id)) {
		selection.remove({});
		selection.insert({_id: id, time: new Date()});
	} else {
		selection.remove({_id: {$ne: id}});
		selection.update(id, {$set: {time: new Date()}});
	}
}

/**
 * Toggle the selection state of a document
 * @param {String} id - The id of the document to select 
 */
function toggleSelection(id) {
	if (isSelected(id))
		selection.remove(id);
	else
		selection.insert({_id: id, time: new Date()});
}


/**
 * Deselects all documents in the Document Manager
 */
deSelect = function() {
	selection.remove({});
}