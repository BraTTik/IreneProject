export function translateCategory(category){
    category = category.toLowerCase()
    let translated;

    switch(category){
        case 'news':
            translated = 'Новости';
            break;
        case 'tech':
            translated = 'Технологии';
            break;
        case 'interview':
            translated = 'Интервью';
            break;
        case 'telescope':
            translated = 'Телескоп';
            break;
        case 'hypothesis':
            translated = 'Гипотезы';
            break;
        case 'новости':
            translated = 'news';
            break;
        case 'технологии':
            translated = 'tech';
            break;
        case 'интервью':
            translated = 'interview';
            break;
        case 'телескоп':
            translated = 'telescope';
            break;
        case 'гипотезы':
            translated = 'hypothesis';
            break;
    }

    return translated;
}

export function getFormatedDate(string){
    const date = new Date(string);
    let month;
    switch(date.getMonth()){
        case 0:
            month = 'Января';
            break;
        case 1:
            month = 'Февраля';
            break;
        case 2:
            month = 'Марта';
            break;
        case 3:
            month = 'Апреля';
            break;
        case 4:
            month = 'Мая';
            break;
        case 5:
            month = 'Июня';
            break;
        case 6:
            month = 'Июля';
            break;
        case 7:
            month = 'Августа';
            break;
        case 8:
            month = 'Сентября';
            break;
        case 9:
            month = 'Октября';
            break;
        case 10:
            month = 'Ноября';
            break;
        case 11:
            month = 'Декабря';
            break;
    }
            
    let year = date.getFullYear();
    let day = date.getDate();

    if(day <= 9){
        day =`0${day}`;
    }
    return `${day} ${month} ${year}`;
}
