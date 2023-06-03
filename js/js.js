// prayFetch
// function PraytimeByCity() {
//     axios.get("http://api.aladhan.com/v1/calendarByCity?city=Riyadh&country=sa")
//     .then((respons) => {
//         console.log(respons.data.data)
//         console.log(respons.data.data[0].date.readable)
//         console.log(respons.data.data[0].date.hijri.date)
//     }).catch(() => {
//         console.log("No data")
//     })
// }
// PraytimeByCity()






location.onload = getData("riyadh")



let select = document.querySelector("#select")
let main_image = document.querySelector(".main_image")
let firstContainer = document.querySelector(".firstContainer")
let txt = document.querySelector(".txt")
let toDay = new Date().getDate() - 1;
let detail = document.querySelector(".detail")

let fajar = document.querySelector("#fajar")
let dhuhor = document.querySelector("#dhuhor")
let asr = document.querySelector("#asr")
let maghrib = document.querySelector("#maghrib")
let isha = document.querySelector("#isha")

// var nxt = document.querySelector(".ISH")



select.onchange = function () {
    let city = select.value
    let img = 'url(../Media/' + `${city}.png)`
    console.log(img)
    main_image.style.backgroundImage = img
    console.log()
    getData(city)
}

function getData(c) {
    axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${c}&country=sa`)
    .then((respons) => {
        setPrayTime(respons)     
        // console.log(respons.data.data[25].timings)
    }).catch(() => {
        console.log("No data")
        location.reload()
    })
}


function setPrayTime (respons) {    
    let date = respons.data.data[toDay]
    // console.log(date)
    let dayName = date.date.hijri.weekday.ar
    let Ar_date = date.date.hijri.day
    let Ar_month =  date.date.hijri.month.ar
    let Ar_year = date.date.hijri.year
    detail.innerHTML = "يوم " + dayName + " " + Ar_date + " " + Ar_month + " " + Ar_year + "هـ" 
    let newDate = new Date().getHours()



    // الفجر
    let FajrH = +date.timings.Fajr.slice(0, 2)
    let FajrM = +date.timings.Fajr.slice(3, 5)    
    let a0 = 0
    FajrM < 10
        ? a0 = "0"
        : a0 = ""   
    fajar.innerHTML = "0" + FajrH + ":" + a0 + FajrM + " ص"
    if (newDate > FajrH && newDate <  date.timings.Dhuhr.slice(0, 2)) {
    console.log("next time is Dhuhr ")
    // setNxttime_D(date)
    }
    

    
    // الظهر
    let Dhuhr_H = +date.timings.Dhuhr.slice(0, 2)
    let Dhuhr_M = +date.timings.Dhuhr.slice(3, 5)     
    let Zero_H = "0"
    Dhuhr_H < 10
        ? Zero_H = "0"
        : Zero_H = ""    
    let Zero_M = "0"
    Dhuhr_M < 10
        ? Zero_M = 0
        : Zero_M = ""    
    if (Dhuhr_H > 11) {
        dhuhor.innerHTML = Zero_H + Dhuhr_H +  ":" +  Zero_M + Dhuhr_M  + " م"
        Dhuhr_H = Dhuhr_H - 12
    } else {
        dhuhor.innerHTML = Zero_H + Dhuhr_H +  ":" +  Zero_M + Dhuhr_M  + " م"
    }
    if (newDate > Dhuhr_H && newDate <  date.timings.Asr.slice(0, 2)) {
    console.log("next time is Asr")
    // setNxttime_A(date)
    }

    // العصر
    let AsrH = date.timings.Asr.slice(0, 2)
    let AsrS = date.timings.Asr.slice(3, 5)
    if (AsrH > 12) {
        AsrH = AsrH -12
    }
    asr.innerHTML = "0" + AsrH + ":" + AsrS + " م"
    if (newDate > date.timings.Asr.slice(0, 2) && newDate <  date.timings.Maghrib.slice(0, 2)) {
    console.log("yes")
    // setNxttime_M(date)
    } else {
        // console.log("NOOO")
    }

    // المغرب
    let Maghrib_H = date.timings.Maghrib.slice(0, 2)
    let Maghrib_S = date.timings.Maghrib.slice(3, 5)
    if (Maghrib_H > 12) {
        Maghrib_H = Maghrib_H -12
    }
    maghrib.innerHTML = "0" + Maghrib_H + ":" + Maghrib_S + " م"
    if (newDate > date.timings.Maghrib.slice(0, 2) && newDate <  date.timings.Isha.slice(0, 2)) {
    console.log("yes")
    // setNxttime_I(date)
    }

    // العشاء 
    let Isha_H = date.timings.Isha.slice(0,2)
    let Isha_S = date.timings.Isha.slice(3, 5)
    if (Isha_H > 12) {
    Isha_H = Isha_H -12
    }
    isha.innerHTML = "0" + Isha_H + ":" + Isha_S + " م"  
    // console.log(date)
    if (newDate > date.timings.Isha.slice(0, 2)) {
        // setNxttime_I(date)
        
    } else {
        console.log("____")
    }
}





















function setNxttime_F(date) {

    var year_ = +date.date.gregorian.year
    var month_ = date.date.gregorian.month.number - 1
    var day_ = +date.date.gregorian.day
    var hours_ = +date.timings.Fajr.slice(0, 2)
    var secends_ = +date.timings.Fajr.slice(3, 5)


    var setTime = setInterval(() => {

        // The data/time we want to countdown to
        var countDownDate = new Date(year_,month_,day_,hours_,secends_).getTime()
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
    
    
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        var nxt = document.querySelector(".FJ")
        nxt.innerHTML = `متبقي: 0${hours}:${minutes}:${seconds}`

        if (timeleft < 1) {
            clearInterval(setTime);
            nxt.innerHTML = ""
        }

    }, 1000)




}
function setNxttime_D(date) {

    var year_ = +date.date.gregorian.year
    var month_ = date.date.gregorian.month.number - 1
    var day_ = +date.date.gregorian.day
    var hours_ = +date.timings.Dhuhr.slice(0, 2)
    var secends_ = +date.timings.Dhuhr.slice(3, 5)


    var setTime = setInterval(() => {

        // The data/time we want to countdown to
        var countDownDate = new Date(year_,month_,day_,hours_,secends_).getTime()
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
    
    
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        var nxt = document.querySelector(".DH")
        nxt.innerHTML = `متبقي: 0${hours}:${minutes}:${seconds}`

        if (timeleft < 1) {
            clearInterval(setTime);
            nxt.innerHTML = ""
        }

    }, 1000)




}
function setNxttime_A(date) {

    var year_ = +date.date.gregorian.year
    var month_ = date.date.gregorian.month.number - 1
    var day_ = +date.date.gregorian.day
    var hours_ = +date.timings.Asr.slice(0, 2)
    var secends_ = +date.timings.Asr.slice(3, 5)


    var setTime = setInterval(() => {

        // The data/time we want to countdown to
        var countDownDate = new Date(year_,month_,day_,hours_,secends_).getTime()
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
    
    
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        var nxt = document.querySelector(".AS")
        nxt.innerHTML = `متبقي: 0${hours}:${minutes}:${seconds}`

        if (timeleft < 1) {
            clearInterval(setTime);
            nxt.innerHTML = ""
        }

    }, 1000)




}
function setNxttime_M(date) {

    var year_ = +date.date.gregorian.year
    var month_ = date.date.gregorian.month.number - 1
    var day_ = +date.date.gregorian.day
    var hours_ = +date.timings.Maghrib.slice(0, 2)
    var secends_ = +date.timings.Maghrib.slice(3, 5)


    var setTime = setInterval(() => {

        // The data/time we want to countdown to
        var countDownDate = new Date(year_,month_,day_,hours_,secends_).getTime()
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
    
    
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        var nxt = document.querySelector(".MG")
        nxt.innerHTML = `متبقي: 0${hours}:${minutes}:${seconds}`

        if (timeleft < 1) {
            clearInterval(setTime);
            nxt.innerHTML = ""
        }

    }, 1000)




}




function setNxttime_I(date) {  
    
    var year_ = date.date.gregorian.year
    var month_ = date.date.gregorian.month.number - 1
    var day_ = date.date.gregorian.day
    var hours_ = date.timings.Isha.slice(0, 2)
    var minutes_ = date.timings.Isha.slice(3, 5)
    
    var setTime = setInterval(() => {     
        
        var countDownDate = new Date(year_, month_, day_, hours_ , minutes_).getTime()
        var now = new Date().getTime();
        var timeleft = now - countDownDate;    
    
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);


        minutes < 10
            ? minutes = "0" + minutes
            : minutes;
        seconds < 10
            ? seconds = "0" + seconds
            : seconds

        nxt.innerHTML = `مضى: 0${hours}:${minutes}:${seconds}`

        if (hours > 5) {
            clearInterval(setTime)
            nxt.innerHTML = ""
        }

    }, 1000)
}









var btn = document.querySelector(".btna")
btn.onclick = function () {
    var popupContainer =  document.querySelector(".popupContainer")
    popupContainer.style.height = "0%"

    
}