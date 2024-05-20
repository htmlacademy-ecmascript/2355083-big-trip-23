import { eventDotTemplate } from './event_dot_temp.js';
import { editorCommonTemplate } from './editor/ed_common_temp.js';

export const eventItemTemplate = (data) => (`
       <li class="trip-events__item">
          ${data.flag === undefined ?
    eventDotTemplate() : editorCommonTemplate(data)}
            </li>`);
