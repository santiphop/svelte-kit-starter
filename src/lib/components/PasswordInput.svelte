<script lang="ts">
	import Icon from '@iconify/svelte';
	import eyeOutline from '@iconify/icons-mdi/eye-outline';
	import eyeOffOutline from '@iconify/icons-mdi/eye-off-outline';

	export let name = 'password';
	export let placeholder = '';

	let showPassword = false;
	let password: string;
</script>

<div class="input-group">
	<input
		on:input={(e) => (password = e.currentTarget.value)}
		type={showPassword ? 'text' : 'password'}
		{name}
		{placeholder}
		class="input-bordered input"
	/>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={() => (showPassword = !showPassword)} class="btn-square btn">
		<Icon icon={showPassword ? eyeOutline : eyeOffOutline} width="24" height="24" />
	</div>
</div>
