const button = document.getElementById("submit");

button.addEventListener("click", function(){
    clearPrompts();
    validation();
});

function validation(){
    var values = document.getElementsByTagName("input");
    var storage = [];

    for(var x = 0 ; x < values.length; x++){
        storage.push(values[x].value);
    }

    var year = new Date().getFullYear();

    if(storage.includes("")){
        error('empty', year, values);
    } else if(storage[1] > 12 || months(storage[1]) < storage[0] || storage[2] > year){
        error('invalid' , year, values);
    } else{
        style('hsl(0, 0%, 86%)','hsl(0, 1%, 44%)');
        calculate(storage, year);
    }
}

function calculate(values, year){
    var month = new Date().getMonth();
    var day = new Date().getDay();

    var years = year - values[2];
    var months = month - values[1];
    var days = day - values[0];

     if(months < 0){
        years -= 1;
        months *= -1;
     }

     if(days < 0) {
        months -= -1;
        if(months == 0) {
            years -= -1;
            months = 12;
        }
        days *= -1;
     }

     var output = document.getElementsByClassName("blank");

     output[0].innerHTML = years;
     output[1].innerHTML = months;
     output[2].innerHTML = days;
}

function error(errorType , year, values) {
    style('hsl(0, 100%, 67%)');

    var errorPrompts = document.getElementsByClassName("error-prompt");

    switch(errorType){
        case 'empty':

            for(var x = 0; x < values.length; x++){
                if(values[x].value === ""){
                    console.log(!values[x].value)
                    errorPrompts[x].style.visibility = "visible";
                    errorPrompts[x].innerHTML = "This field is required.";
                }
            }

            break;

        case 'invalid':

            if(months(values[1].value) < values[0].value){
                errorPrompts[0].style.visibility = "visible";
                errorPrompts[0].innerHTML = "Must be a valid date"
            } 

            if(values[1].value > 12){
                errorPrompts[1].style.visibility = "visible";
                errorPrompts[1].innerHTML = "Must be a valid month"
            } 
            
            if(values[2].value > year){
                errorPrompts[2].style.visibility = "visible";
                errorPrompts[2].innerHTML = "Must be a in the past"
            }

            break;
        
    }
}

function months(month){
    switch(month){
        case '11','9','6','4':
            return 30
        case '2':
            return 28;
        default:
            return 31;
    }
}

function style(vcolor, lcolor=vcolor){
    var values = document.getElementsByTagName("input");
    var labels = document.getElementsByTagName("label");
    
    for(var x = 0; x < values.length; x++){
        values[x].style.borderColor = vcolor;
        labels[x].style.color = lcolor;
    }
}

function clearPrompts(){
    var errorPrompts = document.getElementsByClassName("error-prompt");
        for(var x = 0; x < errorPrompts.length; x++){
            errorPrompts[x].style.visibility='hidden';
        }
}