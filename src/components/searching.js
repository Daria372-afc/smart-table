// @todo: #5.1 — настроить компаратор
// компаратор больше не используется, импорт удалён
// import {rules, createComparison} from "../lib/compare.js";

  export function initSearching(searchField) {

    // @todo: #5.1 — настроить компаратор
    // компаратор больше не нужен, поэтому эту часть удаляем полностью

    return (query, state, action) => {
        // @todo: #5.2 — применить компаратор
        // теперь поиск работает через сервер и формирует query.search

        return state[searchField]
            ? Object.assign({}, query, {
                search: state[searchField] // передаём строку поиска на сервер
            })
            : query; // если строка пустая — возвращаем query без изменений
    };
}








