<script lang="ts">
	const date = new Date();
	const currentYear = date.getFullYear();
</script>

<div class="footer">
	<div class="footer-info">
		<div class="footer-info-item">
			<h3>Brf Trasten 7 och 8</h3>
			Surbrunnsgatan 9-11<br />
			114 27 Stockholm
		</div>
		<div class="footer-info-item">
			<h3>E-post</h3>
			brftrasten7och8@gmail.com
		</div>

		<div class="footer-info-item">
			<h3>Organisationsnummer</h3>
			769607-4371
		</div>
	</div>
	<div class="footer-bottom">© {currentYear} Brf Trasten 7 och 8</div>
</div>

<style>
	.footer {
		border-top: 1px solid var(--color-border);

		max-width: 960px;
		padding: var(--padding) var(--padding-small);
		overflow-x: auto;
	}

	.footer-info-item {
		padding-bottom: var(--padding-small);
	}

	@media (max-width: 960px) {
		.footer {
			padding: var(--padding-small);
		}
	}
</style>
