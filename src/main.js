import './fonts/ys-display/fonts.css'
import './style.css'

import {data as sourceData} from "./data/dataset_1.js";

import {initData} from "./data.js";
import {processFormData} from "./lib/utils.js";

import {initTable} from "./components/table.js";
// @todo: подключение
import {initPagination} from "./components/pagination.js";
import {initSorting} from "./components/sorting.js";
import {initFiltering} from "./components/filtering.js";
import {initSearching} from "./components/searching.js";


// Исходные данные используемые в render()
const {data, ...indexes} = initData(sourceData);

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */
function collectState() {
    const state = processFormData(new FormData(sampleTable.container));

    const rowsPerPage = parseInt(state.rowsPerPage);
    //добавляем приведение типов
    const page = parseInt(state.page ?? 1);
    //если нет значения страницы - по умолчанию 1

    return {
        ...state,
        rowsPerPage,
        page
    };
}

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
function render(action) {
    let state = collectState(); // состояние полей из таблицы
    let result = [...data]; // копируем для последующего изменения
    // @todo: использование
result = applySearching(result, state, action);
result = applyFiltering(result, state, action);
result = applySorting(result, state, action);
//применяем пагинацию
result = applyPagination(result, state, action);
    sampleTable.render(result);
}

//добавляем настройку таблицы и подключаем модуль пагинации
const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ['filter', 'header', 'search'],
    after: ['pagination']
    // подключаем шаблон пагинации
}, render
);

//инициализация сортировки
const applySorting = initSorting([

    sampleTable.header.elements.sortByDate,
    sampleTable.header.elements.sortByTotal
]);

const applyFiltering = initFiltering(sampleTable.filter.elements, indexes);

const applySearching = initSearching(sampleTable.search.elements.searchField);

// @todo: инициализация
const applyPagination = initPagination(sampleTable.pagination.elements, (el, page, isCurrent) => {
    const input = el.querySelector('input');
    const label = el.querySelector('span');
    input.value = page;
    input.checked = isCurrent;
    label.textContent = page;
    return el;
}
);

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);

render();