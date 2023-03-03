import type { Handle } from '@sveltejs/kit';

export type Theme = 'light' | 'dark'
const DEFAULT_THEME: Theme = 'light'

export const isValidTheme = (theme?: FormDataEntryValue | null): theme is Theme =>
	!!theme && (theme === 'light' || theme === 'dark' || theme === 'auto');

export const handle: Handle = async ({ event, resolve }) => {
	let theme: Theme | null = null;

  const newTheme = event.url.searchParams.get('theme')
  const cookieTheme = event.cookies.get('theme')
  if (isValidTheme(newTheme)) {
		theme = newTheme;
	} else if (isValidTheme(cookieTheme)) {
		theme = cookieTheme;
	}

  event.locals.theme = theme ?? DEFAULT_THEME;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%THEME%', theme ?? DEFAULT_THEME)
	});

	return response;
};
