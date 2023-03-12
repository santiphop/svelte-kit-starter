<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="hero my-32">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">{$page.status}</h1>
			<p class="py-6">{$page.error?.message}</p>
			<a href="/" class="btn-primary btn">Go to homepage</a>
		</div>
	</div>
</div>
