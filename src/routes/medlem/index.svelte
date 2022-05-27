<script context="module">
	export const prerender = false;
</script>

<script>
	export let status = false;
</script>

<article>
	<h1>Medlemssidor</h1>
	{#if !status}
		<p>Ange lösenord för att komma åt medlemssidor</p>
		<form method="post">
			<label>
				Lösenord<br />
				<input type="text" name="password" />
			</label>
			<button type="submit">Logga in</button>
		</form>
	{:else}
		Inloggad
	{/if}
</article>

<style>
	article {
		max-width: 960px;
		padding: var(--padding) var(--padding-small);
	}

	@media (max-width: 960px) {
		article {
			padding: var(--padding-small);
			padding-top: 64px;
		}
	}
</style>
