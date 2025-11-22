while (true) {
    number = Number(prompt("Введите число от 1 до 5:"));
    
    if (number >= 1 && number <= 5) {
        console.log("✅ Спасибо! Вы ввели: " + number);
        break;
    } else {
        console.log("❌ Ошибка! Число должно быть от 1 до 5. Попробуйте ещё раз.");
    }
}