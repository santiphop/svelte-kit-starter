<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import LL from '$lib/i18n/i18n-svelte';

	export let form: ActionData;
</script>

<form method="POST" use:enhance class="card bg-pink-200 gap-2 p-8">
	{$LL.sign_in()}
	<input class="input" name="username" placeholder={$LL.username()} />
	<input class="input" type="password" name="password" placeholder={$LL.password()} />
	<button class="btn btn-primary">{$LL.sign_in()}</button>
	{#if form?.message}<p class="text-error">{form?.message}</p>{/if}
	<div class="divider m-0" />
	<a class="btn" href="/register"> {$LL.create_new_account()} </a>
</form>
