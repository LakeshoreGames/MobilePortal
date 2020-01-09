lsGamePortal.sudoku = (function(){
    
    var posx = 0;
    var posy = 0;
    var paused = false;
    var win = false;

    var gameboard = 
    [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ]

    var baseboard = 
    [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ]

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
        else if(win)
        {
            lsGamePortal.dl.set_style("white");
            lsGamePortal.dl.clear();
            lsGamePortal.dl.set_style("green")
            lsGamePortal.dl.drawText("You Win", canvas.width*0.5,canvas.width*0.15);
        }
        else
        {
        
            lsGamePortal.dl.set_style("white");
            lsGamePortal.dl.clear();
            drawboard();

            for(i = 0; i < 9; i++)
            {
                for(j = 0; j < 9; j++)
                {
                    if(gameboard[i][j] != 0)
                    {
                            lsGamePortal.dl.set_style("blue");
                            lsGamePortal.dl.drawText(gameboard[i][j],canvas.width*(i/9) +0.05*canvas.width,canvas.width*(j/9)+0.05*canvas.width)
                    }
                    if(i == posx && j == posy)
                    {
                        lsGamePortal.dl.set_style("green");
                        lsGamePortal.dl.drawLine(canvas.width*(i/9), canvas.width*(j/9),canvas.width*((i+1)/9), canvas.width*(j/9),2);
                        lsGamePortal.dl.drawLine(canvas.width*(i/9), canvas.width*(j/9),canvas.width*(i/9), canvas.width*((j+1)/9),2);
                        lsGamePortal.dl.drawLine(canvas.width*(i/9), canvas.width*((j+1)/9),canvas.width*((i+1)/9), canvas.width*((j+1)/9),2);
                        lsGamePortal.dl.drawLine(canvas.width*((i+1)/9), canvas.width*(j/9),canvas.width*((i+1)/9), canvas.width*((j+1)/9),2);
                    }
                }
            }
        }
        lsGamePortal.buttonHandler.draw_buttons()
    }

    function test()
    {
        var test = true;
        for(i = 0; i < 9; i++)
        {
            var nums = [1,2,3,4,5,6,7,8,9]
            for(j = 0; j < 9; j++)
            {
                if(nums.includes(gameboard[i][j]) )
                {
                    nums.splice(nums.indexOf(gameboard[i][j]),1 )
                } 
                else
                {
                    test = false;
                }
            }
        }

        
        for(i = 0; i < 9; i++)
        {
            var nums = [1,2,3,4,5,6,7,8,9]
            for(j = 0; j < 9; j++)
            {
                if(nums.includes(gameboard[j][i]) )
                {
                    nums.splice(nums.indexOf(gameboard[j][i]),1 )
                } 
                else
                {
                    test = false;
                }
            }
        }

        for(a = 0; a < 3; a++)
        {
            for(b = 0; b < 3; b++)
            {
                var nums = [1,2,3,4,5,6,7,8,9]
                for(j = 0; j < 3; j++)
                {
                    for(k = 0; k < 3; k++)
                    {
                        if(nums.includes(gameboard[j+(b*3)][k+(a*3)]) )
                        {
                            nums.splice(nums.indexOf(gameboard[j+(b*3)][k+(a*3)]),1 )
                        } 
                        else
                        {
                            test = false;
                        }
                    }
                }
            }
        }
        if(test)
        {
            win = true;
            lsGamePortal.buttonHandler.add_button(canvas.width*0.5,canvas.width*0.30,canvas.width*0.2,canvas.width*0.1,function(){setup()},"green","white","Play Again" )
        }
    }

    function setup(){
        win = false;
        lsGamePortal.inputHandler.clear_functions();
        lsGamePortal.buttonHandler.register_button_inputs();
        lsGamePortal.inputHandler.register_start_touch(set_pos)
        lsGamePortal.inputHandler.set_tilt(orientation)


        gameboard = 
        [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ]
    
        baseboard = 
        [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ]

        for(i = 0; i < 13; i++)
        {
            var x = Math.floor(Math.random()*9);
            var y = Math.floor(Math.random()*9);

            var xquad = Math.floor(x/3);
            var yquad = Math.floor(y/3);

            var val = Math.ceil(Math.random()*9);
            var test = true;

            for(j = 0; j < 9; j++)
            {
                if(baseboard[j][y] == val )
                {
                    test = false
                } 
            }

            for(j = 0; j < 9; j++)
            {
                if(baseboard[x][j] == val )
                {
                    test = false
                } 
            }

            for(j = 0; j < 3; j++)
            {
                for(k = 0; k < 3; k++)
                {
                    if(baseboard[j + xquad][k + yquad] == val )
                    {
                        test = false
                    } 
                }
            }

            if(!test)
            {
                i--;
            }
            else
            {
                baseboard[x][y] = val;
            }
        }

        for(i = 0; i < 9; i++)
        {
            for(j = 0; j < 9; j++)
            {
                if(baseboard[i][j] != 0)
                {
                    gameboard[i][j] = baseboard[i][j];
                }
            }
        }
        if(window.orientation == 90 || window.orientation == -90)
        {
            paused = true;
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;
            lsGamePortal.buttonHandler.add_button(canvas.width*0.75,canvas.width*0.2,canvas.width*0.2,canvas.width*0.1,function(){to_main()},"green","white","Menu" )
        }
        else
        {
            paused = false;
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;
            set_buttons();
        }
    }

    function set_buttons()
    {
        lsGamePortal.buttonHandler.clear_buttons();

        lsGamePortal.buttonHandler.add_button(
            canvas.width*0.1,
            canvas.width + canvas.width*0.07,
            canvas.width*0.12,
            canvas.width*0.08,
            function(){change_number(1)},
            "blue",
            "white",
            "1"   
            )
    
            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.3,
                canvas.width + canvas.width*0.07,
                canvas.width*0.12,
                canvas.width*0.08,
                function(){change_number(2)},
                "blue",
                "white",
                "2"   
                )
    
            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.5,
                canvas.width + canvas.width*0.07,
                canvas.width*0.12,
                canvas.width*0.08,
                function(){change_number(3)},
                "blue",
                "white",
                "3"   
                )         
    
            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.7,
                canvas.width + canvas.width*0.07,
                canvas.width*0.12,
                canvas.width*0.08,
                function(){change_number(4)},
                "blue",
                "white",
                "4"   
                )
                        
            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.9,
                canvas.width + canvas.width*0.07,
                canvas.width*0.12,
                canvas.width*0.08,
                function(){change_number(5)},
                "blue",
                "white",
                "5"   
                )
    
            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.1,
                canvas.width + canvas.width*0.22,
                canvas.width*0.12,
                canvas.width*0.08,
                function(){change_number(6)},
                "blue",
                "white",
                "6"   
                )
    
            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.3,
                canvas.width + canvas.width*0.22,
                canvas.width*0.12,
                canvas.width*0.08,
                function(){change_number(7)},
                "blue",
                "white",
                "7"   
                )
    
            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.5,
                canvas.width + canvas.width*0.22,
                canvas.width*0.12,
                canvas.width*0.08,
                function(){change_number(8)},
                "blue",
                "white",
                "8"   
                )
    
            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.7,
                canvas.width + canvas.width*0.22,
                canvas.width*0.12,
                canvas.width*0.08,
                function(){change_number(9)},
                "blue",
                "white",
                "9"   
                )  
            lsGamePortal.buttonHandler.add_button(
                canvas.width*0.9,
                canvas.width + canvas.width*0.22,
                canvas.width*0.12,
                canvas.width*0.08,
                function(){test()},
                "blue",
                "white",
                "Done"   
                )  
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

    function drawboard()
    {
        lsGamePortal.dl.set_style("blue");
        for(i = 1; i < 9; i++)
        {
            lsGamePortal.dl.drawLine(canvas.width*(i/9),0,canvas.width*(i/9),canvas.width,1);
        }
        for(i = 1; i < 9; i++)
        {
            lsGamePortal.dl.drawLine(0,canvas.width*(i/9),canvas.width,canvas.width*(i/9),1);
        }

        lsGamePortal.dl.drawLine(canvas.width*(3/9),0,canvas.width*(3/9),canvas.width,3);
        lsGamePortal.dl.drawLine(canvas.width*(6/9),0,canvas.width*(6/9),canvas.width,3);

        lsGamePortal.dl.drawLine(0,canvas.width*(3/9),canvas.width,canvas.width*(3/9),3);
        lsGamePortal.dl.drawLine(0,canvas.width*(6/9),canvas.width,canvas.width*(6/9),3);

        lsGamePortal.dl.set_style("black");
        lsGamePortal.dl.drawLine(0,canvas.width*(9/9),canvas.width,canvas.width*(9/9),3);

    }

    function set_pos(e)
    {
        if(!paused)
        {
            if((e.touches[0].clientX / canvas.width) <= 1 && (e.touches[0].clientY / canvas.width) <= 1)
            {
                posx = Math.floor((e.touches[0].clientX / canvas.width)*9);
                posy = Math.floor((e.touches[0].clientY / canvas.width)*9);
            }
        }
    }

    function change_number(i)
    {
        if(!paused)
        {
            if(baseboard[posx][posy] == 0)
            {
                gameboard[posx][posy] = i;
            }
        }
    }

    function orientation()
    {
        if(window.orientation == 90 || window.orientation == -90)
        {
            paused = true;
            lsGamePortal.buttonHandler.clear_buttons()
            setTimeout(function(){
                canvas.width = document.body.clientWidth;
                canvas.height = document.body.clientHeight;
                lsGamePortal.buttonHandler.add_button(canvas.width*0.75,canvas.width*0.2,canvas.width*0.2,canvas.width*0.1,function(){to_main()},"green","white","Menu" )
            } ,300)
        }
        else
        {
            paused = false;
            setTimeout(function(){
                canvas.width = document.body.clientWidth;
                canvas.height = document.body.clientHeight;
                set_buttons();
            } ,300)
        }
    }

    return{
        gameLoop : gameLoop,
        setup : setup
    }

})();