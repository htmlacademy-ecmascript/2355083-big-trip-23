import { createElement, render, RenderPosition } from '../render.js';
import * as elems from './dom_elems.js';
import { tripInfoTemplate } from '../view/trip_info_temp.js';
import { filtresTemplate } from '../view/filtres_temp.js';
import { sortTemplate } from '../view/sort_temp.js';
import { eventDotTemplate } from '../view/event_dot_temp.js';
import { editorCommonTemplate } from '../view/editor/ed_common_temp.js';
import { getReadyData } from '../data/data_handler.js';

const evtList = createElement('<ul class="trip-events__list"></ul>');//ul
const [dots, edit, addDot] = getReadyData();

//static render
render(createElement(tripInfoTemplate()), elems.tripMain,RenderPosition.AFTERBEGIN);//info
render(createElement(filtresTemplate()), elems.filters);//filtres
render(createElement(sortTemplate()), elems.evt);//sort
render(evtList, elems.evt);//ul

function clsOtherEditors() {
  const btn = document.querySelector('.event__reset-btn');
  if(btn !== null){
    btn.click();
  }
}

function clsAtEscape(cbFunc) {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      cbFunc();
    }
  });
}

function newDotRemove(evt,resetBtn) {
  evt.target.disabled = false;
  resetBtn.closest('form').remove();
}

function editorRemove(li,i) {
  li.innerHTML = '';
  render(createElement(eventDotTemplate(dots[i])), li);
  const editDotBtnEl = li.querySelector('.event__rollup-btn');
  editDotBtnEl.addEventListener('click', (e) => {
    editorRender(e, i);
  });
}

export function newDotRender(evt) {
  evt.preventDefault();

  clsOtherEditors();
  evt.target.disabled = true;
  render(createElement(editorCommonTemplate(addDot,evt)), evtList, RenderPosition.AFTERBEGIN);

  const resetBtn = evtList.childNodes[0].querySelector('.event__reset-btn');
  const rolupBtnEl = evtList.childNodes[0].querySelector('.event__rollup-btn');
  clsAtEscape(()=>newDotRemove(evt,resetBtn));
  resetBtn.addEventListener('click', () => newDotRemove(evt, resetBtn));
  rolupBtnEl.addEventListener('click',()=>newDotRemove(evt,resetBtn));
}

export function editorRender(e, i) {
  e.preventDefault();

  clsOtherEditors();

  const li = e.target.closest('li');
  li.innerHTML = '';
  render(createElement(editorCommonTemplate(edit[i],e)), li);

  const editDotBtnEl = li.querySelector('.event__rollup-btn');
  const resetBtn = li.querySelector('.event__reset-btn');
  clsAtEscape(()=>editorRemove(li,i));
  editDotBtnEl.addEventListener('click', ()=>editorRemove(li,i));
  resetBtn.addEventListener('click', ()=>editorRemove(li,i));

}

export function evtDotsRander() {
  for (let i = 0; i < dots.length; i++) {
    render(createElement(eventDotTemplate(dots[i])), evtList);
    evtList.lastChild.children[0].querySelector('.event__rollup-btn')
      .addEventListener('click', (e) => {
        editorRender(e, i);
      });
  }
}
