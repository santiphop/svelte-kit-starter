import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
	// TODO: your translations go here
	hi: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/santiphop/svelte-kit-starter',
	write_something: 'Write something!',
	articles: 'Articles',
	edit_this_article: 'Edit this Articles',
	submit: 'Submit',
	duplicate: 'Duplicate',
	edit: 'Edit',
	delete: 'Delete',
	sign_in: 'Sign in',
	register: 'Register',
	name: 'Name',
	username: 'Username',
	password: 'Password',
	create_new_account: 'Create new account',
	already_have_an_account: 'Already have an account?',
	attributes: {
		title: 'Title',
		content: 'Content'
	},
	errors: {
		blank: ' is required.',
		maxlength: ' must not longer than {0:number} chars'
	}
};

export default en;
