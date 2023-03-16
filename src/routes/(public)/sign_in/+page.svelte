<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import LL from '$lib/i18n/i18n-svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';

	export let form: ActionData;
</script>

<form method="POST" use:enhance class="card gap-2 p-8 shadow-2xl">
	{$LL.sign_in()}
	<input class="input-bordered input" name="username" placeholder={$LL.username()} />
	<PasswordInput placeholder={$LL.password()} />
	<button class="btn-primary btn">{$LL.sign_in()}</button>
	{#if form?.message}<p class="text-error">{form?.message}</p>{/if}
	<div class="divider m-0" />
	<a class="btn" href="/register"> {$LL.create_new_account()} </a>
</form>
