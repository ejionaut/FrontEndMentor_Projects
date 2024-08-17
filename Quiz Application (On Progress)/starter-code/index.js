var widget_buttons = document.querySelectorAll(".widget-text");

var title;
var icon;
var questions = [];

for(var x = 0; x < widget_buttons.length; x++){
    document.querySelectorAll(".widget-text")[x].parentNode.addEventListener("click", function(){
        var text = this.children[1].innerHTML;
        getData(text)
    });
}

function topicDecider(topic){
    switch (topic) {
        case 'HTML':
            setheader('HTML','html');
            startQuiz(topic);
            break;

        case 'CSS':
            setheader('CSS','css')
            startQuiz(topic);
            break;

        case 'JavaScript':
            setheader('JavaScript','js');
            startQuiz(topic);
            break;

        case 'Accessibility':
            setheader('Accessibility','accessibility');
            startQuiz(topic);
            break;
    }
}

function setheader(topic, src){
    var topichead = document.getElementById("topic-header");
    topichead.textContent = topic;
    topichead.style.visibility='visible';

    var topicimg = document.getElementById("topic-image");
    topicimg.src=icon;
    topicimg.style.visibility= 'visible';
}

async function getData(topic){
    let url = './data.json';
    try {
        let res = await fetch(url);
        let data = await res.json();
        for(var quiz of data.quizzes){
            if(quiz.title == topic){
                title = quiz.title;
                questions = quiz.questions;
                icon = quiz.icon;
            }
        }
    } catch(error){
        console.log(error);
    }
    topicDecider(title);
}

function startQuiz(quiz){
    var widgets = document.getElementsByClassName("menu")
    var letters = ['D','C','B','A'];
    for(var y = 0; y < widgets.length; y++){
        widgets[y].style.display = 'none';
        widgets[y].parentNode.insertAdjacentHTML('afterbegin','<div id="answer-widget" class="widget answer"><div id="letters" class="letters"></div><h2 class="bold widget-text">answer</h2></div>')
        document.getElementById('letters').innerHTML = letters[y];
        if(y >= 3){
            widgets[y].parentNode.insertAdjacentHTML('beforeend','<button type="button">Submit</button>');
        }
    }

    var main_header = document.getElementById('maintext');
    var sub_header = document.getElementById('subtext');
    sub_header.parentNode.insertBefore(sub_header, sub_header.parentNode.firstChild);

    var counter = 1;
    for(var x = 0; x < questions.length - 1; x++){
        sub_header.innerHTML = 'Question ' + counter + ' of ' +questions.length;
        main_header.innerHTML = questions[x].question;

        var answer_widgets = document.getElementsByClassName('widget')
        for(var z = 0; z < widgets.length; z++){
            answer_widgets[z].children[1].innerHTML = questions[x].options[z];
            }

        setWidgetSelection();
    }
}

function setWidgetSelection(){
    for(var x = 0; x < widget_buttons.length; x++){
        document.querySelectorAll(".letters")[x].parentNode.addEventListener("click", function(){
            var text = this.firstChild.innerHTML;
            widgetSelector(text);
        });
    }
}

function widgetSelector(selected){
    var widgets = document.querySelectorAll(".letters");
    for(var x = 0; x < widgets.length; x++){
        if(selected == widgets[x].innerHTML){
            widgets[x].classList.add("onclick")
            widgets[x].classList.remove("answer")
            widgets[x].parentNode.style.cssText += 'border: 0.2rem solid var(--violet);'
        } else {
            widgets[x].classList.remove("onclick")
            widgets[x].classList.add("answer")
            widgets[x].parentNode.style.cssText += 'border: 0.2rem solid var(--light-gray);'
        }
    }

}