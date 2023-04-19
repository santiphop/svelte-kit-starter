<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import LL from '$lib/i18n/i18n-svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';

	export let data;
	const { message, errors, enhance } = superForm(data.form);
</script>

<form method="POST" use:enhance class="card gap-2 p-8 shadow-2xl">
	{$LL.register()}
	<input class="input-bordered input" name="name" placeholder={$LL.name()} />
	{#if $errors.name} <p class="text-error">{$errors.name}</p> {/if}
	<input class="input-bordered input" name="username" placeholder={$LL.username()} />
	{#if $errors.username} <p class="text-error">{$errors.username}</p> {/if}
	<PasswordInput placeholder={$LL.password()} />
	<button class="btn-primary btn">{$LL.register()}</button>
	{#if $message} <p class="text-error">{$message}</p> {/if}
	<div class="divider m-0" />
	<a class="btn" href="/sign_in"> {$LL.already_have_an_account()} </a>
</form>
