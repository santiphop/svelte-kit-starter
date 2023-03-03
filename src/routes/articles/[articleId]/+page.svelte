<script lang="ts">
	import type { PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const flashMessage: SubmitFunction = () => {
		return ({ result }) => {
			if (result.type === 'success') {
				console.log(result.data?.message)
				goto('/articles')
			} else if (result.type === 'failure') {
				console.log(result.data?.message)
			}
		};
	};
</script>

<form method="POST" use:enhance={flashMessage} class="card bg-secondary p-8 space-y-8">
	<h2 class="text-2xl">Edit this Article</h2>
	<input id="title" name="title" class="input" placeholder="Title" value={data?.article?.title} />
	<textarea
		id="content"
		name="content"
		class="textarea"
		placeholder="Content"
		value={data?.article?.content}
	/>
	<button formaction="?/editArticle" type="submit" class="btn btn-secondary">Submit</button>
</form>
