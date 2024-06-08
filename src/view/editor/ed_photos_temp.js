//accept argument data for then markup (data)

export const editorPhotosTemplate = (data) => (`
    <div class="event__photos-container">
      <div class="event__photos-tape">

        ${data.pictures.map((item) => (`
          <img class="event__photo"
            src="${item.src}"
            alt="${item.description}">
          </img>`)).join('')}

      </div>
    </div>
    `);

