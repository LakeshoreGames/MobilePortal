lsGamePortal.dl = (function(){
    
    var ctx;
    var sprites = []

    function set_context(c)
    {
        ctx = c;
    }

    function set_sprites(a) {
        sprites = a;
    }

    function drawRect (x,y,w,h,a = 0){
        if(a != 0)
        {
            rotation(a,x,y)
            x=0;
            y=0;
        }
        x = x-(w/2);
        y = y-(h/2);
        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.lineTo(x+w,y);
        ctx.lineTo(x+w,y+h);
        ctx.lineTo(x,y+h);
        ctx.lineTo(x,y);
        ctx.fill();
        ctx.restore();
    }

    function drawRectCorner (x,y,w,h){
        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.lineTo(x+w,y);
        ctx.lineTo(x+w,y+h);
        ctx.lineTo(x,y+h);
        ctx.lineTo(x,y);
        ctx.fill();
    }

    function rotation(ang, x, y) {
        ctx.save()
        ctx.translate(x,y)
        ctx.rotate(ang * deg2rad)
    }

    function drawCirc (x,y,r){
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2,false);
        ctx.fill();
    }

    function clear()
    {
        drawRect(0,0,screen.width*2,screen.height*2)
    }

    function drawText(t,x,y)
    {
        ctx.textAlign = "center"
        ctx.fillText(t,x,y)
    }

    function drawButton(x,y,w,h)
    {
        x = x-w/2
        y = y-h/2

        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.lineTo(x+w,y);
        ctx.lineTo(x+w,y+h);
        ctx.lineTo(x,y+h);
        ctx.lineTo(x,y);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.5)'

        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.lineTo(x+w,y);
        ctx.lineTo(x+(w - (h*0.04)),y+ (h*0.04));
        ctx.lineTo(x+(h*0.04),y+ (h*0.04));
        ctx.lineTo(x,y);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.25)'

        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.lineTo(x,y+h);
        ctx.lineTo(x+(h*0.04),y+ (h*0.96));
        ctx.lineTo(x+(h*0.04),y+ (h*0.04));
        ctx.lineTo(x,y);
        ctx.fill();

        ctx.fillStyle = 'rgba(0,0,0,0.25)'
        ctx.moveTo(x+w,y);
        ctx.beginPath();
        ctx.lineTo(x+w,y+h);
        ctx.lineTo(x+(w- (h*0.04)),y+ (h*0.96));
        ctx.lineTo(x+(w- (h*0.04)),y+ (h*0.04));
        ctx.lineTo(x+w,y);
        ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.5)'

        ctx.moveTo(x,y+h);
        ctx.beginPath();
        ctx.lineTo(x,y+(h*0.96));
        ctx.lineTo(x+(w- (h*0.04)),y+ (h*0.96));
        ctx.lineTo(x+w,y+h);
        ctx.lineTo(x,y+h);
        ctx.fill();

    }

    function drawPressed(x,y,w,h)
    {
        x = x-w/2
        y = y-h/2

        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.lineTo(x+w,y);
        ctx.lineTo(x+w,y+h);
        ctx.lineTo(x,y+h);
        ctx.lineTo(x,y);
        ctx.fill();

        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.lineTo(x+w,y);
        ctx.lineTo(x+w,y+h);
        ctx.lineTo(x,y+h);
        ctx.lineTo(x,y);
        ctx.fill();

        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.lineTo(x+w,y);
        ctx.lineTo(x+(w - (h*0.04)),y+ (h*0.04));
        ctx.lineTo(x+(h*0.04),y+ (h*0.04));
        ctx.lineTo(x,y);
        ctx.fill();

        ctx.fillStyle = 'rgba(0,0,0,0.25)'
        ctx.moveTo(x,y);
        ctx.beginPath();
        ctx.lineTo(x,y+h);
        ctx.lineTo(x+(h*0.04),y+ (h*0.96));
        ctx.lineTo(x+(h*0.04),y+ (h*0.04));
        ctx.lineTo(x,y);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.moveTo(x+w,y);
        ctx.beginPath();
        ctx.lineTo(x+w,y+h);
        ctx.lineTo(x+(w- (h*0.04)),y+ (h*0.96));
        ctx.lineTo(x+(w- (h*0.04)),y+ (h*0.04));
        ctx.lineTo(x+w,y);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.moveTo(x,y+h);
        ctx.beginPath();
        ctx.lineTo(x,y+(h*0.96));
        ctx.lineTo(x+(w- (h*0.04)),y+ (h*0.96));
        ctx.lineTo(x+w,y+h);
        ctx.lineTo(x,y+h);
        ctx.fill();

    }

    function drawSlider(x,y,w,h,p,c) {
        p = clamp(p,0,1)
        set_style("grey")
        drawRect(x,y,w,h*0.05)
        set_style(c);
        drawRect(x + w*(p-0.5),y,0.1*w,h)
    }

    function set_style(s)
    {
        ctx.fillStyle = s;
        ctx.strokeStyle = s;
    }

    function drawLine(x1, y1, x2, y2, s)
    {
        ctx.lineWidth = s;
        ctx.beginPath();
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2) 
        ctx.stroke();
    }

    function drawImg(x,y,w,h,i,a=0) {
        if(a != 0)
        {
            rotation(a,x,y)
            x=0;
            y=0;
        }
        x = x-(w/2)
        y = y-(h/2)
        ctx.drawImage(sprites[i],x,y,w,h)
        ctx.restore();
    }

    function drawSprite(x,y,w,h,i,sx,sy,sw,sh,a=0) {
        if(a != 0)
        {
            rotation(a,x,y)
            x=0;
            y=0;
        }
        x = x-(w/2)
        y = y-(h/2)
        ctx.drawImage(sprites[i],sx,sy,sw,sh,x,y,w,h)
        ctx.restore();
    }

    return{
        drawCirc : drawCirc,
        drawRect : drawRect,
        drawRectCorner : drawRectCorner,
        drawText : drawText,
        drawLine : drawLine,
        drawImg : drawImg,
        drawSprite : drawSprite,
        drawButton: drawButton,
        drawPressed: drawPressed,
        drawSlider: drawSlider,
        set_style : set_style,
        set_context : set_context,
        set_sprites : set_sprites,
        clear : clear
    }

})();

