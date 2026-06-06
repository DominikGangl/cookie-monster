<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';

	let svgElement: SVGSVGElement;
	let pathElement: SVGPathElement;
	let gameContainer: HTMLDivElement;
	let goalElement: SVGRectElement;

	// Adjustable values
	const svgWidth = 1200;
	const svgHeight = 400;
	const snakeStrokeWidth = 60;

	const BOX_SIZE = 15;

	let flashRed = false;
	let isDragging = false;
	let pointerId: number | null = null;
	let dragElement: HTMLElement | null = null;
	let dragOffset = {
		x: 0,
		y: 0
	};

	// SVG coordinates
	const snakeYOffset = -100;

	const snakePath = `M 50,300
	   L 150,300
	   L 150,150
	   L 250,150
	   L 250,350
	   L 350,350
	   L 350,200
	   L 450,200
	   L 450,400
	   L 550,400
	   L 550,180
	   L 650,180
	   L 650,380
	   L 750,380
	   L 750,220
	   L 850,220
	   L 850,350
	   L 950,350
	   L 950,250
	   L 1050,250
	   L 1050,290
	   L 1150,290`.replace(/(\d+),(\d+)/g, (_match, x, y) => `${x},${Number(y) + snakeYOffset}`);

	const startPosition = {
		x: 60,
		y: 196 - BOX_SIZE / 2
	};

	let boxPosition = { ...startPosition };

	function resetBox() {
		boxPosition = { ...startPosition };
		isDragging = false;
		pointerId = null;
		dragElement = null;
		dragOffset = { x: 0, y: 0 };

		flashRed = true;
		setTimeout(() => {
			flashRed = false;
		}, 100);
	}

	function svgPointFromPointer(clientX: number, clientY: number) {
		const rect = svgElement.getBoundingClientRect();

		return {
			x: ((clientX - rect.left) / rect.width) * svgWidth,
			y: ((clientY - rect.top) / rect.height) * svgHeight
		};
	}

	function checkCollision(x: number, y: number) {
		const pt = svgElement.createSVGPoint();
		pt.x = x;
		pt.y = y;

		return pathElement.isPointInStroke(pt);
	}

	function shouldResetBox(boxX: number, boxY: number) {
		const centerX = boxX + BOX_SIZE / 2;
		const centerY = boxY + BOX_SIZE / 2;
		// adjust allowances to e.g. 0.5 to make it more forgiving on when it resets
		const horizontalAllowance = BOX_SIZE * 0.01;
		const verticalAllowance = BOX_SIZE * 0.01;

		const samplePoints = [
			[centerX, centerY],
			[centerX - horizontalAllowance, centerY],
			[centerX + horizontalAllowance, centerY],
			[centerX, centerY - verticalAllowance],
			[centerX, centerY + verticalAllowance]
		];

		return samplePoints.every(([x, y]) => !checkCollision(x, y));
	}

	function checkGoal(clientX: number, clientY: number) {
		if (!goalElement) return false;

		const rect = goalElement.getBoundingClientRect();

		return (
			clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
		);
	}

	function handlePointerDown(event: PointerEvent) {
		const svgPos = svgPointFromPointer(event.clientX, event.clientY);
		const target = event.currentTarget as HTMLElement | null;

		isDragging = true;
		pointerId = event.pointerId;
		dragElement = target;
		target?.setPointerCapture(event.pointerId);
		dragOffset = {
			x: svgPos.x - boxPosition.x,
			y: svgPos.y - boxPosition.y
		};
	}

	function handlePointerMove(event: PointerEvent) {
		if (!isDragging || event.pointerId !== pointerId) return;

		const svgPos = svgPointFromPointer(event.clientX, event.clientY);

		boxPosition = {
			x: svgPos.x - dragOffset.x,
			y: svgPos.y - dragOffset.y
		};

		if (shouldResetBox(boxPosition.x, boxPosition.y)) {
			resetBox();
			return;
		}

		if (checkGoal(event.clientX, event.clientY)) {
			goto('/level-12');
		}
	}

	function handlePointerUp(event: PointerEvent) {
		if (event.pointerId !== pointerId) return;

		dragElement?.releasePointerCapture(event.pointerId);

		isDragging = false;
		pointerId = null;
		dragElement = null;
	}

	onMount(() => {
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
		window.addEventListener('pointercancel', handlePointerUp);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
			window.removeEventListener('pointercancel', handlePointerUp);
		};
	});
</script>

<Header />

<div class="center_popup popup">
	<div class=" flex flex-col items-center">
		<h3 class="text-center text-2xl font-bold">Fast geschafft!</h3>

		<p>Um die Cookies abzulehnen, ziehe die blaue Box an das andere Ende. Ganz einfach.</p>

		<div
			bind:this={gameContainer}
			class="relative w-full max-w-[90vw]"
			class:bg-red-500={flashRed}
			style="margin-top:1.5vh;"
		>
			<svg
				bind:this={svgElement}
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
				class="h-auto w-full select-none"
			>
				<path
					bind:this={pathElement}
					d={snakePath}
					stroke="#dddddd"
					stroke-width={snakeStrokeWidth}
					fill="none"
					stroke-linejoin="miter"
				/>
				<rect
					bind:this={goalElement}
					x="1110"
					y="160"
					width="60"
					height="60"
					rx="2"
					fill="#2e931e"
					stroke-width="3"
				/>

				<!-- <line x1="1120" y1="270" x2="1160" y2="310" stroke="white" stroke-width="6" />
				<line x1="1160" y1="270" x2="1120" y2="310" stroke="white" stroke-width="6" /> -->
			</svg>

			<!-- draggable box -->
			<div
				role="button"
				tabindex="-1"
				class="absolute z-10 cursor-grab rounded-[1px] bg-[#005ef5] active:cursor-grabbing"
				style={`
					touch-action: none;
					width:${BOX_SIZE}px;
					height:${BOX_SIZE}px;
					left:${(boxPosition.x / svgWidth) * 100}%;
					top:${(boxPosition.y / svgHeight) * 100}%;
				`}
				on:pointerdown={handlePointerDown}
			></div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		transition: background-color 0.1s;
	}
</style>
