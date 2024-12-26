
// achievements.js

// Класс для описания достижения
class Achievement {
    constructor(name, description, requirement, reward) {
        this.name = name; // Название достижения
        this.description = description; // Описание достижения
        this.requirement = requirement; // Условие для получения достижения
        this.reward = reward; // Награда за достижение
    }
}

// Примеры достижений
const achievements = [
    new Achievement(
        "Первый клик",
        "Сделайте первый клик в игре.",
        () => game.score >= 1,
        { points: 10, energy: 5 }
    ),
    new Achievement(
        "Сотня кликов",
        "Сделайте 100 кликов.",
        () => game.score >= 100,
        { points: 50, energy: 20 }
    ),

    new Achievement(
        "Первое улучшение",
        "Купите первое улучшение.",
        () => game.upgrades.length >= 1,
        { points: 100, energy: 30 }
    )
];



// Подключение функции проверки достижений к игре
setInterval(checkAchievements, 1000);
