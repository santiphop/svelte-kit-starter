<script lang="ts">
	import Icon from '@iconify/svelte';
	import eyeOutline from '@iconify/icons-mdi/eye-outline';
	import eyeOffOutline from '@iconify/icons-mdi/eye-off-outline';

	export let name = 'password';
	export let placeholder = '';
	export let required = false;

	let showPassword = false;
	let password: string;
</script>

<div class="input-group">
	<input
		on:input={(e) => (password = e.currentTarget.value)}
		type={showPassword ? 'text' : 'password'}
		{name}
		{placeholder}
		{required}
		class="input-bordered input border-r-0"
	/>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={() => (showPassword = !showPassword)}
		class="btn-outline btn-ghost btn-square btn border-l-0 border-base-content"
	>
		<Icon icon={showPassword ? eyeOutline : eyeOffOutline} width="24" height="24" />
	</div>
</div>
