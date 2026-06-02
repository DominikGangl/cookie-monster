<!DOCTYPE html>
<html lang="en">
	<head>
		<style>
			body {
				margin: 0;
				transition: background 0.1s;
			}
			body.flash {
				background: red;
			}
			svg {
				display: block;
			}
			.box {
				position: absolute;
				width: 20px;
				height: 20px;
				cursor: move;
				background: blue;
				z-index: 10;
			}
			#box1 {
				top: 270px;
				left: 60px;
			}
			#box2 {
				top: 310px;
				left: 60px;
			}
			.goal {
				position: absolute;
				width: 50px;
				height: 50px;
				background: green;
				top: 265px;
				left: 1120px;
				z-index: 1;
			}
		</style>
	</head>
	<body>
		<svg width="1200" height="600" id="gameSvg">
			<path
				id="wirePath"
				d="M 50,300 L 150,300 L 150,150 L 250,150 L 250,350 L 350,350 L 350,200 L 450,200 L 450,400 L 550,400 L 550,180 L 650,180 L 650,380 L 750,380 L 750,220 L 850,220 L 850,350 L 950,350 L 950,250 L 1050,250 L 1050,290 L 1150,290"
				stroke="#ddd"
				stroke-width="60"
				fill="none"
				stroke-linejoin="miter"
			/>
		</svg>
		<div class="box" id="box1"></div>
		<div class="box" id="box2"></div>
		<div class="goal"></div>

		<script>
			const wirePath = document.getElementById('wirePath');
			const svg = document.getElementById('gameSvg');

			const initialPositions = {
				box1: { x: 60, y: 270 },
				box2: { x: 60, y: 310 }
			};

			document.querySelectorAll('.box').forEach((box) => {
				let isDragging = false;
				let currentBox = null;
				const initialX = initialPositions[box.id].x;
				const initialY = initialPositions[box.id].y;

				box.addEventListener('mousedown', (e) => {
					isDragging = true;
					currentBox = box;
					e.preventDefault();
				});

				document.addEventListener('mousemove', (e) => {
					if (!isDragging || currentBox !== box) return;

					const x = e.clientX - 10;
					const y = e.clientY - 10;
					box.style.left = x + 'px';
					box.style.top = y + 'px';

					// Check if box center is on path
					const svgRect = svg.getBoundingClientRect();
					const pt = svg.createSVGPoint();
					pt.x = e.clientX - svgRect.left;
					pt.y = e.clientY - svgRect.top;

					if (!wirePath.isPointInStroke(pt)) {
						document.body.classList.add('flash');
						setTimeout(() => document.body.classList.remove('flash'), 100);

						// Reset both boxes
						document.querySelectorAll('.box').forEach((b) => {
							const startX = initialPositions[b.id].x;
							const startY = initialPositions[b.id].y;
							b.style.left = startX + 'px';
							b.style.top = startY + 'px';
						});

						isDragging = false;
						currentBox = null;
					} else {
						// Only check for win if box is on the path
						const goal = document.querySelector('.goal');
						const goalRect = goal.getBoundingClientRect();
						const boxRect = box.getBoundingClientRect();

						if (
							boxRect.right > goalRect.left &&
							boxRect.left < goalRect.right &&
							boxRect.bottom > goalRect.top &&
							boxRect.top < goalRect.bottom
						) {
							alert('You win!');
							// Optionally, reset or disable dragging here
						}
					}
				});

				document.addEventListener('mouseup', () => {
					isDragging = false;
					currentBox = null;
				});
			});
		</script>
	</body>
</html>
