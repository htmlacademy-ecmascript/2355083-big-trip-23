//accept argument data for then markup (data)

export const editorOffersTemplate = (data) => (`
<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">

        ${data.offers.map((item) => (`

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
             id="${item.id}"
             type="checkbox" name="${item.id}" >
            <label class="event__offer-label" for="${item.id}">
              <span class="event__offer-title">${item.title}</span>
              +${data.currency}
              <span class="event__offer-price">${item.price}</span>
            </label>
          </div>

        `)).join('')}

      </div>
    </section>
    `);


