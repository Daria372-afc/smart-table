  export function initSearching(searchField) {

    return (query, state, action) => {
        // теперь поиск работает через сервер и формирует query.search

        return state[searchField]
            ? Object.assign({}, query, {
                search: state[searchField] // передаём строку поиска на сервер
            })
            : query; // если строка пустая — возвращаем query без изменений
    };
}








