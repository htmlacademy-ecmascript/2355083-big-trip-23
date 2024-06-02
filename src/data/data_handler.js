import * as server from './data_server.js';

class Common {

  getDate(date) {
    const d = new Date(date);
    return `${this.getDubleDigit(d.getDate()) }/${
      this.getDubleDigit(d.getMonth() + 1) }/${
      this.getDubleDigit((d.getFullYear() - 2000)) } ${
      this.getDubleDigit(d.getHours()) }:${
      this.getDubleDigit(d.getMinutes())}`;
  }

  getDest(idKey) {
    return server.destList.find((item)=>item.id === idKey);
  }

  getOffers(arrKeys,type) {
    const obj = server.offersList.find((item) => item.type === type);
    return arrKeys.map((id) => obj.offers.find((item)=>item.id === id));
  }

  getCurrency() {
    const value = 'euro';
    const euro = {
      unicode: '€&nbsp;',
      curValDoll: 0.92,
    };
    const dollar = {
      unicode: '&#36;',
      curValDoll: 1,
    };

    switch (value) {
      case 'euro':return euro.unicode;
      case 'dollar':return dollar.unicode;
    }
  }


  getDubleDigit(digit) {
    if (digit < 10) {
      return `0${digit}`;
    }
    return digit;
  }

  calcilateDuration(data) {
    const allMinutes = (new Date(data.date_to) - new Date(data.date_from)) / 1000 / 60;
    let minutes = allMinutes % 1440 % 60;
    let hours = Math.floor(allMinutes % 1440 / 60);
    let days = Math.floor(allMinutes / 1440);

    if (days === 0){
      days = '';
    } else {
      days = `${this.getDubleDigit(days)}D `;
    }
    if (days === '' && hours === 0) {
      hours = '';
    } else {
      hours = `${this.getDubleDigit(hours)}H `;
    }
    minutes = `${this.getDubleDigit(minutes)}M`;

    return days + hours + minutes;
  }

  getReadyMonth(data) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec',];
    return months[new Date(data.date_from).getMonth()].toUpperCase();
  }

  getRadyType(type) {
    return type[0].toUpperCase() + type.slice(1);
  }

}

class DataHandler extends Common{
  constructor() {
    super();

    return server.dotList.map((item) => {
      item.destination = this.getDest(item.destination);
      item.offers = this.getOffers(item.offers,item.type);
      return item;
    });
  }
}

class DotMarkupData extends Common{
  constructor(data) {
    super();

    return {
      id:data.id,
      date: {
        datetime:data.date_from.slice(0, 10),
        month: this.getReadyMonth(data),
        date: new Date(data.date_from).getDate(),
      },
      icon: {
        src: `img/icons/${data.type}.png`,
        alt: `${data.type} icon`,
      },
      title: `${this.getRadyType(data.type)} ${ data.destination.name}` ,
      transport: {
        type: this.getRadyType(data.type),

      },
      dest: {
        city: data.destination.name,
        description:data.destination.description,
      },

      start: {
        datetime: data.date_from.slice(0,16),
        text: data.date_from.slice(11,16),
      },
      finish: {
        datetime: data.date_to.slice(0,16),
        text: data.date_to.slice(11,16),
      },
      duration: this.calcilateDuration(data),
      currency: this.getCurrency(data),
      price: data.offers.reduce(
        (c, i) => c + i.price, data.base_price),
      offers:data.offers,

      favBtnClassList: data.is_favorite ?
        'event__favorite-btn event__favorite-btn--active' :
        'event__favorite-btn',

      type: data.type,
    };
  }


}


//ready data
// {
//   "id": "d869ab1d-0210-47de-b562-090b69459f02",
//   "base_price": 1773,
//   "date_from": "2024-05-24T03:18:08.628Z",
//   "date_to": "2024-05-25T13:34:08.628Z",
//   "destination":{
//     "id": "9049fd7b-3b0d-4aff-97ce-ad93bca12f3d",
//     "description": "Hiroshima - a perfect place to stay with a family",
//     "name": "Hiroshima",
//     "pictures": [
//       {
//         "src": "https://23.objects.htmlacademy.pro/static/destinations/16.jpg",
//         "description": "Hiroshima a true asian pearl"
//       }
//     ]
//   },
//   "is_favorite": true,
//   "offers": [
//     {
//       "id": "2933ee33-5a10-4a9a-9126-004bcca89af1",
//       "title": "Upgrade to a business class",
//       "price": 168
//     },
//   ],
//   "type": "train"
// },

class EditMarkupData extends Common {
  constructor(data) {
    super();
    return {
      header : {
        icon: {
          src: `img/icons/${data.type}.png`,
          alt: `Event ${data.type} icon`,
        },

        evtTypelist: [
          {
            inId: 'event-type-taxi-1',
            inValue: 'taxi',
            labFor: 'event-type-taxi-1',
            labClassLst: 'event__type-label  event__type-label--taxi',
            labTextCont: 'Taxi',
          },
          {
            inId: 'event-type-bus-1',
            inValue: 'bus',
            labFor: 'event-type-bus-1',
            labClassLst: 'event__type-label  event__type-label--bus',
            labTextCont: 'Bus',
          },
          {
            inId: 'event-type-train-1',
            inValue: 'train',
            labFor: 'event-type-train-1',
            labClassLst: 'event__type-label  event__type-label--train',
            labTextCont: 'Train',
          },
          {
            inId: 'event-type-ship-1',
            inValue: 'ship',
            labFor: 'event-type-ship-1',
            labClassLst: 'event__type-label  event__type-label--ship',
            labTextCont: 'Ship',
          },
          {
            inId: 'event-type-drive-1',
            inValue: 'drive',
            labFor: 'event-type-drive-1',
            labClassLst: 'event__type-label  event__type-label--drive',
            labTextCont: 'Drive',
          },
          {
            inId: 'event-type-flight-1',
            inValue: 'flight',
            labFor: 'event-type-flight-1',
            labClassLst: 'event__type-label  event__type-label--flight',
            labTextCont: 'Flight',
          },
          {
            inId: 'event-type-check-in-1',
            inValue: 'check-in',
            labFor: 'event-type-check-in-1',
            labClassLst: 'event__type-label  event__type-label--check-in',
            labTextCont: 'Check-in',
          },
          {
            inId: 'event-type-sightseeing-1',
            inValue: 'sightseeing',
            labFor: 'event-type-sightseeing-1',
            labClassLst: 'event__type-label  event__type-label--sightseeing',
            labTextCont: 'Sightseeing',
          },
          {
            inId: 'event-type-restaurant-1',
            inValue: 'restaurant',
            labFor: 'event-type-restaurant-1',
            labClassLst: 'event__type-label  event__type-label--restaurant',
            labTextCont: 'Restaurant',
          },

        ],

        evtFieldGroupDest: {
          labTextCont: this.getRadyType(data.type),
          inValue: data.destination.name,
          datLstOptions: server.destList.map((item) =>({ value: item.name }))
        },

        evtFieldGroupTime: {
          startTime:this.getDate(data.date_from),
          endTime: this.getDate(data.date_to),
        },

        evtFieldGroupPrice: data.offers.reduce(
          (c, i) => c + i.price, data.base_price),
      },
      offers: data.offers,
      dests: data.destination.description,
      pictures: data.destination.pictures,
      currency: this.getCurrency(data),
    };
  }
}

class AddDotMarkupData {
  constructor() {

    return {
      header : {
        icon: {
          src: 'img/logo.png',
          alt: 'logo icon',
        },

        evtTypelist: [
          {
            inId: 'event-type-taxi-1',
            inValue: 'taxi',
            labFor: 'event-type-taxi-1',
            labClassLst: 'event__type-label  event__type-label--taxi',
            labTextCont: 'Taxi',
          },
          {
            inId: 'event-type-bus-1',
            inValue: 'bus',
            labFor: 'event-type-bus-1',
            labClassLst: 'event__type-label  event__type-label--bus',
            labTextCont: 'Bus',
          },
          {
            inId: 'event-type-train-1',
            inValue: 'train',
            labFor: 'event-type-train-1',
            labClassLst: 'event__type-label  event__type-label--train',
            labTextCont: 'Train',
          },
          {
            inId: 'event-type-ship-1',
            inValue: 'ship',
            labFor: 'event-type-ship-1',
            labClassLst: 'event__type-label  event__type-label--ship',
            labTextCont: 'Ship',
          },
          {
            inId: 'event-type-drive-1',
            inValue: 'drive',
            labFor: 'event-type-drive-1',
            labClassLst: 'event__type-label  event__type-label--drive',
            labTextCont: 'Drive',
          },
          {
            inId: 'event-type-flight-1',
            inValue: 'flight',
            labFor: 'event-type-flight-1',
            labClassLst: 'event__type-label  event__type-label--flight',
            labTextCont: 'Flight',
          },
          {
            inId: 'event-type-check-in-1',
            inValue: 'check-in',
            labFor: 'event-type-check-in-1',
            labClassLst: 'event__type-label  event__type-label--check-in',
            labTextCont: 'Check-in',
          },
          {
            inId: 'event-type-sightseeing-1',
            inValue: 'sightseeing',
            labFor: 'event-type-sightseeing-1',
            labClassLst: 'event__type-label  event__type-label--sightseeing',
            labTextCont: 'Sightseeing',
          },
          {
            inId: 'event-type-restaurant-1',
            inValue: 'restaurant',
            labFor: 'event-type-restaurant-1',
            labClassLst: 'event__type-label  event__type-label--restaurant',
            labTextCont: 'Restaurant',
          },

        ],

        evtFieldGroupDest: {
          labTextCont: 'Go',
          inValue: '',
          datLstOptions: server.destList.map((item) =>({ value: item.name }))
        },

        evtFieldGroupTime: {
          startTime:'start',
          endTime: 'finish',
        },

        evtFieldGroupPrice: 'total',
      },
      offers: [],
      dests: '',
      pictures: [],
      currency: '',
    };
  }
}

const allData = new DataHandler();

export const getReadyData = () => [
  allData.map(((item) => new DotMarkupData(item))),
  allData.map(((item) => new EditMarkupData(item))),
  new AddDotMarkupData(),
];

