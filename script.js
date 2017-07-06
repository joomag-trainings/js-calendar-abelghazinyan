/**
 * Created by abelghazinyan on 7/6/17.
 */

var years = document.getElementById('years')
var months = document.getElementById('months');
var monthsArray = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
var daysOfWheek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

var year;
var month;
var century;
var day;

var table;

for(i=1900;i<=2017;i++){
    var option = document.createElement('option');
    option.text = i;
    years.add(option);
}

monthsArray.forEach(function (element) {
    var option = document.createElement('option');
    option.text = element;
    months.add(option);
});

years.addEventListener('change',function () {
    year = years.value%100;
    century = parseInt(years.value/100);
    console.log(year+" "+century+" "+month);
    table.parentNode.removeChild(table);
    createTable();
})

months.addEventListener('change',function () {
    month = monthsArray.indexOf(months.value)+1;
    console.log(year+" "+century+" "+month);
    table.parentNode.removeChild(table);
    createTable();
})

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

function createTable(){
    table = document.createElement('table');
    var n,k=0;
    document.body.appendChild(table);
    var tr = table.insertRow(0);
    var dayOfWeek;
    daysOfWheek.forEach(function (element,index) {
        var cell = tr.insertCell(index);
        cell.textContent = element;
        cell.setAttribute('id','daysOfWeek');
    })
    day=1;
    for(i=0;i<6;i++) {
        var tr = table.insertRow(i + 1);
        for (j = 0; j < 7; j++) {

            var cell = tr.insertCell(j);
            n = Math.floor((13 * month - 1) / 5 + year / 4 + century / 4 + day + year - 2 * century);

            dayOfWeek = ((n%7)+7)%7;

            console.log(n);
            console.log(dayOfWeek);
            if ((dayOfWeek === j+1 || dayOfWeek===0) && k===0) {
                cell.textContent = day;
                if (((parseInt(years.value) % 4 === 0 && 0 !== parseInt(years.value) % 100)||0 === parseInt(years.value) % 400)
                    && month === 2) {
                    if (day < 29) {
                        day++;
                    }else{
                        k++;

                    }
                } else {
                    if (day < monthDays[month - 1]) {
                        day++;
                    }else {
                        k++;

                    }
                }
            } else {
                cell.textContent = "";
                cell.setAttribute('id','empty')
            }
        }


    }
}
year = years.value%100;
century = years.value/100;
month = monthsArray.indexOf(months.value)+1;
createTable();

