const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      SIZE = 400,
      SCALE = 8,
      player = { x: 246, y: 152, size: SIZE / 30, speed: 4 },
      movement = {},
      minimap = {
          size: SIZE / SCALE,
          x: SIZE - (SIZE / SCALE),
          y: 0 },
      keys = {
        UP: ['Up', 'ArrowUp', 'W', 'w'],
        DOWN: ['Down', 'ArrowDown', 'S', 's'],
        LEFT: ['Left', 'ArrowLeft', 'A', 'a'],
        RIGHT: ['Right', 'ArrowRight', 'D', 'd']}

// Setup
canvas.width = SIZE;
canvas.height = SIZE;

const move = () => {
    if (movement.up) {
        player.y = player.y - player.speed < 0 ? SIZE : player.y - player.speed;
    }
    if (movement.down) {
        player.y = player.y + player.speed > SIZE ? 0 : player.y + player.speed;
    }
    if (movement.left) {
        player.x = player.x - player.speed < 0 ? SIZE : player.x - player.speed;
    }
    if (movement.right) {
        player.x = player.x + player.speed > SIZE ? 0 : player.x + player.speed;
    }
}

const play = () => {
    move()

    // Calculate our mini player
    const miniPlayer = {
        x: (player.x / SCALE) + minimap.x,
        y: (player.y / SCALE),
        size: player.size / SCALE,
    }

    // Draw Background
    ctx.fillStyle = 'rebeccapurple';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw minimap
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(minimap.x, minimap.y, minimap.size, minimap.size)

    // Draw minimap player
    ctx.fillStyle = 'black';
    ctx.fillRect(miniPlayer.x, miniPlayer.y,
                 miniPlayer.size, miniPlayer.size)

    // Draw player
    ctx.fillStyle = 'slategrey';
    ctx.fillRect(player.x, player.y,
                 player.size, player.size)


    requestAnimationFrame(play)
}


// Keyboard control
window.addEventListener('keypress', (event) => {
    if (keys.UP.includes(event.key)) movement.up = true
    if (keys.DOWN.includes(event.key)) movement.down = true
    if (keys.LEFT.includes(event.key)) movement.left = true
    if (keys.RIGHT.includes(event.key)) movement.right = true
})
window.addEventListener('keyup', (event) => {
    if (keys.UP.includes(event.key)) delete movement.up
    if (keys.DOWN.includes(event.key)) delete movement.down
    if (keys.LEFT.includes(event.key)) delete movement.left
    if (keys.RIGHT.includes(event.key)) delete movement.right
})

// Start main game loop
play()
