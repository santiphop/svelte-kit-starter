/* eslint-disable no-var */
import type { PrismaClient } from '@prisma/client';
import type { Theme } from './hooks.server';
import type { Locales, TranslationFunctions } from '$lib/i18n/i18n-types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			theme: Theme;
			locale: Locales;
			$LL: TranslationFunctions;
		}
		interface PageData {
			theme: Theme;
			locale: Locales;
		}
		// interface Platform {}
	}
	var prisma: PrismaClient;
}

export {};
