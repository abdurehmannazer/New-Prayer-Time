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
let firstContainer = document.querySelector(".firstContainer")
let txt = document.querySelector(".txt")
let toDay = new Date().getDate() - 1;
let detail = document.querySelector(".detail")

let fajar = document.querySelector("#fajar")
let dhuhor = document.querySelector("#dhuhor")
let asr = document.querySelector("#asr")
let maghrib = document.querySelector("#maghrib")
let isha = document.querySelector("#isha")


select.onchange = function () {
    let city = select.value
    firstContainer.style.backgroundImage = `url(/Media/` + city + ".png)";
    // firstContainer.style.backgroundImage = `url(/Media/${city}.png)`;
    firstContainer.style.backgroundPosition = "center";
    firstContainer.style.backgroundSize = "cover";
    firstContainer.style.backgroundRepeat = "no-repeat";

    getData(city)
}

function getData(c) {
    axios.get("https://api.aladhan.com/v1/calendarByCity?city=" + c + "&country=sa")
    // axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${city}&country=sa`)
    .then((respons) => {
    setPrayTim(respons)     
    console.log("done")    
    }).catch(() => {
        console.log("No data")
        // location.reload()
    })
}

function setPrayTim (respons) {    
    let date = respons.data.data[toDay]
    let dayName = date.date.hijri.weekday.ar
    let Ar_date = date.date.hijri.day
    let Ar_month =  date.date.hijri.month.ar
    let Ar_year = date.date.hijri.year
    detail.innerHTML = "يوم " + dayName + " " + Ar_date + " " + Ar_month + " " + Ar_year + "هـ" 

    // الفجر
    let FajrH = +date.timings.Fajr.slice(0, 2)
    let FajrS = +date.timings.Fajr.slice(3, 5)      
    FajrH < 10
        ? FajrH =  "0" + FajrH +":" + FajrS 
        : FajrH =  FajrH +":" + FajrS
    fajar.innerHTML = FajrH + " ص"

    // الظهر
    let Dhuhr_H = +date.timings.Dhuhr.slice(0, 2)
    let Dhuhr_S = +date.timings.Dhuhr.slice(3, 5) 
    
    let Zero_H = "0"
    Dhuhr_H < 10
        ? Zero_H = "0"
        : Zero_H = ""
    let Zero_S = "0"
    Dhuhr_S < 10
        ? Zero_S = 0
        : Zero_S = ""
    if (Dhuhr_H > 11) {
        dhuhor.innerHTML = Zero_H + Dhuhr_H +  ":" +  Zero_S + Dhuhr_S  + " م"
        Dhuhr_H = Dhuhr_H - 12
    } else {
        dhuhor.innerHTML = Zero_H + Dhuhr_H +  ":" +  Zero_S + Dhuhr_S  + " م"
    }

    // العصر
    let AsrH = date.timings.Asr.slice(0, 2)
    let AsrS = date.timings.Asr.slice(3, 5)
    if (AsrH > 12) {
        AsrH = AsrH -12
    }
    asr.innerHTML = "0" + AsrH + ":" + AsrS + " م"

    // المغرب
    let Maghrib_H = date.timings.Maghrib.slice(0, 2)
    let Maghrib_S = date.timings.Maghrib.slice(3, 5)
    if (Maghrib_H > 12) {
        Maghrib_H = Maghrib_H -12
    }
    maghrib.innerHTML = "0" + Maghrib_H + ":" + Maghrib_S + " م"

    // العشاء 
    let Isha_H = date.timings.Isha.slice(0,2)
    let Isha_S = date.timings.Isha.slice(3, 5)
    if (Isha_H > 12) {
    Isha_H = Isha_H -12
    }
    isha.innerHTML = "0" + Isha_H + ":" + Isha_S + " م"     

}