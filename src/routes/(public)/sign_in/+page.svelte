<script>
	import LL from '$lib/i18n/i18n-svelte';
</script>

<form method="POST" class="card bg-pink-200 gap-2 p-8">
	{$LL.sign_in()}
	<input class="input" name="username" placeholder={$LL.username()} />
	<input class="input" type="password" name="password" placeholder={$LL.password()} />
	<button class="btn">{$LL.sign_in()}</button>
	<a class="link" href="/register"> {$LL.create_new_account()} </a>
</form>
