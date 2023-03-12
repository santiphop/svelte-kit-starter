<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';
	import LL from '$lib/i18n/i18n-svelte';

	export let data: PageServerData;
	export let form: ActionData;

	const flashMessage: SubmitFunction = () => {
		return ({ result }) => {
			applyAction(result);
			if (result.type === 'success') {
				console.log(result.data?.message);
				goto('/articles');
			} else if (result.type === 'failure') {
				console.log(result.data?.message);
			}
		};
	};
</script>

<form method="POST" use:enhance={flashMessage} class="card space-y-8 bg-secondary/20 p-8">
	<h2 class="text-2xl">{$LL.edit_this_article()}</h2>
	<div>
		<input
			id="title"
			name="title"
			class="input w-full"
			placeholder={$LL.attributes.title()}
			class:input-error={form?.errors?.title}
			value={data?.article?.title}
		/>
		{#if form?.errors?.title}<p class="text-error">{form?.errors?.title[0]}</p>{/if}
	</div>
	<div>
		<textarea
			id="content"
			name="content"
			class="textarea w-full"
			placeholder={$LL.attributes.content()}
			class:input-error={form?.errors?.content}
			value={data?.article?.content}
		/>
		{#if form?.errors?.content}<p class="text-error">{form?.errors?.content[0]}</p>{/if}
	</div>
	<button formaction="?/editArticle" type="submit" class="btn-secondary btn">
		{$LL.submit()}
	</button>
</form>
