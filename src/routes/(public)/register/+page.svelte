<script>
	import LL from '$lib/i18n/i18n-svelte';
</script>

<form method="POST" class="card bg-pink-200 gap-2 p-8">
	{$LL.register()}
	<input class="input" name="name" placeholder={$LL.name()} required />
	<input class="input" name="username" placeholder={$LL.username()} required />
	<input class="input" type="password" name="password" placeholder={$LL.password()} required />
	<button class="btn">{$LL.register()}</button>
</form>
