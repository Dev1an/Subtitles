Template.title.events({
	'keydown .content': function(event) {
		// Enter
		if (event.which == 13) {
			event.preventDefault();
			event.target.blur();

			var newContent =  event.target.innerText;
			if (this.content != newContent) {
				// Update Database
				Titles.update(this._id, {$set: {content: newContent}});
			}
		} 
		
		// Escape
		else if (event.which == 27) {
			event.target.innerText = this.content;
			event.target.blur();
		}
	},
	'click .delete': function(event) {
		//prevent further propagation to .document
		event.stopPropagation();
		Titles.remove(this._id);
	}
})