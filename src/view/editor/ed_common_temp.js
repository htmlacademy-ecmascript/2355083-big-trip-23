import { editorHeaderTemplate } from './ed_header_temp.js';
import { editorOffersTemplate } from './ed_offers_temp.js';
import { editorDestTemplate } from './ed_dest_temp.js';
import { editorPhotosTemplate } from './ed_photos_temp.js';

export const editorCommonTemplate = function(data) {
  return (`
              <form class="event event--edit" action="#" method="post">
                ${editorHeaderTemplate()}
              <section class="event__details">
                ${editorOffersTemplate()}
                ${editorDestTemplate()}
                ${data.flag === 'newPoint' ?
      editorPhotosTemplate() : ''}
                </section>
              </form>
    `);
};
