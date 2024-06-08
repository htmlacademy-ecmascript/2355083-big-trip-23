import * as elems from '../core/dom_elems.js';
import * as rFunc from '../core/rander_funcs.js';

// obj 'data' for lead elems and paste content.
//data.flag for make editor if this need,
//can has values: 'newPoint' or 'editPoint'.

export const presenter = function () {
  elems.newDotBtn.addEventListener('click', rFunc.newDotRender);

  rFunc.evtDotsRander();
};
