<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import LL from '$lib/i18n/i18n-svelte';
	import toast from 'svelte-french-toast';

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

<div class="card bg-blue-200" in:fade>
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
			<div class="card card-body bg-accent text-accent-content">
				<form method="POST" use:enhance={flashMessage} class="flex justify-between">
					<h3 class="text-2xl">{article.title}<span class="text-sm">(id: {article.id})</span></h3>
					{#if article.userId === data.user?.userId}
						<div>
							<div class="tooltip" data-tip={$LL.duplicate()}>
								<input class="hidden" name="title" value={article.title} />
								<input class="hidden" name="content" value={article.content} />
								<button formaction="?/createArticle" class="btn-ghost btn-circle btn">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
										/>
									</svg>
								</button>
							</div>
							<div class="tooltip" data-tip={$LL.edit()}>
								<a href="/articles/{article.id}" class="btn-ghost btn-circle btn">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
										/>
									</svg>
								</a>
							</div>
							<div class="tooltip" data-tip={$LL.delete()}>
								<button formaction="?/deleteArticle&id={article.id}" class="btn-ghost btn-circle btn">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-6 stroke-error"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								</button>
							</div>
						</div>
					{/if}
				</form>
				<p>{article.content}</p>
				{#if article.image}
					<p>image: {article.image}</p>
					<p>url: {article.url}</p>
					<img src="{article.url}" alt={article.image} class="max-w-md" />
				{/if}
			</div>
		{/each}
	</div>
</div>
