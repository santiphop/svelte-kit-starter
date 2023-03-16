<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import LL from '$lib/i18n/i18n-svelte';
	import toast from 'svelte-french-toast';
	import Icon from '@iconify/svelte';
	import contentDuplicate from '@iconify/icons-mdi/content-duplicate';
	import squareEditOutline from '@iconify/icons-mdi/square-edit-outline';
	import trashCanOutline from '@iconify/icons-mdi/trash-can-outline';

	export let data: PageData;
	export let form: ActionData;

	const submitCreate: SubmitFunction = () => {
		return ({ result, update }) => {
			applyAction(result);
			switch (result.type) {
				case 'success':
					toast.success(result.data?.message);
					update();
					break;
				case 'failure':
					toast.error(result.data?.message);
					break;
			}
		};
	};

	const flashMessage: SubmitFunction = () => {
		return ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success(result.data?.message);
					return update();
				case 'failure':
					return toast.error(result.data?.message);
			}
		};
	};
</script>

<div class="card bg-primary/30 shadow-lg" in:fade>
	<div class="card-body space-y-8">
		<h2 class="card-title">{$LL.articles()}</h2>
		<form method="POST" action="?/createArticle" use:enhance={submitCreate} class="flex w-fit flex-col gap-2">
			{$LL.write_something()}
			<div>
				<input
					id="title"
					name="title"
					placeholder={$LL.attributes.title()}
					class="input w-full"
					class:input-error={form?.errors?.title}
				/>
				{#if form?.errors?.title}<p class="text-error">{form?.errors?.title[0]}</p>{/if}
			</div>
			<div>
				<textarea
					id="content"
					name="content"
					placeholder={$LL.attributes.content()}
					class="textarea w-full"
					class:textarea-error={form?.errors?.content}
				/>
				{#if form?.errors?.content}<p class="text-error">{form?.errors?.content[0]}</p>{/if}
			</div>
			<div>
				<input id="image" name="image" type="file" class="file-input" accept="image/*" />
			</div>
			<button class="btn-secondary btn">{$LL.submit()}</button>
		</form>
		{#each data.articles as article}
			<div class="card card-body bg-neutral text-neutral-content">
				<form method="POST" use:enhance={flashMessage} class="flex justify-between">
					<h3 class="text-2xl">{article.title}<span class="text-sm">(id: {article.id})</span></h3>
					{#if article.userId === data.user?.userId}
						<div>
							<div class="tooltip" data-tip={$LL.duplicate()}>
								<input class="hidden" name="title" value={article.title} />
								<input class="hidden" name="content" value={article.content} />
								<button formaction="?/createArticle" class="btn-ghost btn-circle btn">
									<Icon icon={contentDuplicate} width="24" height="24" />
								</button>
							</div>
							<div class="tooltip" data-tip={$LL.edit()}>
								<a href="/articles/{article.id}" class="btn-ghost btn-circle btn">
									<Icon icon={squareEditOutline} width="24" height="24" />
								</a>
							</div>
							<div class="tooltip" data-tip={$LL.delete()}>
								<button formaction="?/deleteArticle&id={article.id}" class="btn-ghost btn-circle btn">
									<Icon icon={trashCanOutline} width="24" height="24" />
								</button>
							</div>
						</div>
					{/if}
				</form>
				<p>{article.content}</p>
				{#if article.image}
					<p>image: {article.image}</p>
					<p>url: {article.url}</p>
					<img src={article.url} alt={article.image} class="max-w-md" />
				{/if}
			</div>
		{/each}
	</div>
</div>
