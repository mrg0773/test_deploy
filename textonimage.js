const fetch = require('node-fetch');
const FormData = require('form-data');
const {createCanvas, loadImage} = require('canvas');


module.exports.do_fill_text = async function (ctx,fill_text){
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