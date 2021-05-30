const nameOfMonths = ["Styczeń", "Luty", "Marzec", "Kwiecień", 
"Maj", "Czerwiec", "Lipiec", "Śierpień", "Wrzesień", "Październik", 
"Listopad", "Grudzień"];
 
const nameOfDays = ["Pon","Wto","Śro","Czw","Pią","Sob","Nie"];
const fullNamesOfDays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const dataString = (day, month, year) => {
    var data = String(day) + " " + nameOfMonths[month - 1] + " " + String(year);
    return data;
}

export {nameOfMonths, nameOfDays, fullNamesOfDays, numberOfDays, dataString}