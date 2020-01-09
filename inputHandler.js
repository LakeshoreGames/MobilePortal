lsGamePortal.inputHandler = (function(){
    var onTouches = []
    var endTouches = []
    var onMoves = []
    var tilt;

    function register_start_touch(f)
    {
        onTouches.push(f)
    }

    function register_end_touch(f)
    {
        endTouches.push(f)
    }

    function register_moves(f)
    {
        onMoves.push(f)
    }

    function call_registered_starts(e)
    {
        onTouches.forEach(element => {
            element(e);
        });
    }

    function call_registered_ends(e)
    {
        endTouches.forEach(element => {
            element(e);
        });
    }

    function call_registered_moves(e)
    {
        onMoves.forEach(element => {
            element(e);
        });
    }

    function clear_functions()
    {
        onTouches = [];
        endTouches = [];
        onMoves = [];
    }

    function call_tilt()
    {
        tilt();
    }

    function set_tilt(f)
    {
        tilt = f;
    }
    
    //window.addEventListener("mousedown",call_registered_starts);
    //window.addEventListener("mouseup",call_registered_ends);
    //window.addEventListener("mousemove",call_registered_moves);

    window.addEventListener("touchstart",call_registered_starts);
    window.addEventListener("touchend",call_registered_ends);
    window.addEventListener("touchmove",call_registered_moves) 

    window.addEventListener("orientationchange",call_tilt);

    return{
        register_start_touch : register_start_touch,
        register_end_touch : register_end_touch,
        register_moves : register_moves,
        set_tilt : set_tilt,
        clear_functions : clear_functions
    }


})();