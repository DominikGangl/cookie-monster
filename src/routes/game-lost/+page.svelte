<div class="h-screen w-screen bg-[#ac4040]">
	<img style="padding-top: 1.5em" src="/images/game_over.png" class="center" alt="cookie monster" />
	<div class="popup" style="padding-top: 1.75rem;">
		<div class="mb-3">Das Cookie Monster hat es geschafft dir alle deine Daten abzunehmen...</div>
		<button
			class="mb-2"
			on:click={() => {
				location.href = '/';
			}}
		>
			Neuer Versuch
		</button>
	</div>
</div>
