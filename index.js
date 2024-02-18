//обработчик для различных сервисных модулей
const {load_from_ydb} = require("./load_from_ydb");
const {send_file} = require("./send_file");
const {loadImage, createCanvas} = require("canvas");



module.exports.handler = async function (event, context) {
    let inbox_data = context.getPayload();//получаем входящие данные
    //todo загрузить данные бота по входящей информации
    //inbox_data.content.image_path
    inbox_data = await load_from_ydb(inbox_data);
    if (inbox_data.command === 'image') {
        await send_file(inbox_data)
    }
    return {
        statusCode:200,
        body:{
            result:'проверьте результат отправки в телеграмм'
        }
    }
}

        //try{

                /*
                inbox_data.content.fill_text.forEach(fill_text => {
                    ctx = do_fill_text(ctx,fill_text)

                })

                 */








//            }


  //      catch (e) {
    //        console.error(e)
      //  }





