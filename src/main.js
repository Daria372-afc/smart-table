import './fonts/ys-display/fonts.css'
import './style.css'

import { initData } from "./data.js";
import { processFormData } from "./lib/utils.js";

import { initTable } from "./components/table.js";
import { initPagination } from "./components/pagination.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
import { initSearching } from "./components/searching.js";

const api = initData();

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */
  function collectState() {
    const state = processFormData(new FormData(sampleTable.container));

    const rowsPerPage = parseInt(state.rowsPerPage);
    const page = parseInt(state.page ?? 1);

    return {
        ...state,
        rowsPerPage,
        page
    };
}

// Настройка таблицы
const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ['filter', 'header', 'search'],
    after: ['pagination']
}, render);

// Инициализация сортировки
const applySorting = initSorting([
    sampleTable.header.elements.sortByDate,
    sampleTable.header.elements.sortByTotal
]);

// Инициализация поиска
  const applySearching = initSearching(sampleTable.search.elements.searchField);

// Инициализация пагинации
const { applyPagination, updatePagination } = initPagination(
    sampleTable.pagination.elements,
    (el, page, isCurrent) => {
        const input = el.querySelector('input');
        const label = el.querySelector('span');
        input.value = page;
        input.checked = isCurrent;
        label.textContent = page;
        return el;
    }
);

// Инициализация фильтрации
  const { applyFiltering, updateIndexes } = initFiltering(
    sampleTable.filter.elements
);

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);

/**
 * Перерисовка состояния таблицы
 * @param {HTMLButtonElement?} action
 */
async function render(action) {
    const state = collectState(); // состояние полей из таблицы
    let query = {}; // объект параметров для запроса


    query = applySearching(query, state, action); // поиск через сервер
    query = applyFiltering(query, state, action);
    query = applySorting(query, state, action);

    query = applyPagination(query, state, action); // формируем параметры пагинации

    const { total, items } = await api.getRecords(query); // получаем данные с сервера

    updatePagination(total, query); // обновляем визуальный компонент пагинации

    sampleTable.render(items); // отображаем записи
}

/**
 * Инициализация приложения
 */
async function init() {
    const indexes = await api.getIndexes(); // получаем данные для фильтров
    updateIndexes(sampleTable.filter.elements, {
    searchBySeller: indexes.sellers,
});

}

init().then(render);




