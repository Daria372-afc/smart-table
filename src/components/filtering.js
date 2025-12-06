// compare.js больше не нужен, удаляем импорт
// import {createComparison, defaultRules} from "../lib/compare.js";

// const compare = createComparison(defaultRules);

  export function initFiltering(elements) {

    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {

        if (elements.searchBySeller && indexes.sellers) {
            elements.searchBySeller.append(
                ...Object.values(indexes.sellers).map((name) => {
                    const option = document.createElement("option");
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            );
        }

        if (elements.searchByCustomer && indexes.customers) {
            elements.searchByCustomer.append(
                ...Object.values(indexes.customers).map((name) => {
                    const option = document.createElement("option");
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            );
        }
    };


    const applyFiltering = (query, state, action) => { 

        // @todo: #4.2 — обработать очистку поля
        if (action?.name === "clear") {
            const parent = action.closest(".filter__item");
            const input = parent.querySelector("input, select");

            if (input) {
                input.value = "";
                state[input.name] = "";
            }
        }

        // @todo: #4.5 — отфильтровать данные
        const filter = {};

        Object.keys(elements).forEach((key) => {
            const el = elements[key];

            if (el && ['INPUT', 'SELECT'].includes(el.tagName) && el.value) {
                filter[el.name] = el.value;
            }
        });

        // Если фильтр пуст, возвращаем query без изменений
        if (!Object.keys(filter).length) {
            return query;
        }

        // Иначе добавляем его в query
        return Object.assign({}, query, { filter });
    };


    // Возвращаем две функции
    return {
        updateIndexes,
        applyFiltering
    };
}













