<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';

	let escaping_button_element: HTMLButtonElement | null = null;

	let timeout = 170;
	let isTouchDevice = false;

	onMount(() => {
		if (browser) {
			isTouchDevice =
				'ontouchstart' in window ||
				navigator.maxTouchPoints > 0 ||
				(window as any).DocumentTouch instanceof Function;
		}
	});

	function escaping_button(button: HTMLButtonElement | null) {
		if (!button) return;

		setTimeout(() => {
			button.style.position = 'fixed';
			const x = Math.floor(Math.random() * 75);
			const y = Math.floor(Math.random() * 75);
			button.style.top = `${x}%`;
			button.style.left = `${y}%`;
		}, timeout);

		timeout += 20;
	}

	// For touch devices
	let touchTaps = 0;

	function handleClick(e: MouseEvent) {
		if (isTouchDevice) {
			e.preventDefault();
			if (touchTaps < 2) {
				touchTaps += 1;
				escaping_button(escaping_button_element);
			} else {
				goto('/win-screen');
			}
		} else {
			goto('/win-screen');
		}
	}
</script>

<Header />

<div class="popup center_popup">
	<h3>Okay, ich gebe auf...</h3>
	<p>Klicke einfach auf den Button und deine Daten bleiben bei dir!</p>
	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<div class="h-9 md:h-12">
		<button
			bind:this={escaping_button_element}
			on:mouseover={!isTouchDevice ? () => escaping_button(escaping_button_element) : null}
			on:click={handleClick}
		>
			Abschließen
		</button>
	</div>
</div>
