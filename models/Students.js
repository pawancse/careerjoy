var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Students Model
 * ==========
 */
var Students = new keystone.List('Students');

Students.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Students.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Students.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Students.defaultColumns = 'name, email, isAdmin';
Students.register();
