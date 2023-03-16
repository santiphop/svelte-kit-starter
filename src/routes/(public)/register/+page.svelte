<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import LL from '$lib/i18n/i18n-svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';

	export let form: ActionData;
</script>

<form method="POST" use:enhance class="card gap-2 p-8 shadow-2xl">
	{$LL.register()}
	<input class="input-bordered input" name="name" placeholder={$LL.name()} required />
	<input class="input-bordered input" name="username" placeholder={$LL.username()} required />
	<PasswordInput placeholder={$LL.password()} required />
	<button class="btn-primary btn">{$LL.register()}</button>
	{#if form?.message}<p class="text-error">{form?.message}</p>{/if}
	<div class="divider m-0" />
	<a class="btn" href="/sign_in"> {$LL.already_have_an_account()} </a>
</form>
