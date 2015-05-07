Template.editor.onCreated(function() {
	this.editMode = new ReactiveVar(true);
})

Template.editor.helpers({
	editMode: function() {
		return Template.instance().editMode.get() ? 'on' : ''
	},
	addEditMode: function(obj) {
		return _.extend(obj, {editMode: Template.instance().editMode.get()? {contenteditable: true}: {}})
	}
})

Template.editor.events({
	'click button.editMode': function(event, template) {
		template.editMode.set(!template.editMode.get())
	},
	'keydown .add input': function(event, template) {
		// key: Return
		if (event.which == 13) {
			// Prevent a the insertion of a 'new line' character
			event.preventDefault();
			
			var lastTitle = Titles.findOne({document: this.document._id}, {sort: {order: -1}})
			if (lastTitle == undefined) {
				var index = 0;
			} else {
				var index = lastTitle.order+1
			}

			console.log(this)
			Titles.insert({
				content: event.currentTarget.value,
				document: this.document._id,
				order: index
			});

			event.target.value = ""
			
			event.target.blur();
		}
	}
})