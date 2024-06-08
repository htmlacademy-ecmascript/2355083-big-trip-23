import { editorHeaderTemplate } from './ed_header_temp.js';
import { editorOffersTemplate } from './ed_offers_temp.js';
import { editorDestTemplate } from './ed_dest_temp.js';
import { editorPhotosTemplate } from './ed_photos_temp.js';

export const editorCommonTemplate = function (data,e) {

  return (`
  <form class="event event--edit" action="#" method="post">
    ${editorHeaderTemplate(data)}
    <section class="event__details">
      ${editorOffersTemplate(data)}
      ${editorDestTemplate(data)}
      ${e.target.classList.contains('trip-main__event-add-btn') &&
      data.pictures.length > 0 ?
      editorPhotosTemplate(data) : ''}
    </section>
  </form>
    `);
};


