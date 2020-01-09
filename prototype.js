lsGamePortal.GAMENAME = (function(){
    
    var paused = false;

    function gameLoop (){
        if(paused)
        {
            lsGamePortal.dl.clear();
            lsGamePortal.dl.set_style( "green")
            lsGamePortal.dl.drawRect( canvas.width*0.25,canvas.width*0.2,canvas.width*0.2,canvas.width*0.1)
            lsGamePortal.dl.set_style( "white")
            lsGamePortal.dl.drawText("Paused", canvas.width*0.25,canvas.width*0.2);
            lsGamePortal.buttonHandler.draw_buttons();
            return;
        }
        lsGamePortal.dl.set_style( "white")
        lsGamePortal.dl.clear();

    }

    function setup(){
        lsGamePortal.inputHandler.clear_functions()
        lsGamePortal.buttonHandler.register_button_inputs();
        lsGamePortal.inputHandler.set_tilt(orientation)


        if (window.orientation == 90 || window.orientation == -90)
        {
            paused = false; //SET ORIENTATION
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;
        }
        else
        {
            paused = true;
            lsGamePortal.buttonHandler.add_button(canvas.width*0.75,canvas.width*0.2,canvas.width*0.2,canvas.width*0.1,function(){to_main()},"green","white","Main")
        }
    }

    function to_main()
    {
        clearInterval(gameRunning);
        lsGamePortal.buttonHandler.clear_buttons();
        lsGamePortal.inputHandler.clear_functions();
        lsGamePortal.inputHandler.set_tilt(function(){ if(state==0){setTimeout(menu,300)}})
        setTimeout(function()
        {
            state = 0;
            menu()
        },50)
    }

    function orientation()
    {
        if(window.orientation == 90 || window.orientation == -90)
        {
            paused = false;
            lsGamePortal.buttonHandler.clear_buttons();
            setTimeout(function(){
                canvas.width = document.body.clientWidth;
                canvas.height = document.body.clientHeight;
            } ,300)
        }
        else
        {
            paused = true;
            lsGamePortal.buttonHandler.clear_buttons();
            setTimeout(function(){
                canvas.width = document.body.clientWidth;
                canvas.height = document.body.clientHeight;
                lsGamePortal.buttonHandler.add_button(canvas.width*0.75,canvas.width*0.2,canvas.width*0.2,canvas.width*0.1,function(){to_main()},"green","white","Main" ) //SET ORIENTATION
            } ,300)
        }
    }

    return{
        gameLoop : gameLoop,
        setup : setup
    }

})();

