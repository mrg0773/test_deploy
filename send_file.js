const {loadImage, createCanvas} = require("canvas");
const FormData = require("form-data");
const fetch = require("node-fetch");

async function send_file(data){

    image = await loadImage(data.content.image_path)
    let canvas = createCanvas(image.width, image.height);
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
    data.content.fill_text.forEach(fill_text =>{
        ctx = doFillText(ctx,fill_text)
    //ctx.font = fill_text.font;
    //ctx.fillText('текст на фото', 10, 20);
    //fill_text.texts.forEach(text=>{
        //ctx.fillText(text, 10, 20);
    //})
    })

    blob = canvas.createPNGStream();

    data.target_tg_ids.forEach(tg_id => {
        formData = new FormData();
        formData.append('chat_id', tg_id);
        formData.append('photo', blob, 'image.png');
        const url = `https://api.telegram.org/bot${data.tg_bot.token}/sendPhoto`;
        let options = {
            method: 'POST',
            body: formData
        }
        response =  fetch(url, options)
        //result =  response.json()
        //console.log(result)
    })

}

 async function doFillText (ctx,fill_text){
    ctx.font = `${fill_text.font.size}px "${fill_text.font.name}"`;
    let old_x,old_y,dx,dy;
    fill_text.texts.forEach(text => {
        dx = !!text.dx ? text.dx : Number(old_x) + Number(text.shift_x);
        dy = !!text.dy ? text.dy : Number(old_y) + Number(text.shift_y);
        ctx.fillText(text.text, dx, dy);
        old_x = dx;
        old_y = dy;
    })
    return ctx
}


module.exports={send_file}