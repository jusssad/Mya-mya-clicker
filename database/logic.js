// logicTasks.js

// Класс для задачи на логику
class LogicTask {
    /**
     * @param {string} question      - Текст задачи (например, "Кто быстрее: заяц или черепаха?")
     * @param {string} correctAnswer - Правильный ответ (например, "заяц")
     */
    constructor(question, correctAnswer) {
        this.question = question;
        this.correctAnswer = correctAnswer;
    }



}

// Примеры задач
const logicTasks = [
    new LogicTask(
        "У фермера есть курицы, собаки и коровы. Всего у животных 12 голов и 32 ноги. Сколько собак у фермера?",
        "4"
    ),
    new LogicTask(
        "Человек купил 10 книг, а дома понял, что одну из них он уже читал. Сколько книг он не читал?",
        "9"
    ),
    new LogicTask(
        "Какой предмет становится легче, если наполнить его воздухом?",
        "шар"
    ),


 



    new LogicTask(
        "Может ли страус назвать себя птицей?",
        "Нет"
    ),

    new LogicTask(
        "Что становится больше, если его перевернуть вверх дном?",
        "6"
    ),


    new LogicTask(
        "На столе лежат 10 карандашей, но вы можете взять только 2. Сколько останется на столе?",
        "10"
    ),

    new LogicTask(
        "У человека в правом кармане 3 монеты, а в левом — вдвое меньше. Сколько всего монет у человека?",
        "4"
    ),
    new LogicTask(
        "Какое число умноженное на само себя равно 81?",
        "9"
    ),
    new LogicTask(
        "Сколько месяцев в году имеют 28 дней?",
        "12"
    ),
    new LogicTask(
        "Что идет вверх, но никогда не опускается вниз?",
        "Возраст"
    ),

    new LogicTask(
        "Если бросить камень в воду, что произойдет?",
        "утонет"
    ),
    new LogicTask(
        "Сколько минут в одном часе?",
        "60"
    ),
    new LogicTask(
        "У какого животного самое длинное время сна?",
        "Коала"
    ),
    new LogicTask(
        "Какая вещь может быть наполнена воздухом и всё равно весить меньше?",
        "Шарик"
    ),
    new LogicTask(
        "Что может быть разным цветом, но не имеет формы?",
        "Тень"
    ),
    new LogicTask(
        "Если 2 плюс 2 равно 4, а 4 плюс 4 равно 8, то что такое 8 плюс 8?",
        "16"
    )
];

// Пример использования
logicTasks.forEach((task, index) => {
    console.log(`Задача ${index + 1}: ${task.question}`);
    console.log(`Правильный ответ: ${task.correctAnswer}`);
});