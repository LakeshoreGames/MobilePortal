lsGamePortal.painter = (function(){
    
    var paused = false;
    var drawing = false;
    var panelState = 0;
    var pos = new vec(0,0);
    var size = 10;
    var r = 255;
    var g = 255;
    var b = 0;
    var a = 1;
    var brush = 0;

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

        if(drawing)
        {
            lsGamePortal.dl.set_style('rgba('+r+","+g+","+b+","+a+')')
            draw()
        }
        
        panel()
        lsGamePortal.buttonHandler.draw_buttons();
    }

    function draw() {
        switch(brush)
        {
            case 0:
                lsGamePortal.dl.drawCirc(pos.x,pos.y,size)
                break;
            case 1:
                lsGamePortal.dl.drawRect(pos.x,pos.y,size,size)
                break;
            case 2:
                lsGamePortal.dl.drawRect(pos.x,pos.y,size,size,45)
                break;
            case 3:
                for(i = 20; i>0; i--)
                {
                  let x =  Math.random()*size + (pos.x - size*0.5)
                  let y =  Math.random()*size + (pos.y - size*0.5)
                  let s =  Math.random() * (size/10)
                  lsGamePortal.dl.drawCirc(x,y,s)
                }
                break;
        }
    }

    function panel() {
        lsGamePortal.dl.set_style( "lightgrey")
        lsGamePortal.dl.drawRect(canvas.width*0.9, canvas.height*0.5, canvas.width*0.2 , canvas.height)

        switch(panelState)
        {
            case 0:
                lsGamePortal.dl.set_style('rgba('+r+","+g+","+b+","+a+')')
                lsGamePortal.dl.drawRect(
                canvas.width*0.9,
                canvas.height*0.8,
                canvas.width*0.16,
                canvas.height*0.1)
                break;

            case 1:

                break;
        }
    }

    function setup(){
        lsGamePortal.inputHandler.clear_functions()
        lsGamePortal.buttonHandler.register_button_inputs();
        lsGamePortal.inputHandler.register_start_touch(pressed)
        lsGamePortal.inputHandler.register_end_touch(pressed)
        lsGamePortal.inputHandler.register_moves(moved)
        lsGamePortal.inputHandler.set_tilt(orientation)
        lsGamePortal.dl.set_style( "white")
        lsGamePortal.dl.clear();

        if (window.orientation == 90 || window.orientation == -90)
        {
            paused = false;
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;
            set_buttons();
        }
        else
        {
            paused = true;
            lsGamePortal.buttonHandler.add_button(canvas.width*0.75,canvas.width*0.2,canvas.width*0.2,canvas.width*0.1,function(){to_main()},"green","white","Main")
        }
    }

    function moved(e)
    {
        if(paused)
            {
              
            }
            else
            {
                if(e.touches[0].clientX < canvas.width*0.8)
                {
                    pos.x = e.touches[0].clientX
                    pos.y = e.touches[0].clientY
                }
            }
    }

    function set_buttons() {
        lsGamePortal.buttonHandler.add_button(
            canvas.width*0.85,
            canvas.height*0.05,
            canvas.width*0.08,
            canvas.height*0.06,
            function(){panel_state(0)},
            "blue",
            "white",
            "Colour"   
            )
        lsGamePortal.buttonHandler.add_button(
            canvas.width*0.95,
            canvas.height*0.05,
            canvas.width*0.08,
            canvas.height*0.06,
            function(){panel_state(1)},
            "blue",
            "white",
            "Brushes"   
            )

        if(panelState == 0)
        {
            lsGamePortal.buttonHandler.add_slider(
                canvas.width*0.9,
                canvas.height*0.2,
                canvas.width*0.16,
                canvas.height*0.1,
                function(s){change_r(s)},
                "grey",
                "black",
                "R" ,
                r/255  
                ) 

            lsGamePortal.buttonHandler.add_slider(
                canvas.width*0.9,
                canvas.height*0.35,
                canvas.width*0.16,
                canvas.height*0.1,
                function(s){change_g(s)},
                "grey",
                "black",
                "G" ,
                g/255  
                ) 

            lsGamePortal.buttonHandler.add_slider(
                canvas.width*0.9,
                canvas.height*0.5,
                canvas.width*0.16,
                canvas.height*0.1,
                function(s){change_b(s)},
                "grey",
                "black",
                "B" ,
                b/255  
                ) 
            lsGamePortal.buttonHandler.add_slider(
                canvas.width*0.9,
                canvas.height*0.65,
                canvas.width*0.16,
                canvas.height*0.1,
                function(s){change_a(s)},
                "grey",
                "black",
                "A" ,
                a/1  
                ) 
        }
        if(panelState == 1)
        {
            lsGamePortal.buttonHandler.add_slider(
                canvas.width*0.9,
                canvas.height*0.2,
                canvas.width*0.16,
                canvas.height*0.1,
                function(s){change_size(s)},
                "grey",
                "black",
                "SIZE" ,
                0.5  
                ) 

            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.85,
                canvas.height*0.35,
                canvas.width*0.08,
                canvas.height*0.1,
                function(){change_brush(0)},
                "grey",
                "white",
                "circle"   
                ) 

            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.95,
                canvas.height*0.35,
                canvas.width*0.08,
                canvas.height*0.1,
                function(){change_brush(1)},
                "grey",
                "white",
                "square"   
                ) 

            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.85,
                canvas.height*0.50,
                canvas.width*0.08,
                canvas.height*0.1,
                function(){change_brush(2)},
                "grey",
                "white",
                "diamond"   
                ) 

            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.95,
                canvas.height*0.50,
                canvas.width*0.08,
                canvas.height*0.1,
                function(){change_brush(3)},
                "grey",
                "white",
                "spray"   
                ) 
        }
    }

    function pressed(e)
    {
        if(paused)
        {
          
        }
        else
        {
            if(e.touches.length > 0)
            {
                if(e.touches[0].clientX < canvas.width*0.8)
                {
                    pos.x = e.touches[0].clientX
                    pos.y = e.touches[0].clientY
                    drawing = true;
                }
            }
            else
            {
                drawing = false;
            }
            
        }
    }

    function panel_state(i) {
        panelState = i;
        lsGamePortal.buttonHandler.clear_buttons();
        set_buttons();
    }

    function change_size(s) {
        size = s*35;
    }

    function change_r(i) {
        r = i*255;
    }
    
    function change_g(i) {
        g = i*255;
    }
    
    function change_b(i) {
        b = i*255;
    }

    function change_a(i) {
        a = i*1;
    }

    function change_brush(i) {
        brush = i;
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
                set_buttons();
            } ,300)
        }
        else
        {
            paused = true;
            lsGamePortal.buttonHandler.clear_buttons();
            setTimeout(function(){
                canvas.width = document.body.clientWidth;
                canvas.height = document.body.clientHeight;
                lsGamePortal.buttonHandler.add_button(canvas.width*0.75,canvas.width*0.2,canvas.width*0.2,canvas.width*0.1,function(){to_main()},"green","white","Main" )
            } ,300)
        }
    }

    return{
        gameLoop : gameLoop,
        setup : setup
    }

})();

