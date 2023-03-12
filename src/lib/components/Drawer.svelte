<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import LocaleSwitcher from './LocaleSwitcher.svelte';
	import { page } from '$app/stores';

	let drawers = ['articles', 'link1', 'link2', 'link3', 'link4', 'link5'];
</script>

<div class="drawer-mobile drawer max-h-screen">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<!-- Navbar -->
		<div class="navbar bg-secondary/50">
			<div class="flex-1">
				<label for="my-drawer-2" class="btn-ghost btn lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
					</svg>
				</label>
				<a href="/" class="btn-ghost btn text-xl normal-case lg:hidden">SvelteKit Starter Pack</a>
			</div>
			<div class="flex-none">
				<ThemeSwitcher />
				<LocaleSwitcher />
				{#if $page.data.user}
					<div class="dropdown-hover dropdown-end dropdown">
						<label
							for="dropdown-0"
							class="btn-ghost no-animation btn m-1 cursor-default gap-4 text-lg text-base-100"
							data-cy="profile_dropdown"
						>
							<span class="normal-case max-lg:hidden">{$page.data.user.name}</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-6 w-6"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
							</svg>
						</label>
						<form method="POST">
							<ul id="dropdown-0" class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow-lg">
								<li data-cy="profile"><a href="/profile">Profile</a></li>
								<li data-cy="pdpa"><button formaction="/sign_out">Sign out</button></li>
							</ul>
						</form>
					</div>
				{:else}
					<div class="flex gap-2">
						<a class="btn-ghost btn" href="/sign_in">Sign in</a>
						<a class="btn-ghost btn" href="/register">Register</a>
					</div>
				{/if}
			</div>
		</div>
		<!-- Slot -->
		<div class="p-5 lg:p-12">
			<slot />
		</div>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<ul class="menu w-64 overflow-y-auto border-r-2 border-neutral bg-base-100 text-base-content">
			<!-- Sidebar content here -->
			<a href="/" class="mx-6 mt-7 flex gap-2">Logo (Homepage)</a>
			<div class="mt-10">
				{#each drawers as link}
					<li data-cy="drawer_{link}">
						<a href="/{link}" class="whitespace-pre-line p-2 pl-6 capitalize">
							{link}
						</a>
					</li>
				{/each}
			</div>
		</ul>
	</div>
</div>
