const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const radius = 10;
const numCircles = 70;
let circles = [];

let text = "Good Morning everyone !";
let textSize = 100;
const bold = true;
const maxTextSize = 100;

const textColor = "purple";
const textX = canvas.width / 2;
const textY = canvas.height / 2;

for (let i = 0; i < numCircles; i++) {
    circles.push({
        x: Math.random() * (canvas.width - 2 * radius) + radius,
        y: Math.random() * (canvas.height - 2 * radius) + radius,
        dx: Math.random() * 4 - 2,
        dy: Math.random() * 4 - 2,
        color: "pink"
    });
}

let frameCount = 0;

function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numCircles; i++) {
        const circleA = circles[i];

        for (let j = i + 1; j < numCircles; j++) {
            const circleB = circles[j];

            const dx = circleB.x - circleA.x;
            const dy = circleB.y - circleA.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(circleA.x, circleA.y);
                ctx.lineTo(circleB.x, circleB.y);
                ctx.strokeStyle = "purple";
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();

        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x + radius > canvas.width || circle.x - radius < 0) {
            circle.dx = -circle.dx;
        }
        if (circle.y + radius > canvas.height || circle.y - radius < 0) {
            circle.dy = -circle.dy;
        }
    });

    ctx.font = `${textSize}px Arial`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.fillText(
        text.substring(0, Math.floor(frameCount / 10)),
        textX,
        textY
    );

    frameCount++;

    if (frameCount > text.length * 10) {
        frameCount = 0;
        textSize = maxTextSize;
        text = "Good Morning everyone!";
    }

    requestAnimationFrame(drawCircles);
}

drawCircles();