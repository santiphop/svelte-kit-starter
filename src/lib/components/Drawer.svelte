<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte'
	import LocaleSwitcher from './LocaleSwitcher.svelte'

	let drawers = ['articles', 'link1', 'link2', 'link3', 'link4', 'link5']
</script>

<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<!-- Page content here -->
		<!-- Navbar -->
		<div class="navbar bg-secondary/50">
			<div class="flex-1">
				<label for="my-drawer-2" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
						/>
					</svg>
				</label>
				<a href="/" class="btn btn-ghost text-xl lg:hidden normal-case">SvelteKit Starter Pack</a>
			</div>
			<div class="flex-none">
				<ThemeSwitcher />
				<LocaleSwitcher />
				<div class="dropdown-hover dropdown-end dropdown">
					<label
						for="dropdown-0"
						class="btn btn-ghost no-animation m-1 cursor-default gap-4 text-lg text-base-100"
						data-cy="profile_dropdown"
					>
						<span class="max-lg:hidden normal-case">your name</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</label>
					<ul
						id="dropdown-0"
						class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow-lg"
					>
						<li data-cy="profile"><a href="/profile">{'profile'}</a></li>
						<li data-cy="pdpa"><a href="/signout">{'sign_out'}</a></li>
					</ul>
				</div>
			</div>
		</div>
		<!-- Slot -->
		<div class="m-5 lg:m-12">
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
						<a href={link} class="whitespace-pre-line p-2 pl-6 capitalize">
							{link}
						</a>
					</li>
				{/each}
			</div>
		</ul>
	</div>
</div>
