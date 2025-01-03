// grammarTasks.js

// Класс для задачи на грамотность
class GrammarTask {
    /**
     * @param {string} question      - Текст задачи (например, "Вставьте пропущенную букву: 'Д__рево'")
     * @param {string} correctAnswer - Правильный ответ (например, "е")
     */
    constructor(question, correctAnswer) {
        this.question = question;
        this.correctAnswer = correctAnswer;
    }


}

// Примеры задач
const grammarTasks = [
    new GrammarTask("Вставьте пропущенную букву: 'Д__рево'", "е"),
    new GrammarTask("Вставьте пропущенную букву: 'Л__стья'", "и"),


    new GrammarTask("Вставьте пропущенную букву: 'Мол__ко'", "о"),
    new GrammarTask("Вставьте пропущенную букву: 'Ст__нка'", "е"),
    new GrammarTask("Вставьте пропущенную букву: 'К__тёнок'", "о"),
    new GrammarTask("Вставьте пропущенную букву: 'З__мля'", "е"),
    new GrammarTask("Вставьте пропущенную букву: 'Гр__б'", "и"),
    new GrammarTask("Вставьте пропущенную букву: 'Я__ода'", "г"),
    new GrammarTask("Исправьте ошибку: 'Мы видили рассвет'", "видели"),
    new GrammarTask("Исправьте ошибку: 'Она ушла в магазен'", "магазин"),
    new GrammarTask("Подставьте слово: 'Мама ____ суп'", "варит"),
    new GrammarTask("Исправьте ошибку: 'Я читат книгу'", "читаю"),
    new GrammarTask("Подставьте слово: 'Собака ____ лает'", "громко"),



    new GrammarTask("Подставьте слово: 'Ребёнок ____ игрушку'", "взял"),
    new GrammarTask("Исправьте ошибку: 'Кошка лежала на ковере'", "ковре"),
    new GrammarTask("Вставьте пропущенную букву: 'С__бака'", "о"),
    new GrammarTask("Вставьте пропущенную букву: 'З__ря'", "о"),
    new GrammarTask("Вставьте пропущенную букву: 'К__рабль'", "о"),
    new GrammarTask("Вставьте пропущенную букву: 'Пр__красный'", "е"),
    new GrammarTask("Вставьте пропущенную букву: 'Д__рога'", "о"),
    new GrammarTask("Вставьте пропущенную букву: 'С__ветить'", "о"),
    new GrammarTask("Вставьте пропущенную букву: 'Ч__рный'", "е"),
    new GrammarTask("Вставьте пропущенную букву: 'Д__ревня'", "е"),
    new GrammarTask("Вставьте пропущенную букву: 'К__варный'", "о"),
    new GrammarTask("Вставьте пропущенную букву: 'В__рить'", "а"),
    new GrammarTask("Исправьте ошибку: 'Мы гуляли по парку и видели деревя'", "деревья"),
    new GrammarTask("Подставьте слово: 'Папа ____ газету'", "читает"),

    new GrammarTask("Подставьте слово: 'Я хочу ____ в зоопарк'", "пойти"),








    new GrammarTask("Исправьте ошибку: 'Он посмотрел на чясы и понял, что пора уходить'", "часы"),


    new GrammarTask("Подставьте слово: 'Девочка ____ книгу'", "читает"),


];

// Пример использования
grammarTasks.forEach((task, index) => {
    console.log(`Задача ${index + 1}: ${task.question}`);
    console.log(`Правильный ответ: ${task.correctAnswer}`);
});
