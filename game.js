document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGame");
    const gameArea = document.getElementById("gameArea");

    let isGameRunning = false;
    let coins = 100;

    startButton.addEventListener("click", () => {
        if (!isGameRunning) {
            startGame();
        }
    });

    function startGame() {
        isGameRunning = true;
        startButton.style.display = "none"; // 隐藏按钮
        alert("游戏开始！");
        spawnEnemies();
    }

    function spawnEnemies() {
        console.log("敌人生成中...");
        setInterval(() => {
            console.log("敌人移动...");
        }, 1000);
    }

    gameArea.addEventListener("click", (event) => {
        if (coins >= 50) {
            placeTower(event.clientX, event.clientY);
            coins -= 50;
            document.getElementById("coins").textContent = coins;
        } else {
            alert("金币不足！");
        }
    });

    function placeTower(x, y) {
        const tower = document.createElement("div");
        tower.classList.add("tower");
        tower.style.left = `${x - 10}px`;
        tower.style.top = `${y - 10}px`;
        gameArea.appendChild(tower);
    }
});document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGame");
    const gameArea = document.getElementById("gameArea");
    
    let isGameRunning = false;
    let coins = 100;
    let wave = 1;

    startButton.addEventListener("click", () => {
        if (!isGameRunning) {
            startGame();
        }
    });

    function startGame() {
        isGameRunning = true;
        startButton.style.display = "none"; // 隐藏按钮
        generateEnemies(); // 生成敌人
    }

    function generateEnemies() {
        console.log("敌人生成中...");
        // 模拟敌人移动
        setInterval(() => {
            console.log("敌人移动...");
        }, 1000);
    }

    // 监听用户点击区域放置防御塔
    gameArea.addEventListener("click", (event) => {
        if (coins >= 50) {
            placeTower(event.clientX, event.clientY);
            coins -= 50;
            updateUI();
        } else {
            alert("金币不足！");
        }
    });

    function placeTower(x, y) {
        const tower = document.createElement("div");
        tower.classList.add("tower");
        tower.style.left = `${x - 10}px`;
        tower.style.top = `${y - 10}px`;
        gameArea.appendChild(tower);
    }

    function updateUI() {
        document.getElementById("coins").textContent = coins;
    }
});document.getElementById("startGameBtn").addEventListener("click", function() {
    console.log("游戏开始！");
    startGame(); 
});

// 模拟游戏逻辑
function startGame() {
    alert("游戏开始！防御塔正在建造中...");
}

// 技能树功能
function upgradeAttackSpeed() {
    alert("攻击速度提升！");
}
function upgradeDamage() {
    alert("攻击力增强！");
}
function increaseIncome() {
    alert("金币收入增加！");
}

// 动态粒子背景
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();document.getElementById("gameArea").addEventListener("click", function(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    console.log("点击位置：", x, y);

    if (isInsideGameArea(x, y)) {
        placeTower(x, y);
        console.log("成功放置防御塔！");
    } else {
        console.log("点击了游戏区域外！");
    }
});

function isInsideGameArea(x, y) {
    return x >= 0 && x <= 600 && y >= 0 && y <= 400;
}

function placeTower(x, y) {
    let tower = document.createElement("div");
    tower.className = "tower";
    tower.style.left = x + "px";
    tower.style.top = y + "px";
    document.getElementById("gameArea").appendChild(tower);
}

function startGame() {
    console.log("游戏正式启动！");
}const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const towers = [];
const enemies = [];
const bullets = [];
let coins = 100;
let wave = 1;
let enemySpeed = 1;
let gameRunning = true;
let level = 1;

// 🌟 读取存储的最高分
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerText = highScore;

// 🌟 敌人 & BOSS 逻辑
class Enemy {
    constructor(type) {
        this.x = 0;
        this.y = Math.random() * canvas.height;
        this.type = type;
        this.speed = enemySpeed * (type === "fast" ? 2 : 1);
        this.size = type === "boss" ? 50 : 20;
        this.hp = type === "tank" ? 5 : type === "boss" ? 20 : 3;
    }

    move() {
        this.x += this.speed;
    }

    draw() {
        ctx.fillStyle = this.type === "boss" ? "purple" : (this.type === "tank" ? "darkred" : "red");
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// 🌟 动态粒子背景
const particleCanvas = document.getElementById("particleCanvas");
const pCtx = particleCanvas.getContext("2d");

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1
    });
}

function drawParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    pCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > particleCanvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > particleCanvas.height) p.speedY *= -1;

        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pCtx.fill();
    });
    requestAnimationFrame(drawParticles);
}

drawParticles();const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const towers = [];
const enemies = [];
const bullets = [];
let coins = 100;
let wave = 1;
let enemySpeed = 1;
let gameRunning = true;
let level = 1;

// 读取存储的最高分
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerText = highScore;

// 🎯 敌人 & BOSS 逻辑
class Enemy {
    constructor(type) {
        this.x = 0;
        this.y = Math.random() * canvas.height;
        this.type = type;
        this.speed = enemySpeed * (type === "fast" ? 2 : 1);
        this.size = type === "boss" ? 50 : 20;
        this.hp = type === "tank" ? 5 : type === "boss" ? 20 : 3;
    }

    move() {
        this.x += this.speed;
    }

    draw() {
        ctx.fillStyle = this.type === "boss" ? "purple" : (this.type === "tank" ? "darkred" : "red");
        ctx.fillRect(this.x, this.y, this.size, this.size);
        if (this.type === "boss") {
            ctx.fillStyle = "white";
            ctx.fillText("BOSS", this.x + 10, this.y + 30);
        }
    }
}

// 🏰 防御塔
class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.range = 100;
        this.attackSpeed = 60;
        this.level = 1;
        this.timer = 0;
    }

    attack() {
        if (this.timer > 0) {
            this.timer--;
            return;
        }
        this.timer = this.attackSpeed;

        enemies.forEach(enemy => {
            let dx = enemy.x - this.x;
            let dy = enemy.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.range) {
                bullets.push(new Bullet(this.x, this.y, enemy));
            }
        });
    }

    upgrade() {
        if (coins >= 50) {
            this.level++;
            this.attackSpeed -= 10;
            this.range += 10;
            coins -= 50;
            document.getElementById("coins").innerText = coins;
            alert("防御塔升级成功！当前等级: " + this.level);
        } else {
            alert("金币不足！");
        }
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 💥 子弹
class Bullet {
    constructor(x, y, target) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.speed = 5;
    }

    move() {
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;

        if (distance < 5) {
            this.target.hp--;
            if (this.target.hp <= 0) {
                enemies.splice(enemies.indexOf(this.target), 1);
                coins += 10;
                document.getElementById("coins").innerText = coins;
            }
            bullets.splice(bullets.indexOf(this), 1);
        }
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 🌟 游戏逻辑
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemies.forEach(enemy => { enemy.move(); enemy.draw(); });
    towers.forEach(tower => { tower.attack(); tower.draw(); });
    bullets.forEach(bullet => { bullet.move(); bullet.draw(); });

    requestAnimationFrame(update);
}

// ⛺ 放置塔防
canvas.addEventListener("click", function(event) {
    if (coins >= 50) {
        towers.push(new Tower(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop));
        coins -= 50;
        document.getElementById("coins").innerText = coins;
    }
});

// 🌟 生成 BOSS
function startNewWave() {
    wave++;
    enemySpeed += 0.2;
    document.getElementById("wave").innerText = wave;

    if (wave % 10 === 0) {
        alert("⚠️ BOSS 来袭！");
        enemies.push(new Enemy("boss"));
    }
}

// 🔥 启动游戏
setInterval(startNewWave, 10000);
update();const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const towers = [];
const enemies = [];
let enemySpeed = 1;
let gameRunning = true;

// 🎯 生成敌人
class Enemy {
    constructor() {
        this.x = 0;
        this.y = Math.random() * canvas.height;
        this.speed = enemySpeed;
        this.size = 20;
        this.hp = 3;
    }

    move() {
        this.x += this.speed;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// 🏰 防御塔
class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.range = 100;
        this.attackSpeed = 60;
        this.timer = 0;
    }

    attack() {
        if (this.timer > 0) {
            this.timer--;
            return;
        }
        this.timer = this.attackSpeed;

        enemies.forEach(enemy => {
            let dx = enemy.x - this.x;
            let dy = enemy.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.range) {
                enemy.hp--;
                if (enemy.hp <= 0) {
                    let index = enemies.indexOf(enemy);
                    enemies.splice(index, 1);
                }
            }
        });
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 🎮 游戏逻辑
function update() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 生成新敌人
    if (Math.random() < 0.02) {
        enemies.push(new Enemy());
    }

    // 更新敌人
    enemies.forEach(enemy => {
        enemy.move();
        enemy.draw();

        if (enemy.x > canvas.width) {
            gameRunning = false;
            alert("游戏失败！敌人突破了防线！");
        }
    });

    // 更新防御塔
    towers.forEach(tower => {
        tower.attack();
        tower.draw();
    });

    requestAnimationFrame(update);
}

// ⛺ 放置塔防
canvas.addEventListener("click", function(event) {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    towers.push(new Tower(x, y));
});

// 启动游戏
update();
