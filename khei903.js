const grabData = () => {
    url = "https://api.thevirustracker.com/free-api?countryTimeline=NZ"
    const fetchPromise = fetch(url, 
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => displayData(data));
    const displayData = (data) => {
        obj = data.timelineitems[0]
        console.log(obj)
        let daily = "";
        var key = []; 
        for (var k in obj) { 
            key.push(k); 
        } 
        date = key[key.length - 2].split("/")
        daily += "<h2>Date: " + (parseInt(date[1], 10) + 1) + "/" + date[0] + "/" + date[2] + "</h2>"
        daily += "<div id='daily'>"
        //-----------------------------------------------------
        daily += "<div class='dailyItem'>"
        daily += "<p>Active Cases:</p>"
        var active1 = ((obj[key[key.length - 2]].total_cases - obj[key[key.length - 2]].total_recoveries) - obj[key[key.length - 2]].total_deaths)
        var active2 = ((obj[key[key.length - 3]].total_cases - obj[key[key.length - 3]].total_recoveries) - obj[key[key.length - 3]].total_deaths)
        daily += "<p>" + active1 + "</p>"
        if (active1 > active2) {
            daily += "<p class='red'>+" + (active1 - active2) + " Last 24hrs</p>"
        } else if (active1 < active2) {
            daily += "<p class='green'>" + (active1 - active2) + " Last 24hrs</p>"
        } else {
            daily += "<p class='green'>No Change</p>"
        }
        daily += "</div>"
        //-----------------------------------------------------
        daily += "<div class='dailyItem'>"
        daily += "<p>Total Recoveries:</p>"
        daily += "<p>" + obj[key[key.length - 2]].total_recoveries + "</p>"
        var recov1 = obj[key[key.length - 2]].total_recoveries
        var recov2 = obj[key[key.length - 3]].total_recoveries
        if (recov1 > recov2) {
            daily += "<p class='red'>+" + (recov1 - recov2) + " Last 24hrs</p>"
        } else if (recov1 < recov2) {
            daily += "<p class='green'>" + (recov1 - recov2) + " Last 24hrs</p>"
        } else {
            daily += "<p class='green'>No Change</p>"
        }
        daily += "</div>"
        //-----------------------------------------------------
        daily += "<div class='dailyItem'>"
        daily += "<p>Total Cases:</p>"
        daily += "<p>" + obj[key[key.length - 2]].total_cases + "</p>"
        if (obj[key[key.length - 2]].total_cases > obj[key[key.length - 3]].total_cases) {
            daily += "<p class='red'>+" + (obj[key[key.length - 2]].total_cases - obj[key[key.length - 3]].total_cases) + " Last 24hrs</p>"
        } else {
            daily += "<p class='green'>No Change</p>"
        }
        daily += "</div>"
        //-----------------------------------------------------    
        daily += "<div class='dailyItem'>"
        daily += "<p>Total Deaths:</p>"
        daily += "<p>" + obj[key[key.length - 2]].total_deaths + "</p>"
        var death1 = obj[key[key.length - 2]].total_recoveries
        var death2 = obj[key[key.length - 3]].total_recoveries
        if (death1 > death2) {
            daily += "<pclass='red'>+" + (death1 - death2) + " Last 24hrs</p>"
        } else {
            daily += "<p class='green'>No Change</p>"
        }
        
        daily += "</div>"
        //-----------------------------------------------------
        daily += "</div>"
        daily += "<img src='https://upload.wikimedia.org/wikipedia/commons/5/55/Coronavirus_cartoon.svg'>"
        daily += "<p><a href='https://thevirustracker.com/new-zealand-coronavirus-information-nz'>Click here for more information!</a></p>"
        daily += "<p>Information sourced from WHO</p>"
        document.getElementById("HomePage").innerHTML = daily;
    }
}

const grabData2 = () => {
    url = "https://api.thevirustracker.com/free-api?countryTimeline=NZ"
    const fetchPromise = fetch(url, 
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => displayData(data));
    const displayData = (data) => {
        obj = data.timelineitems[0]
        console.log(obj)
        let daily = "";
        var key = []; 
        for (var k in obj) { 
            key.push(k); 
        } 
        daily += "<h2>Cases Per Date</h2>"
        daily += "<div id='data'>"
        daily += "<table class = 'center'>"
        daily += "<tr>"
        daily += "<th>Date</th><th>Daily Cases</th><th>Daily Deaths</th><th>Total Cases</th><th>Total Recoveries</th><th>Total Deaths</th>"
        daily += "</tr>"
        for (i = key.length - 2; i >= 0; i--) {
            daily += "<tr>"
            daily += "<th>" + key[i] + "</th>"
            if (parseInt(obj[key[i]].new_daily_cases) < 0) {
                daily += "<th>0</th>"
            } else {
                daily += "<th>" + obj[key[i]].new_daily_cases + "</th>"
            }
            daily += "<th>" + obj[key[i]].new_daily_deaths + "</th>"
            daily += "<th>" + obj[key[i]].total_cases + "</th>"
            daily += "<th>" + obj[key[i]].total_recoveries + "</th>"
            daily += "<th>" + obj[key[i]].total_deaths + "</th>"
            daily += "</tr>"
        }
        daily += "</table>"
        daily += "</div>"
        
        document.getElementById("DataPage").innerHTML = daily;
    }
}
const grabDaily = () => {
    url = "https://api.thevirustracker.com/free-api?countryTimeline=NZ"
    const fetchPromise = fetch(url, 
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => displayData(data));
    const displayData = (data) => {
        let largest = 0;
        const mth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "October", "Nov", "Dec"]
        obj = data.timelineitems[0]
        console.log(obj)
        let display = "";
        var key = []; 
        for (var k in obj) { 
            key.push(k); 
        } 
        var array = [];
        for (i = 0; i < key.length - 1; i++) {
            if (parseInt(obj[key[i]].new_daily_cases) < 0) {
                array.push(0);
            } else {
                array.push(parseInt(obj[key[i]].new_daily_cases));
            }
            if (parseInt(obj[key[i]].new_daily_cases) > largest) {
                largest = parseInt(obj[key[i]].new_daily_cases)
            }
        }
        var yspacing;
        var yinc2;
        var xinc = (1000 / key.length);
        var yinc;
        var amount;
        var step;
        if (largest > 100000) {
            largest = (Math.round(largest/100000)) * 100000 //200
            small = (Math.round(largest/100000)) * 10 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 50000
        } else if (largest > 10000) {
            largest = (Math.round(largest/10000)) * 10000 //200
            small = (Math.round(largest/10000)) * 1000 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 1000
            step = 5000
        } else if (largest > 1000) {
            largest = (Math.round(largest/1000)) * 1000 //200
            small = (Math.round(largest/1000)) * 100 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 500
        } else if (largest > 100) {
            largest = (Math.round(largest/100)) * 100 //200
            small = (Math.round(largest/100)) * 10 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 50
        } else if (largest > 10) {
            largest = (Math.round(largest/10)) * 10 //200
            small = (Math.round(largest/10)) * 1 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 5
        }
        display += "<h2>Daily Cases per Day</h2>"
        display += "<div id='data'>"
        display += "<svg viewBox='0 0 1100 600' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>"
        display += "<line x1='100' y1='5' x2='100' y2='506' stroke='#D3D3D3' stroke-width='2'/>"
        display += "<line x1='100' y1='506' x2='1100' y2='506' stroke='#D3D3D3' stroke-width='2'/>"
        var prevdate;
        var count = 0;
        console.log(yinc2)
        for (i = 0; i < key.length - 1; i++) {
            display += "<rect x='" + (100 + xinc * i) + "' y='" + (506 - (yinc*array[i])) + "' width='4' height='" + (yinc*array[i]) + "' fill='#C90000'/>"
            var date = key[i].split("/");
            if (prevdate == null){
                prevdate = date
                display += "<line x1='" + (100 + xinc * i) + "' y1='506' x2='" + (100 + xinc * i) + "' y2='511' stroke='#D3D3D3' stroke-width='2'/>"
                display += "<text x='" + ((100 + xinc * i) - 20) + "' y='524' fill='#D3D3D3'>" + (mth[parseInt(date[0])-1]+ "-" + date[1]) +"</text>"   
            } else if (date[1] == prevdate[1]) {
                display += "<line x1='" + (100 + xinc * i) + "' y1='506' x2='" + (100 + xinc * i) + "' y2='511' stroke='#D3D3D3' stroke-width='2'/>"
                display += "<text x='" + ((100 + xinc * i) - 20) + "' y='524' fill='#D3D3D3'>" + (mth[parseInt(date[0])-1]+ "-" + date[1]) +"</text>"   
            }
        }
        for (i = 0; i < amount; i++) {
            if ((count * yspacing % step) == 0) {
                display += "<line x1='85' y1='" + (506 - (count * yinc2)) + "' x2='100' y2='" + (506 - (count * yinc2)) + "' stroke='#D3D3D3' stroke-width='2'/>"
                display += "<text x='" + 85 + "' y='" + (506 - (count * yinc2) + 5) + "' fill='#D3D3D3' text-anchor='end'>" + count * yspacing +"</text>"  
            }
            count += 1
        }
        display += "<text x='" + 550 + "' y='" + 550 + "' fill='#808080' text-anchor='middle'>Date</text>" 
        display += "<text x='" + 550 + "' y='" + 580 + "' fill='#808080' text-anchor='middle'>Cases</text>"
        display += "<circle cx='523' cy='575' r='5' fill='#C90000'/>"
        display += "<text x='" + 20 + "' y='" + 250 + "' fill='#808080' text-anchor='center' transform='rotate(-90 20 250)'>Infected Cases</text>"
        display += "</svg>"
        display += "</div>"
        
        document.getElementById("DailyPage").innerHTML = display;
    }
}
const grabTotal = () => {
    url = "https://api.thevirustracker.com/free-api?countryTimeline=NZ"
    const fetchPromise = fetch(url, 
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => displayData(data));
    const displayData = (data) => {
        let largest = 0;
        const mth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "October", "Nov", "Dec"]
        obj = data.timelineitems[0]
        console.log(obj)
        let display = "";
        var key = []; 
        for (var k in obj) { 
            key.push(k); 
        } 
        var arraytotal = [];
        var arrayrecov = [];
        var arraydeath = [];
        for (i = 0; i < key.length - 1; i++) {
            if (parseInt(obj[key[i]].total_cases) < 0) {
                arraytotal.push(0);
            } else {
                arraytotal.push(parseInt(obj[key[i]].total_cases));
            }
            if (parseInt(obj[key[i]].total_recoveries) < 0) {
                arrayrecov.push(0);
            } else {
                arrayrecov.push(parseInt(obj[key[i]].total_recoveries));
            }
            if (parseInt(obj[key[i]].total_deaths) < 0) {
                arraydeath.push(0);
            } else {
                arraydeath.push(parseInt(obj[key[i]].total_deaths));
            }
            if (parseInt(obj[key[i]].total_cases) > largest) {
                largest = parseInt(obj[key[i]].total_cases)
            }
        }
        console.log(arrayrecov)
        var yspacing;
        var yinc2;
        var xinc = (1000 / key.length);
        var yinc;
        var amount;
        var step;
        if (largest > 100000) {
            largest = (Math.round(largest/100000)) * 100000 //200
            small = (Math.round(largest/100000)) * 10 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 50000
        } else if (largest > 10000) {
            largest = (Math.round(largest/10000)) * 10000 //200
            small = (Math.round(largest/10000)) * 1000 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 1000
            step = 5000
        } else if (largest > 1000) {
            largest = (Math.round(largest/1000)) * 1000 //200
            small = (Math.round(largest/1000)) * 100 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 500
        } else if (largest > 100) {
            largest = (Math.round(largest/100)) * 100 //200
            small = (Math.round(largest/100)) * 10 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 50
        } else if (largest > 10) {
            largest = (Math.round(largest/10)) * 10 //200
            small = (Math.round(largest/10)) * 1 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 5
        }
        display += "<h2>New Zealand coronavirus outbreak</h2>"
        display += "<div id='data'>"
        display += "<svg viewBox='0 0 1100 600' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>"
        display += "<line x1='100' y1='5' x2='100' y2='506' stroke='#D3D3D3' stroke-width='2'/>"
        display += "<line x1='100' y1='506' x2='1100' y2='506' stroke='#D3D3D3' stroke-width='2'/>"
        var prevdate;
        var count = 0;
        console.log(yinc2)
        for (i = 0; i < key.length - 1; i++) {
            display += "<rect x='" + (100 + xinc * i) + "' y='" + (506 - (yinc*arraytotal[i])) + "' width='4' height='" + (yinc*arraytotal[i]) + "' fill='#6495ed'/>"
            display += "<rect x='" + (100 + xinc * i) + "' y='" + (506 - (yinc*arrayrecov[i])) + "' width='2' height='" + (yinc*arrayrecov[i]) + "' fill='green'/>"
            display += "<rect x='" + (100 + xinc * i) + "' y='" + (506 - (yinc*arraydeath[i])) + "' width='2' height='" + (yinc*arraydeath[i]) + "' fill='red'/>"
            var date = key[i].split("/");
            
            if (prevdate == null){
                prevdate = date
                display += "<line x1='" + (100 + xinc * i) + "' y1='506' x2='" + (100 + xinc * i) + "' y2='511' stroke='#D3D3D3' stroke-width='2'/>"
                display += "<text x='" + ((100 + xinc * i) - 20) + "' y='524' fill='#D3D3D3'>" + (mth[parseInt(date[0])-1]+ "-" + date[1]) +"</text>"   
            } else if (date[1] == prevdate[1]) {
                display += "<line x1='" + (100 + xinc * i) + "' y1='506' x2='" + (100 + xinc * i) + "' y2='511' stroke='#D3D3D3' stroke-width='2'/>"
                display += "<text x='" + ((100 + xinc * i) - 20) + "' y='524' fill='#D3D3D3'>" + (mth[parseInt(date[0])-1]+ "-" + date[1]) +"</text>"   
            }
        }
        for (i = 0; i < amount; i++) {
            if ((count * yspacing % step) == 0) {
                display += "<line x1='85' y1='" + (506 - (count * yinc2)) + "' x2='100' y2='" + (506 - (count * yinc2)) + "' stroke='#D3D3D3' stroke-width='2'/>"
                display += "<text x='" + 85 + "' y='" + (506 - (count * yinc2) + 5) + "' fill='#D3D3D3' text-anchor='end'>" + count * yspacing +"</text>"  
            }
            count += 1
        }
        display += "<text x='" + 550 + "' y='" + 550 + "' fill='#808080' text-anchor='middle'>Date</text>" 
        display += "<text x='" + 550 + "' y='" + 580 + "' fill='#808080' text-anchor='middle'>Total Recoveries</text>"
        display += "<circle cx='486' cy='575' r='5' fill='green'/>" 
        display += "<text x='" + 430 + "' y='" + 580 + "' fill='#808080' text-anchor='middle'>Total Cases</text>"
        display += "<circle cx='385' cy='575' r='5' fill='#6495ed'/>" 
        display += "<text x='" + 670 + "' y='" + 580 + "' fill='#808080' text-anchor='middle'>Total Deaths</text>"
        display += "<circle cx='620' cy='575' r='5' fill='red'/>" 
        display += "<text x='" + 20 + "' y='" + 250 + "' fill='#808080' text-anchor='center' transform='rotate(-90 20 250)'>Daily Cases</text>"
        display += "</svg>"
        display += "</div>"
        
        document.getElementById("TotalPage").innerHTML = display;
    }
}
const grabActive = () => {
    url = "https://api.thevirustracker.com/free-api?countryTimeline=NZ"
    const fetchPromise = fetch(url, 
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((data) => displayData(data));
    const displayData = (data) => {
        let largest = 0;
        const mth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "October", "Nov", "Dec"]
        obj = data.timelineitems[0]
        console.log(obj)
        let display = "";
        var key = []; 
        for (var k in obj) { 
            key.push(k); 
        } 
        var array = [];
        for (i = 0; i < key.length - 1; i++) {
            active = ((obj[key[i]].total_cases - obj[key[i]].total_recoveries) - obj[key[i]].total_deaths)
            if (parseInt(active) < 0) {
                array.push(0);
            } else {
                array.push(parseInt(active));
            }
            if (parseInt(active) > largest) {
                largest = parseInt(active)
            }
        }
        console.log(array)
        var yspacing;
        var yinc2;
        var xinc = (1000 / key.length);
        var yinc;
        var amount;
        var step;
        if (largest > 100000) {
            largest = (Math.round(largest/100000)) * 100000 //200
            small = (Math.round(largest/100000)) * 10 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 50000
        } else if (largest > 10000) {
            largest = (Math.round(largest/10000)) * 10000 //200
            small = (Math.round(largest/10000)) * 1000 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 1000
            step = 5000
        } else if (largest > 1000) {
            largest = (Math.round(largest/1000)) * 1000 //200
            small = (Math.round(largest/1000)) * 100 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 500
        } else if (largest > 100) {
            largest = (Math.round(largest/100)) * 100 //200
            small = (Math.round(largest/100)) * 10 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 50
        } else if (largest > 10) {
            largest = (Math.round(largest/10)) * 10 //200
            small = (Math.round(largest/10)) * 1 //20
            yinc = 500 / (largest) //2.5
            amount = (small) + 1 //21
            yspacing = largest/small //10
            yinc2 = (500 / largest) * 10
            step = 5
        }
        display += "<h2>Active Total Cases per Day</h2>"
        display += "<div id='data'>"
        display += "<svg viewBox='0 0 1100 600' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>"
        display += "<line x1='100' y1='5' x2='100' y2='506' stroke='#D3D3D3' stroke-width='2'/>"
        display += "<line x1='100' y1='506' x2='1100' y2='506' stroke='#D3D3D3' stroke-width='2'/>"
        var prevdate;
        var count = 0;
        console.log(yinc2)
        for (i = 0; i < key.length - 1; i++) {
            display += "<rect x='" + (100 + xinc * i) + "' y='" + (506 - (yinc*array[i])) + "' width='4' height='" + (yinc*array[i]) + "' fill='#FFCA33'/>"
            var date = key[i].split("/");
            if (prevdate == null){
                prevdate = date
                display += "<line x1='" + (100 + xinc * i) + "' y1='506' x2='" + (100 + xinc * i) + "' y2='511' stroke='#D3D3D3' stroke-width='2'/>"
                display += "<text x='" + ((100 + xinc * i) - 20) + "' y='524' fill='#D3D3D3'>" + (mth[parseInt(date[0])-1]+ "-" + date[1]) +"</text>"   
            } else if (date[1] == prevdate[1]) {
                display += "<line x1='" + (100 + xinc * i) + "' y1='506' x2='" + (100 + xinc * i) + "' y2='511' stroke='#D3D3D3' stroke-width='2'/>"
                display += "<text x='" + ((100 + xinc * i) - 20) + "' y='524' fill='#D3D3D3'>" + (mth[parseInt(date[0])-1]+ "-" + date[1]) +"</text>"   
            }
        }
        for (i = 0; i < amount; i++) {
            if ((count * yspacing % step) == 0) {
                display += "<line x1='85' y1='" + (506 - (count * yinc2)) + "' x2='100' y2='" + (506 - (count * yinc2)) + "' stroke='#D3D3D3' stroke-width='2'/>"
                display += "<text x='" + 85 + "' y='" + (506 - (count * yinc2) + 5) + "' fill='#D3D3D3' text-anchor='end'>" + count * yspacing +"</text>"  
            }
            count += 1
        }
        display += "<text x='" + 550 + "' y='" + 550 + "' fill='#808080' text-anchor='middle'>Date</text>" 
        display += "<text x='" + 550 + "' y='" + 580 + "' fill='#808080' text-anchor='middle'>Active Cases</text>"
        display += "<circle cx='500' cy='575' r='5' fill='#FFCA33'/>" 
        display += "<text x='" + 20 + "' y='" + 250 + "' fill='#808080' text-anchor='center' transform='rotate(-90 20 250)'>Active Cases</text>"
        
        display += "</svg>"
        display += "</div>"
        
        document.getElementById("ActivePage").innerHTML = display;
    }
}
const clicked = (id) => {
    var nav = ["Home", "Total", "Daily", "Active", "Data"]
    nav.forEach(function(x) {
        var tag = x + "Page"
        document.getElementById(tag).style.display = "none";
        document.getElementById(x).style.borderBottom = "0px solid #000";
    });
    document.getElementById( id + "Page").style.display = "block";
    document.getElementById(id).style.borderBottom = "4px solid #000";
}
window.onload = grabData();
window.onload = () => clicked("Home");