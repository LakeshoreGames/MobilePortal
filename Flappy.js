lsGamePortal.flappy = (function(){
    
    var dist = 0;
    var posy = 50;
    var lt = 0;
    var speed = 0;
    var acc = 180;
    var paused = false;
    var size = 50;

    var  block = function(x, y, h)
    {
        this.x = x;
        this.y = y;
        this.h = h;
    }


    var blocks = []
    
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

        dt = (Date.now() - lt)/1000;
        lt = Date.now();
        speed += dt*acc;
        posy += dt * speed;
        dist += dt*5

        lsGamePortal.dl.set_style( "white")
        lsGamePortal.dl.clear();
        let died = false;

        for(i = blocks.length-1; i > -1 ; i--)
        {
            blocks[i].x += dt*-75

            if(blocks[i].x <= -(canvas.width/20))
            {
                let ratio = clamp((dist/500),0,1)
                if(i==0)
                {
                    blocks[i].x = blocks[blocks.length-1].x + canvas.width/20.5
                    blocks[i].y =  clamp(Math.random() * (ratio*(canvas.height*.3)*2) +  (blocks[blocks.length-1].y - ratio*(canvas.height*.3)) , 0.2*canvas.height, 0.8*canvas.height)
                    blocks[i].h =  clamp(blocks[blocks.length-1].h - (ratio*(canvas.height*.3)*2) + Math.random() * (ratio*(canvas.height*.3)*2), 0.3*canvas.height, 0.8*canvas.height)
                }
                else
                {
                    blocks[i].x = blocks[i-1].x + canvas.width/20.5
                    blocks[i].y =  clamp(Math.random() * (ratio*(canvas.height*.3)*2) +  (blocks[i-1].y - ratio*(canvas.height*.3)) , 0.2*canvas.height, 0.8*canvas.height)
                    blocks[i].h =  clamp(blocks[i-1].h - (ratio*(canvas.height*.3)*2) + Math.random() * (ratio*(canvas.height*.3)*2), 0.3*canvas.height, 0.8*canvas.height)                 
                }
             }

            lsGamePortal.dl.set_style("green");
            lsGamePortal.dl.drawRectCorner(blocks[i].x, 0                          , canvas.width/19, blocks[i].y - blocks[i].h/2)
            lsGamePortal.dl.drawRectCorner(blocks[i].x, blocks[i].y + blocks[i].h/2, canvas.width/19, canvas.height)

            if(posy + size*0.9 > (blocks[i].y  + blocks[i].h/2) || posy - size*0.9 < (blocks[i].y  - blocks[i].h/2))
            {
                if(blocks[i].x < canvas.width*0.1+size*0.9 && blocks[i].x + canvas.width/20 > canvas.width*0.1 - size*0.9 )
                {
                    died = true;
                }
            }
        }

        lsGamePortal.dl.drawCirc(canvas.width*0.1, posy, size)
        lsGamePortal.dl.set_style( "white")
        lsGamePortal.dl.drawText("Score: " + Math.floor(dist) , canvas.width*0.03,canvas.height*0.05);
        
        if(died)
        {
            posy = canvas.height/2;
            speed = 0;
            dist = 0;
            for(i=0;i<22;i++)
            {
                blocks[i].x =i*(canvas.width/20)
                blocks[i].y = 0.5*canvas.height
                blocks[i].h = 0.8*canvas.height
            }
        }

    }

    function setup(){
        lsGamePortal.inputHandler.clear_functions()
        lsGamePortal.buttonHandler.register_button_inputs();

        lsGamePortal.inputHandler.register_start_touch(pressed)
        lsGamePortal.inputHandler.register_end_touch(pressed)
        lsGamePortal.inputHandler.set_tilt(orientation)

        lt = Date.now();
        posy = canvas.height/2;
        acc = 360;
        speed = 0;
        dist = 0;

        if(window.orientation == 90 || window.orientation == -90)
        {
            paused = false;
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;
            size = canvas.height*0.04
            for(i=0;i<22;i++)
            {
                blocks.push(new block(i*(canvas.width/20),0.5*canvas.height, 0.8*canvas.height ))
            }
        }
        else
        {
            paused = true;
            lsGamePortal.buttonHandler.add_button(canvas.width*0.75,canvas.width*0.2,canvas.width*0.2,canvas.width*0.1,function(){to_main()},"green","white","Main")
            size = canvas.width*0.04
            for(i=0;i<22;i++)
            {
                blocks.push(new block(i*(canvas.height/20),0.5*canvas.width, 0.8*canvas.width ))
            }
        }
    }

    function pressed()
    {
        if(paused)
        {
          
        }
        else
        {
            acc = -acc;
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
            setTimeout(function(){
                canvas.width = document.body.clientWidth;
                canvas.height = document.body.clientHeight;
                lsGamePortal.buttonHandler.clear_buttons();
            } ,300)
        }
        else
        {
            paused = true;
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

