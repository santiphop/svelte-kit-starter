<script lang="ts">
	import type { PageData } from "./$types";
  import { fade } from 'svelte/transition'

  export let data: PageData
</script>

<div class="card bg-primary" in:fade>
  <div class="card-body">
    <h2 class="card-title">Articles</h2>
    {#each data.articles as article}
      <div class="card card-body bg-accent text-accent-content">
        <h3 class="text-2xl">{article.title}</h3>
        <p>{article.content}</p>
      </div>
    {/each}
  </div>
</div>
