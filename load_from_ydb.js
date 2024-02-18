const Handlebars = require("hbs");
//const {requestYDB} = require("@mrg0773/tgbots");

module.exports.load_from_ydb = async function (data) {
    let pre_compile = Handlebars.compile(JSON.stringify(data));
    let user_top;
    let result_data;
    let top_count = data.content.top_count ?? 10;
    if (JSON.stringify(data).includes('{{user_top')) {

        let query = `$slag = "${data.tg_bot.slag}";
                $top = ${top_count};
                $first = select tg_id,balls,event_id from \`users/data\` where 
                        slag = $slag;
                $anketa = select * from \`users/anketa\` where slag = $slag and not(key ilike "%ава%");
                $result = select a.tg_id as tg_id,a.balls as balls,b.value as value,a.event_id as event_id from $first as a JOIN $anketa as b using (tg_id);
                $itogo = select balls as balls,tg_id as tg_id, ListConcat(agg_list(value)) as anketa,event_id from $result
                group by tg_id,balls,event_id 
                order by balls desc;
                select balls,anketa,event_id from $itogo ORDER by balls desc limit cast($top as uint64)`;
        //let query_result = await requestYDB(query, ['balls', 'anketa', 'event_id']);
        user_top = query_result.result;
        console.log({user_top: user_top})
        result_data = pre_compile({user_top: user_top});

    }
    //console.log(result_data)
    return JSON.parse(result_data)
}

