import { bayterekIcon, museumIcon } from "./mapIcons.js";

export const basicPoints = [
  {
    id: 1,
    title: "Национальный музей РК",
    coords: [51.11823, 71.46938],
    icon: museumIcon,
    subtitle: "Музей",
    imgs: [
      "https://www.matritca.kz/uploads/posts/2022-07/1657948385_jxbmwo0quvkvqlqngqbd8jagyz6zmznlu7q8ar6q.jpg",
    ],
    color: "red",
    workTimes: {
      startTime: "10:00",
      stopTime: "23:00",
    },
    description:
      "Қазақстан Республикасының Ұлттық музейі — Астана қаласында Тәуелсіздік алаңында орналасқан 2014 жылы 2 шілдеде ашылған мұражай. «Мәдени мұра» мемлекеттік бағдарламасы шеңберінде табылған көптеген құнды дүниелер Қазақстан Республикасы Ұлттық музейінің баға жетпес қорын құрайды.",
  },
  {
    id: 2,
    title: "Байтерек",
    coords: [51.12828, 71.43052],
    icon: bayterekIcon,
    subtitle: "Достопримечательность",
    imgs: ["https://www.advantour.com/img/kazakhstan/astana/baiterek.jpg"],
    color: "green",
    workTimes: {
      startTime: "10:00",
      stopTime: "22:00",
    },
    description:
      "Бәйтерек – Астана қаласындағы сәулет құрылыс кешені, сәулет өнерінің бірегей туындысы. Елорданың ең көрнекті ғимараттарының бірі.",
  },
];
