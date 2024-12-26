class Game {
    constructor() {
        this.score = 0;
        this.energy = 100;
        this.isGameOver = false;
        this.isMusicPlaying = false;
        this.isSoundOn = true;
        this.clickCounter = 0; // Счетчик кликов
        this.startMusic = new Audio('sounds/start.mp4');
        this.mainMusic = new Audio('sounds/main.mp4');
        this.startMusic.volume = 1.0;
        this.mainMusic.volume = 1.0;
        this.mainMusic.loop = true;
        this.upgrades = []; // Список купленных улучшений
    }

    playBackgroundMusic() {
        // Только если музыка не играет
        if (!this.isMusicPlaying) {
            // Воспроизводим стартовую музыку по клику
            this.startMusic.play().then(() => {
                this.startMusic.addEventListener('ended', () => {
                    this.mainMusic.play();
                });
            }).catch((error) => {
                console.error('Ошибка воспроизведения стартовой музыки:', error);
            });
    
            this.isMusicPlaying = true;
        }
    }

    toggleSound() {
        const button = document.getElementById('sound-toggle-btn');
        if (this.isSoundOn) {
            this.startMusic.volume = 0.0;
            this.mainMusic.volume = 0.0;
            this.isSoundOn = false;
            button.classList.add('sound-off');
        } else {
            this.startMusic.volume = 1.0;
            this.mainMusic.volume = 1.0;
            this.isSoundOn = true;
            button.classList.remove('sound-off');
    
            // После включения звука начинаем воспроизведение музыки, если оно ещё не началось
            if (!this.isMusicPlaying) {
                this.playBackgroundMusic();
            }
        }
    }
    

    incrementScore() {
        if (!this.isMusicPlaying) {
            this.playBackgroundMusic();
        }

        if (this.energy < 10) {
            this.showNotification();
            return;
        }

        this.score++;
        this.clickCounter++;
        document.getElementById('score').textContent = this.score;

        if (this.clickCounter % 10 === 0) {
            this.decrementEnergy();
        }
    }

    decrementEnergy() {
        if (this.energy > 0) {
            this.energy -= 10;
            this.updateEnergyFrame();
        }

        if (this.energy === 0) {
            this.isGameOver = true;
        }
    }

    updateEnergyFrame() {
        const energyIcon = document.querySelector('.energy-icon');
        if (energyIcon) {
            energyIcon.src = `images/energy/${this.energy}.png`;
        }
    }

    showNotification() {
        const existingNotification = document.querySelector('.energy-notification');
        if (existingNotification) {
            return;
        }

        const container = document.querySelector('.container');
        const notification = document.createElement('div');
        notification.classList.add('energy-notification');
        container.appendChild(notification);

        const message = "Энергия закончилась! Найдите способ восстановить её.";
        let index = 0;

        function typeText() {
            if (index < message.length) {
                notification.textContent += message[index];
                index++;
                setTimeout(typeText, 50);
            } else {
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }
        }

        typeText();
    }

    goToGame() {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <img src="images/skins/defolt.pikmi/pikmi.png" alt="Click Me" class="click-image" onclick="game.incrementScore()">
        `;
    }

    buyUpgrade(upgrade) {
        if (this.score >= upgrade.cost) {
            this.score -= upgrade.cost;
    
            // Проверяем, есть ли уже элемент для улучшения
            let upgradeElement = document.querySelector(`#upgrade-${upgrade.id}`);
            if (upgradeElement) {
                // Обновляем количество и бонус
                const countElement = upgradeElement.querySelector('.upgrade-count');
                const bonusElement = upgradeElement.querySelector('.upgrade-bonus');
                upgrade.count += 1;
                countElement.textContent = `Количество: ${upgrade.count}`;
                bonusElement.textContent = `Бонус: ${upgrade.count * upgrade.points} очков`;
            } else {
                // Если элемента еще нет, добавляем его
                const container = document.querySelector('.upgrades-list');
                const li = document.createElement('li');
                li.id = `upgrade-${upgrade.id}`;
                li.innerHTML = `
                    <h3>${upgrade.name}</h3>
                    <p class="upgrade-count">Количество: 1</p>
                    <p class="upgrade-bonus">Бонус: ${upgrade.points} очков</p>
                `;
                container.appendChild(li);
                upgrade.count = 1;
            }
    
            document.getElementById('score').textContent = this.score;
    
            // Генерация очков с улучшения
            setInterval(() => {
                this.score += upgrade.points;
                document.getElementById('score').textContent = this.score;
            }, upgrade.cycleTime * 1000);
    
            alert(`Улучшение "${upgrade.name}" успешно куплено!`);
        } else {
            alert("Недостаточно очков для покупки этого улучшения!");
        }
    }
    
    
}

class TaskManager {
    constructor() {
        this.mathTasks = mathTasks;
        this.grammarTasks = grammarTasks;
        this.logicTasks = logicTasks;
    }

    getRandomTask(taskArray) {
        return taskArray[Math.floor(Math.random() * taskArray.length)];
    }

    loadTask(type) {
        this.currentTaskType = type;
        const container = document.querySelector('.container');
        container.innerHTML = '';

        let task;

        switch (type) {
            case "math":
                task = this.getRandomTask(this.mathTasks);
                break;
            case "grammar":
                task = this.getRandomTask(this.grammarTasks);
                break;
            case "logic":
                task = this.getRandomTask(this.logicTasks);
                break;
            default:
                return;
        }

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        taskContainer.innerHTML = `
            <p>${task.question}</p>
            <input type="text" id="user-answer" class="task-input" placeholder="Введите ваш ответ">
            <button class="task-button" onclick="taskManager.checkTaskAnswer('${task.correctAnswer}')">Проверить</button>
        `;

        container.appendChild(taskContainer);
    }

    checkTaskAnswer(correctAnswer) {
        const userAnswer = document.getElementById('user-answer').value.trim().toLowerCase();
        const container = document.querySelector('.container');

        if (userAnswer === correctAnswer.toLowerCase()) {
            game.energy = Math.min(game.energy + 20, 100);
            game.updateEnergyFrame();
            game.clickCounter = 0;

            container.innerHTML = `
                <div class="task-container">
                    <p>Правильно! Вы можете выбрать:</p>
                    <div style="display: flex; gap: 20px; margin-top: 20px;">
                        <button class="task-button" onclick="taskManager.returnToBlackMarket()">Закрыть</button>
                        <button class="task-button" onclick="taskManager.loadNextTask()">Продолжить</button>
                    </div>
                </div>
            `;
        } else {
            alert("Неправильно! Попробуйте ещё раз.");
        }
    }

    returnToBlackMarket() {
        window.goToBlackMarket();
    }

    loadNextTask() {
        this.loadTask(this.currentTaskType);
    }
}

const game = new Game();
const taskManager = new TaskManager();

window.goToSettings = function () {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="settings">
            <button id="sound-toggle-btn" onclick="game.toggleSound()"></button>
        </div>
    `;
    const button = document.getElementById('sound-toggle-btn');
    if (!game.isSoundOn) {
        button.classList.add('sound-off');
    }
};


window.goToShop = function () {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="shop">
            <div class="upgrade" onclick="game.buyUpgrade(корм)">
                <div class="upgrade-container">
                    <img src="images/shop/корм.png" alt="Корм" class="upgrade-image">
                    <div class="upgrade-text">
                        <h3>${корм.name}</h3>
                        <p>${корм.description}</p>
                        <p>Стоимость: ${корм.cost}</p>
                    </div>
                </div>
            </div>
            <div class="upgrade" onclick="game.buyUpgrade(бабушка)">
                <div class="upgrade-container">
                    <img src="images/shop/бабушка.png" alt="Бабушка" class="upgrade-image">
                    <div class="upgrade-text">
                        <h3>${бабушка.name}</h3>
                        <p>${бабушка.description}</p>
                        <p>Стоимость: ${бабушка.cost}</p>
                    </div>
                </div>
            </div>
            <div class="upgrade" onclick="game.buyUpgrade(фабрикаКотиков)">
                <div class="upgrade-container">
                    <img src="images/shop/фабрикаКотиков.png" alt="Фабрика котиков" class="upgrade-image">
                    <div class="upgrade-text">
                        <h3>${фабрикаКотиков.name}</h3>
                        <p>${фабрикаКотиков.description}</p>
                        <p>Стоимость: ${фабрикаКотиков.cost}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};




window.goToGame = function () {
    game.goToGame();
};

window.goToBlackMarket = function () {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Очищаем содержимое контейнера

    // Создаем уведомление
    const notification = document.createElement('div');
    notification.classList.add('black-market-notification');
    container.appendChild(notification);

    const message = "Ты попал на черный рынок энергии... Выполняй разные умственные задачи... Для того, чтобы восстановить свою энергию.";
    let index = 0;

    // Функция для поэтапного отображения текста
    function typeText() {
        if (index < message.length) {
            notification.textContent += message[index];
            index++;
            setTimeout(typeText, 50); // Задержка между символами
        } else {
            // Удаляем уведомление и отображаем задачи через 3 секунды
            setTimeout(() => {
                notification.remove();

                // Добавляем кнопки выбора задач
                container.innerHTML = `
                    <div class="black-market">
                        <div class="task-options">
                            <button class="task-option" onclick="taskManager.loadTask('math')">Математические задачи</button>
                            <button class="task-option" onclick="taskManager.loadTask('grammar')">Задачи на грамотность</button>
                            <button class="task-option" onclick="taskManager.loadTask('logic')">Логические задачи</button>
                        </div>
                    </div>
                `;
            }, 3000); // Задержка перед удалением уведомления
        }
    }

    typeText(); // Запускаем отображение текста
};


function displayAchievements() {
    const container = document.querySelector('.container');
    container.innerHTML = '<h2>Достижения</h2>';
    const achievementsList = document.createElement('div');
    achievementsList.classList.add('achievements-list');

    achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.classList.add('achievement');
        if (achievement.unlocked) {
            achievementElement.classList.add('unlocked'); // Добавляем класс выполненного достижения
        }
        achievementElement.innerHTML = `
            <h3>${achievement.name}</h3>
            <p>${achievement.description}</p>
        `;
        achievementsList.appendChild(achievementElement);
    });

    container.appendChild(achievementsList);
}


window.goToAchievements = displayAchievements;


// script.js - улучшенная логика обработки достижений с изоляцией действий игрока

// Добавляем отдельный счётчик кликов для игрока
game.userClicks = 0; // Счётчик кликов пользователя

// Проверка и разблокировка достижений на основе кликов пользователя
function checkAchievementsAfterClick() {
    achievements.forEach(achievement => {
        if (achievement.requirement() && !achievement.unlocked) {
            achievement.unlocked = true;
            alert(`Достижение "${achievement.name}" разблокировано! Награда: ${achievement.reward.points} очков, ${achievement.reward.energy} энергии.`);
            game.score += achievement.reward.points;
            game.energy = Math.min(game.energy + achievement.reward.energy, 100);
            document.getElementById('score').textContent = game.score;
            game.updateEnergyFrame();
        }
    });
}

// При клике (только действия игрока)
game.incrementScore = function () {
    if (!this.isMusicPlaying) {
        this.playBackgroundMusic();
    }

    if (this.energy < 10) {
        this.showNotification();
        return;
    }

    this.score++;
    this.userClicks++; // Увеличиваем только счётчик кликов пользователя
    this.clickCounter++;
    document.getElementById('score').textContent = this.score;

    if (this.clickCounter % 10 === 0) {
        this.decrementEnergy();
    }

    // Проверка достижений на основе кликов игрока
    checkAchievementsAfterClick();
};

// При покупке улучшения (тоже действия игрока)
game.buyUpgrade = function (upgrade) {
    if (this.score >= upgrade.cost) {
        this.score -= upgrade.cost;
        this.upgrades.push(upgrade);
        document.getElementById('score').textContent = this.score;

        // Начинаем генерировать очки с улучшения
        setInterval(() => {
            this.score += upgrade.points;
            document.getElementById('score').textContent = this.score;
        }, upgrade.cycleTime * 1000);

        alert(`Улучшение "${upgrade.name}" успешно куплено!`);

        // Проверка достижений после покупки улучшения
        checkAchievementsAfterClick();
    } else {
        alert("Недостаточно очков для покупки этого улучшения!");
    }
};

// При изменении энергии (например, выполнение задач, не игрок)
game.updateEnergyFrame = function () {
    const energyIcon = document.querySelector('.energy-icon');
    if (energyIcon) {
        energyIcon.src = `images/energy/${this.energy}.png`;
    }

    // Проверка достижений не привязана к системным действиям
};

window.goToUpgrades = function () {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="upgrades">
            <h2>Статистика Улучшений</h2>
            <ul class="upgrades-list"></ul>
        </div>
    `;

    // Добавляем текущие улучшения
    game.upgrades.forEach(upgrade => {
        const li = document.createElement('li');
        li.id = `upgrade-${upgrade.id}`;
        li.innerHTML = `
            <h3>${upgrade.name}</h3>
            <p class="upgrade-count">Количество: ${upgrade.count || 1}</p>
            <p class="upgrade-bonus">Бонус: ${upgrade.count * upgrade.points} очков</p>
        `;
        container.querySelector('.upgrades-list').appendChild(li);
    });
};

