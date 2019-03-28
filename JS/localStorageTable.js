var started = false,
    index = 0,
    row = new Array();

document.getElementById('submit').addEventListener('click', main);
document.getElementById('clear').addEventListener('click', clear);

function retrieveData(){
    if (localStorage.getItem('rowArray')){
        index = localStorage.getItem('rowArray');
    }
    for(var i = 0; i <= (index - 1); i++){
        row[i] = JSON.parse(localStorage.getItem('savedTable'))[i];
        addRow(i);
    }
    console.log("retrieveData() has run.");
}

function multidimentionalArray(i){
    row[i] = new Array();
    console.log('multidimensionalArray() has run.');
}

function pushEntry(i){
    var date = new Date(),
        year = doubleDigits((date.getFullYear() - 2000)),
        month = doubleDigits((date.getMonth() + 1)),
        day = doubleDigits(date.getDate()),
        hour = doubleDigits(date.getHours()),
        minute = doubleDigits(date.getMinutes()),
        second = doubleDigits(date.getSeconds());
    
    row[i][0] = day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
    row[i][1] = document.getElementById('input1').nodeValue;
    row[i][2] = document.getElementById('input2').nodeValue;

    console.log('pushEntry() has run.')
}// Amount of variables in row[*] should be equal to the amount of collumns in the table

function doubleDigits(i){
    if(i < 10){
        return "0" + i;
    }else{
        return i;
    }
}

function saveData(){
    localStorage.setItem('savedTable', JSON.stringify(row));
    localStorage.setItem('rowArray', row.length);
    console.log("saveData() has run.");
}

function addRow(i){
    var tableRow = document.getElementById('table').insertRow(1),
        cell = new Array();

    cell[i] = tableRow.insertCell(0);//declaring variable

    cell[0].innerHTML = row[i][0];
    cell[1].innerHTML = row[i][1];// this is undefined 
    // return cell[i].innerHTML = "00/00/00 00:00:00";
}// Amount of variables in cell array should be equal to the amount of collumns in the table

function clear(){
    for(var i = 2;document.querySelector('tr:nth-child(' + i + ')');i++){
        document.querySelector('tr:nth-child(' + i + ')').deleteCell(1);
        document.querySelector('tr:nth-child(' + i + ')').deleteCell(0);
    }
    localStorage.removeItem('savedTable');
    localStorage.removeItem('rowArray');
    row = new Array();
    index = 0;
    
    console.log('clear() has run.')
}

function main(){
    if (started){
        multidimentionalArray(index);
        pushEntry(index);
        saveData();
        addRow(index);
        index++;
    }else {
        retrieveData();
        started = true;
    }
    console.log('main() has run.');
}