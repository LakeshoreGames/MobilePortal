var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");

var gameRunning;
var deferredPrompt;
var state = 0;

var games = [
    function(){
        state = 1;
        lsGamePortal.buttonHandler.clear_buttons();
        lsGamePortal.sudoku.setup();
        gameRunning = setInterval( function(){ lsGamePortal.sudoku.gameLoop() }, 25)
    },

    function(){
        state = 1;
        lsGamePortal.buttonHandler.clear_buttons();
        lsGamePortal.flappy.setup();
        gameRunning = setInterval( function(){ lsGamePortal.flappy.gameLoop() }, 25)
    },

    function(){
        state = 1;
        lsGamePortal.buttonHandler.clear_buttons();
        lsGamePortal.painter.setup();
        gameRunning = setInterval( function(){ lsGamePortal.painter.gameLoop() }, 10)
    }
    
]

function menu()
{
    lsGamePortal.dl.clear();
    lsGamePortal.buttonHandler.clear_buttons();
    lsGamePortal.buttonHandler.register_button_inputs();

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    lsGamePortal.buttonHandler.add_button(canvas.width*0.50, canvas.height*0.15,canvas.width*0.4,canvas.height*0.1,games[0],"green","white","Sudoku")
    lsGamePortal.buttonHandler.add_button(canvas.width*0.50, canvas.height*0.35,canvas.width*0.4,canvas.height*0.1,games[1],"green","white","Helicopter")
    lsGamePortal.buttonHandler.add_button(canvas.width*0.50, canvas.height*0.55,canvas.width*0.4,canvas.height*0.1,games[2],"green","white","Painter")
   // lsGamePortal.buttonHandler.add_button(canvas.width*0.50, canvas.height*0.75,canvas.width*0.4,canvas.height*0.1,install,"green","white","Install")

   
    lsGamePortal.buttonHandler.draw_buttons()
}

function install() {
    deferredPrompt.prompt();
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
})

lsGamePortal.dl.set_context(ctx)
document.documentElement.requestFullscreen();
lsGamePortal.inputHandler.set_tilt(function(){ if(state==0){setTimeout(menu,300)}})
setTimeout(menu,300);