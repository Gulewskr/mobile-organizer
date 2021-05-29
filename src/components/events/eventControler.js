import React from 'react'
import {nameOfMonths, nameOfDays, numberOfDays} from '../../data/calendar';

//Funkcje pomocnicze ---------------------------------

const getMonthForMonthyEvent = (day) => {
    if(day >= currentDay()){ 
        return currentMonth();
    }else{
        return currentMonth() + 1 > 11 ? 0 : currentMonth() + 1;
    }
}

const getYearForYearlyEvent = (month, day) => {
    if(month > currentMonth()){ 
        return currentYear();
    }else if(month == currentMonth()){
        if(day >= currentDay()){
            return currentYear();
        }else{
            return currentYear() + 1;
        }
    }else{
        return currentYear() + 1;
    }
}

const currentYear = () => new Date().getFullYear()
const currentMonth = () => new Date().getMonth()
const currentDay = () => new Date().getDate()

const checkDayThisMonth = (day) => {
    return (day >= currentDay());
}

const checkDataFuture = (day = currentDay(), month = currentMonth(), year = currentYear()) => {
    if(year > currentYear())
    {
        return true;
    }else if(year == currentYear()){
        if(month > currentMonth())
        {
            return true;
        }else if(month = currentMonth()){
            if(day >= currentDay())
            {
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
}

const checkThisWeek = (day = currentDay(), month = currentMonth(), year = currentYear()) => {
    if(currentMonth() != 11)
    {
        if(year != currentYear()) return false;
        if(month != currentMonth() && month != currentMonth() + 1) return false;
        if(numberOfDays[currentMonth()] - currentDay() >= 6){
            if(month != currentMonth()) return false;
            if(day < currentDay()) return false;
            if(day - currentDay() > 6) return false;
            return true;
        }else{
            if(month == currentMonth()){
                if(day < currentDay()) return false;
                return true;
            }else{
                if(day < (6 - (numberOfDays[currentMonth()] - currentDay()))) return true;
                return false;
            }
        }
    }else{
        if(currentDay() > 25){
            if(year != currentYear()){
                if(year != currentYear()+1) return false;
                if(month != 0) return false;
                if(day <  (currentDay() - 25)) return false;
                return true;
            }else{
                if(month != 11) return false;
                if(day < currentDay()) return false;
                return true;
            }
        }else{
            if(year != currentYear()) return false;
            if(month != 11) return false;
            if(day < currentDay()) return false;
            return true;
        }
    }
}

//Funkcje exportowane ---------------------------------

const nextWeekFuture = (events) => {
    var nextWeek = [];
    var future = [];
    console.log(events);
    if(Array.isArray(events)){
        events.map((data, ind) => {
            switch(data.type){
                case 0:
                    if(checkDataFuture(data._day, data._month, data._year)){
                        if(checkThisWeek(data._day, data._month, data._year)){
                            nextWeek.push(data);
                        }else{
                            future.push(data);
                        }
                    } 
                    break;
                case 1: break;
                case 2: 
                    var day = data._day;
                    var month = getMonthForMonthyEvent(day);
                    var year = getYearForYearlyEvent(month, day);
                    if(checkThisWeekdat(day, month, year)){
                        nextWeek.push(data);
                    }else{
                        future.push(data);
                    } break;
                case 3:
                    var day = data._day;
                    var month = data._month;
                    var year = getYearForYearlyEvent(month, day);
                    if(checkThisWeekdat(day, month, year)){
                        nextWeek.push(data);
                    }else{
                        future.push(data);
                    } break;
            }
            
        })
    }
    return [nextWeek, future];
}

const getWeeklyEvents = (events) => {
    var weekly = [];
    if(Array.isArray(events)){
        events.map((data, ind) => {
            if(data.type == 1) weekly.push(data);
        })
    }
    return weekly;
}

//export funkcji bazy danych
export const eventControl = {
    nextWeekFuture,
    getWeeklyEvents
}