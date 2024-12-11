const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const timezoneElement = document.querySelector('.timezone');

function updateClock() {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();
    let currentSeconds = currentDate.getSeconds();

    hoursElement.innerHTML = currentHour.toString().padStart(2, '0')
    minutesElement.innerHTML = currentMinutes.toString().padStart(2, '0')
    secondsElement.innerHTML = currentSeconds.toString().padStart(2, '0')

    timezoneElement.innerHTML = updateTimezone(currentHour);
}

function updateTimezone(hours) {
    let timezone = 'AM';
    if (hours > 12) timezone = 'PM';
    return timezone
}

setInterval(updateClock, 1000)