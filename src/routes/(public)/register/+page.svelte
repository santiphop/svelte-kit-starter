<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import LL from '$lib/i18n/i18n-svelte';

	export let form: ActionData;
</script>

<form method="POST" use:enhance class="card bg-pink-200 gap-2 p-8">
	{$LL.register()}
	<input class="input" name="name" placeholder={$LL.name()} required />
	<input class="input" name="username" placeholder={$LL.username()} required />
	<input class="input" type="password" name="password" placeholder={$LL.password()} required />
	<button class="btn btn-primary">{$LL.register()}</button>
	{#if form?.message}<p class="text-error">{form?.message}</p>{/if}
	<div class="divider m-0" />
	<a class="btn" href="/sign_in"> {$LL.already_have_an_account()} </a>
</form>
