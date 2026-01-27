<script lang="ts">
	import { goto } from '$app/navigation';
	import { loseCookieAndGoTo, infoTitle, infoText } from '$lib/scripts/game';
	import Header from '$lib/components/Header.svelte';

	let showDetails = false;

	function setPatternInfo() {
		infoTitle.set('Überwältigende Infos');
		infoText.set(
			'Viel Text, wenig Inhalt. Durch endloses Scrollen solltest du müde werden und einfach zustimmen.'
		);
	}
</script>

<Header />
<div class="popup center_popup">
	<h3>Allgemeine Geschäftsbedingungen</h3>
	<p>Vielen Dank, dass du dich dazu enschieden hast, »Bezwinge das Cookiemonster« zu spielen.</p>
	<div class="mx-auto flex w-fit flex-col items-center gap-4">
		<button
			on:click={() => {
				setPatternInfo();
				loseCookieAndGoTo('/level-2');
			}}
		>
			Zustimmen & mit dem Spiel fortfahren
		</button>
		{#if !showDetails}
			<!-- svelte-ignore a11y_interactive_supports_focus -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_missing_attribute -->
			<a class="mehr-anzeigen-button" role="button" on:click={() => (showDetails = true)}>
				Mehr anzeigen
			</a>
		{/if}
	</div>

	{#if showDetails}
		<p class="pt-4">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Mollis nunc sed id semper. Convallis convallis tellus id
			interdum velit laoreet. Sollicitudin tempor id eu nisl nunc mi ipsum. Malesuada pellentesque
			elit eget gravida. Montes nascetur ridiculus mus mauris vitae ultricies leo. At urna
			condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum.
			Risus quis varius quam quisque id. Pretium vulputate sapien nec sagittis aliquam malesuada
			bibendum. Massa sed elementum tempus egestas sed. At lectus urna duis convallis convallis
			tellus id interdum velit. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet.
			Facilisis gravida neque convallis a cras semper auctor neque vitae. Eu lobortis elementum nibh
			tellus molestie nunc non. Viverra orci sagittis eu volutpat odio facilisis mauris sit amet.
			Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Tortor pretium viverra
			suspendisse potenti nullam ac tortor vitae purus. Egestas fringilla phasellus faucibus
			scelerisque eleifend. Sit amet nisl suscipit adipiscing bibendum est ultricies. Metus dictum
			at tempor commodo ullamcorper a. Mauris nunc congue nisi vitae suscipit tellus mauris. Mauris
			pellentesque pulvinar pellentesque habitant morbi. Leo vel orci porta non pulvinar neque
			laoreet suspendisse interdum. Iaculis eu non diam phasellus vestibulum lorem sed. Facilisis
			gravida neque convallis a cras. Quam nulla porttitor massa id neque aliquam. Arcu non odio
			euismod lacinia at quis. Sit amet commodo nulla facilisi nullam vehicula. Sed risus ultricies
			tristique nulla aliquet enim. Venenatis tellus in metus vulputate eu. A scelerisque purus
			semper eget duis at tellus. Ultricies mi quis hendrerit dolor magna. Viverra maecenas accumsan
			lacus vel. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Amet consectetur
			adipiscing elit ut. Nibh praesent tristique magna sit amet purus gravida quis. Lectus sit amet
			est placerat in egestas erat imperdiet sed. Dignissim enim sit amet venenatis. Viverra aliquet
			eget sit amet tellus cras adipiscing enim eu. Dictum non consectetur a erat nam at lectus.
			Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Tempor nec feugiat
			nisl pretium fusce id velit. Feugiat vivamus at augue eget arcu. Turpis massa tincidunt dui ut
			ornare. Lorem sed risus ultricies tristique nulla aliquet enim tortor at.
		</p>

		<button on:click={() => goto('/level-3')}> Ablehnen & mit dem Spiel fortfahren </button>
	{/if}
</div>
