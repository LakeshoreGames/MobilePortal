lsGamePortal.buttonHandler = (function(){
    var button = function(x,y,w,h,f,c1,c2,t){ 
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.f = f;
        this.c1 = c1;
        this.c2 = c2;
        this.t = t;
    }

    var toggle = function(x,y,w,h,f,c1,c2,t,b){ 
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.f = f;
        this.c1 = c1;
        this.c2 = c2;
        this.t = t;
        this.b = b;
    }
    
    var slider = function(x,y,w,h,f,c1,c2,t,p){ 
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.f = f;
        this.c1 = c1;
        this.c2 = c2;
        this.t = t;
        this.p = p;
    }

    var buttons = []
    var toggles = []
    var sliders = []
    var grabbed = -1;
    var touchPos = new vec(0,0);

    function add_button(x,y,w,h,f,c1 = "black",c2 = "white", t = "NO TEXT" )
    {
       buttons.push(new button(x,y,w,h,f,c1,c2,t));
    }

    function add_toggle(x,y,w,h,f,c1 = "black",c2 = "white", t = "NO TEXT", b = false )
    {
       toggles.push(new toggle(x,y,w,h,f,c1,c2,t,b));
    }

    function add_slider(x,y,w,h,f,c1 = "black",c2 = "white", t = "NO TEXT", p = 0 )
    {
       sliders.push(new slider(x,y,w,h,f,c1,c2,t,p));
    }

    function register_button_inputs() {
        
       lsGamePortal.inputHandler.register_start_touch(set_pos);
       lsGamePortal.inputHandler.register_moves(set_pos);
       
       lsGamePortal.inputHandler.register_end_touch(check_buttons);
       lsGamePortal.inputHandler.register_end_touch(check_toggles);

       lsGamePortal.inputHandler.register_start_touch(grab_sliders);
       lsGamePortal.inputHandler.register_moves(move_slider);
       lsGamePortal.inputHandler.register_end_touch(release_slider);

    }

    function set_pos(e) {
        touchPos.x = e.touches[0].clientX;
        touchPos.y = e.touches[0].clientY;
    }

    function check_buttons()
    {
        for(i = 0; i < buttons.length; i++)
        {
            if(buttons[i].x - (buttons[i].w/2) < touchPos.x )
            {
                if(buttons[i].y - (buttons[i].h/2)  < touchPos.y)
                {
                    if(buttons[i].x + (buttons[i].w/2) > touchPos.x  )
                    {
                        if(buttons[i].y + (buttons[i].h/2) >touchPos.y)
                        {
                            buttons[i].f();
                            i=buttons.length
                        }
                    }
                }
            }
        }
    }

    function check_toggles()
    {
        for(i = 0; i < toggles.length; i++)
        {
            if(toggles[i].x - (toggles[i].w/2) <touchPos.x )
            {
                if(toggles[i].y - (toggles[i].h/2)  < touchPos.y)
                {
                    if(toggles[i].x + (toggles[i].w/2) > touchPos.x )
                    {
                        if(toggles[i].y + (toggles[i].h/2) > touchPos.y)
                        {
                            toggles[i].b = !toggles[i].b;
                            toggles[i].f( toggles[i].b );
                            i=toggles.length
                        }
                    }
                }
            }
        }
    }

    function grab_sliders(e) {
        if(grabbed == -1)
        {
            for(i = 0; i < sliders.length; i++)
            {
                let barw = sliders[i].w*0.1;
                let barx = sliders[i].x + sliders[i].w * (clamp(sliders[i].p,0,1)-0.5)

                if(barx - (barw/2) < e.touches[0].clientX )
                {
                    if(sliders[i].y - (sliders[i].h/2)  < e.touches[0].clientY)
                    {
                        if(barx + (barw/2) > e.touches[0].clientX )
                        {
                            if(sliders[i].y + (sliders[i].h/2) > e.touches[0].clientY)
                            {
                                grabbed = i;
                                i=sliders.length
                            }
                        }
                    }
                }
            }
        }
    }

    function move_slider()
    {
        if(grabbed == -1)
        {
            return
        }
        /*
        if(event.clientY > sliders[grabbed].y - sliders[grabbed].h*0.5 && event.clientY < sliders[grabbed].y + sliders[grabbed].h*0.5)
        {
            if(event.clientX > sliders[grabbed].x - sliders[grabbed].w*0.5 && event.clientY < sliders[grabbed].x + sliders[grabbed].w*0.5)
            {
                sliders[grabbed].p = (event.clientX- (sliders[grabbed].x - sliders[grabbed].w*0.5))/sliders[grabbed].w
            } 
        }
        */
        if(touchPos.y > sliders[grabbed].y - sliders[grabbed].h*0.5 && touchPos.y < sliders[grabbed].y + sliders[grabbed].h*0.5)
        {
            if(touchPos.x > sliders[grabbed].x - sliders[grabbed].w*0.5 && touchPos.x < sliders[grabbed].x + sliders[grabbed].w*0.5)
            {
                sliders[grabbed].p = (touchPos.x- (sliders[grabbed].x - sliders[grabbed].w*0.5))/sliders[grabbed].w
            } 
        }
        
    }

    function release_slider() {
        if(grabbed == -1)
        {
            return
        }
        else
        {
            sliders[grabbed].f( clamp(sliders[grabbed].p,0,1));
            grabbed = -1;
        }
    }

    function clear_buttons()
    {
        buttons = []
        toggles = []
        sliders = []
    }

    function draw_buttons()
    {
        for(i = 0; i < buttons.length; i++)
        {
            lsGamePortal.dl.set_style(buttons[i].c1)
            lsGamePortal.dl.drawButton(buttons[i].x, buttons[i].y, buttons[i].w, buttons[i].h)
            lsGamePortal.dl.set_style(buttons[i].c2)
            lsGamePortal.dl.drawText( buttons[i].t, buttons[i].x, buttons[i].y)
        }
        for(i = 0; i < toggles.length; i++)
        {
            if(toggles[i].b)
            {
                lsGamePortal.dl.set_style(toggles[i].c1)
                lsGamePortal.dl.drawPressed(toggles[i].x, toggles[i].y, toggles[i].w, toggles[i].h)
                lsGamePortal.dl.set_style(toggles[i].c2)
                lsGamePortal.dl.drawText( toggles[i].t, toggles[i].x, toggles[i].y)
            }
            else
            {
                lsGamePortal.dl.set_style(toggles[i].c1)
                lsGamePortal.dl.drawButton(toggles[i].x, toggles[i].y, toggles[i].w, toggles[i].h)
                lsGamePortal.dl.set_style(toggles[i].c2)
                lsGamePortal.dl.drawText( toggles[i].t, toggles[i].x, toggles[i].y)
            }
        }
        for(i = 0; i < sliders.length; i++)
        {
            lsGamePortal.dl.drawSlider(sliders[i].x,sliders[i].y,sliders[i].w,sliders[i].h,sliders[i].p,sliders[i].c1)
            lsGamePortal.dl.set_style(sliders[i].c2)
            lsGamePortal.dl.drawText( sliders[i].t, sliders[i].x-sliders[i].w*0.25, sliders[i].y - sliders[i].h*0.6)
        }
    }

    return{
        add_button : add_button,
        add_toggle : add_toggle,
        add_slider : add_slider,
        clear_buttons : clear_buttons,
        register_button_inputs : register_button_inputs,
        draw_buttons : draw_buttons
    }

})();