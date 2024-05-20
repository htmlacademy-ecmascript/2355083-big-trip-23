import { createElement, render } from '../render.js';
import { filtresTemplate } from '../view/filtres_temp.js';
import { sortTemplate } from '../view/sort_temp.js';
import { eventItemTemplate } from '../view/event_item_temp.js';

//newPoint,editPoint

const data = {};// obj 'data' for lead elems and paste content.
//data.flag for make editor if this need,
//can has values: 'newPoint' or 'editPoint'.
export const presenter = function () {
  const filtersEl = document.querySelector('.trip-controls__filters');
  const eventEl = document.querySelector('.trip-events');

  render(createElement(filtresTemplate(data)), filtersEl);//filtres
  render(createElement(sortTemplate(data)), eventEl);//sort
  const evListEl = createElement('<ul class="trip-events__list"></ul>');//ul
  render(evListEl, eventEl);//ul

  data.flag = 'newPoint';
  render(createElement(eventItemTemplate(data)), evListEl);

  data.flag = 'editPoint';
  render(createElement(eventItemTemplate(data)), evListEl);

  delete data.flag;
  for (let i = 0; i < 3; i++) {
    render(createElement(eventItemTemplate(data)), evListEl);
  }
};


