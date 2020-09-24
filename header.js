function setDate() {
    var today = new Date();

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];

    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let dateOrdinal = "th";
    if (today.getDate() % 10 === 1) dateOrdinal = "st";
    if (today.getDate() % 10 === 2) dateOrdinal = "nd";
    if (today.getDate() % 10 === 3) dateOrdinal = "rd";

    var dateTime = `${
        dayNames[today.getDay()]
    } - ${today.getDate()}${dateOrdinal} ${
        monthNames[today.getMonth()]
    } ${today.getFullYear()}`;

    document.getElementById("dateContainer").innerHTML = dateTime;
}

function setLogo() {
    const logo =
        "\
 _____            _\n\
|_   _|__      __| | ___\n\
  | |/ _ \\ __ / _` |/ _ \\ \n\
  | | (_) |__| (_| | (_) |\n\
  |_|\\___/    \\__,_|\\___/";

    document.getElementById("logo").innerHTML = logo
        .replace(/\n/g, "<br/>")
        .replace(/ /g, "&nbsp;");
}
