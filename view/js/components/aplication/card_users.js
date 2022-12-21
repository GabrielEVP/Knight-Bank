import { user_list } from "../../class/user/user_list.js";
import { fetch_get_Data } from "../../server/server.js";
import { controller_url_user_List } from "../../class/user/dictionary_user.js"

const card_User = async () => {
    var list_user = new user_list();
    const result = await fetch_get_Data(controller_url_user_List('all'));
    list_user.cast_array_to_User(Array.from(result));

    var card = '';
    var color = '';
    var visualizacion = '';

    for (const user of list_user.user_list) {
        if (user.admin == 1 && user.login_tries > 0) {
            color = 'admin_card';
        } else if (user.admin == 0 && user.login_tries > 0) {
            color = 'user_card';
        } else {
            color = 'unban_card';
        }

        if (user.login_tries > 0) {
            visualizacion = /*html*/`<button onclick="show_Crud('.banear', ${user.id_user})" class="button_secondary ban_button"><i class="fa-solid fa-ban"></i></button>`;
        } else {
            visualizacion = /*html*/`<button onclick="show_Crud('.desban', ${user.id_user})" class="button_secondary desban_button"><i class="fa-solid fa-check"></i></button>`;
        }

        card += (
        /*html*/`  
            <div class="container_card">
                <div class="card">
                    <div class="additional ${color}">
                        <div class="user-card">
                            <div class="level center">${user.NIF}</div>
                            <img src="${user.foto}" alt="logo_usuario">
                            <button onclick="show_Update(${user.id_user})" class="button_secondary update_button"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button onclick="show_Crud('.borrar', ${user.id_user})" class="button_secondary delete_button"><i class="fa-solid fa-trash"></i></button>
                            ${visualizacion} 
                        </div>

                        <div class="more-info">
                            <h1>Cuentas del usuario</h1>
                            <div class="stats"><div>

                            <div class="title">Nº Cuentas</div>
                            <i class="fa-solid fa-vault"></i>
                            <div class="value">2</div>
                        </div>

                        <div>
                            <div class="title">Balance</div>
                            <i class="fa-solid fa-piggy-bank"></i>
                            <div class="value">27 $</div>
                        </div>

                        <div>
                            <div class="title">Movimiento</div>
                            <i class="fa-solid fa-money-bill-transfer"></i>
                            <div class="value">123</div>
                        </div>

                        <div>
                            <div class="title">Ult. movimiento</div>
                            <i class="fa-regular fa-calendar-days"></i>
                            <div class="value">2/4/52</div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="general">
                <h1>Datos del usuario</h1>
                <ul>
                    <li>${user.name}</li>
                    <li>${user.surname}</li>
                    <li>${user.gmail}</li>
                </ul>
                <span class="more">pon el curso encima para mas informacion</span></div></div>
            </div>
        `
        ) 
    }
    return card;
}

export { card_User } 
