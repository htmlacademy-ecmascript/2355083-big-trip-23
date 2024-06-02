//accept argument data for then markup (data)
//${data. }

export const editorHeaderTemplate = (data) =>(`
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="${data.header.icon.src}" alt="${data.header.icon.alt}">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

            ${data.header.evtTypelist.map((item) => (`

              <div class="event__type-item">
                <input id="${item.inId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.inValue}">
                <label class="${item.labClassLst}" for="${item.labFor}">${item.labTextCont}</label>
              </div>

            `)).join('')}

        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${data.header.evtFieldGroupDest.labTextCont}
      </label>
      <input class="event__input  event__input--destination"
       id="event-destination-1" type="text" name="event-destination"
       value="${data.header.evtFieldGroupDest.inValue}"
       list="destination-list-1">
      <datalist id="destination-list-1">

        ${data.header.evtFieldGroupDest.datLstOptions.map((item) => (`
          <option value="${item.value}"></option>
        `)).join('')}

      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">

      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1"
       type="text" name="event-start-time"
       value="${data.header.evtFieldGroupTime.startTime}">
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1"
       type="text" name="event-end-time"
       value="${data.header.evtFieldGroupTime.endTime}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price"
       id="event-price-1" type="text" name="event-price"
       value="${data.header.evtFieldGroupPrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
`);
