import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
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

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action?.name === "clear") {
            const parent = action.closest(".filter__item");
            const input = parent.querySelector("input, select");
            if (input) {
                input.value = "";
                state[action.dataset.field] = "";
            }
        }


        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter((row) => compare(row, state));
    };
}