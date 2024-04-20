import { bayterekIcon, expoIcon, museumIcon } from "./mapIcons.js";

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
    categories: ["Природа", "Активный отдых"],
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
    categories: ["Природа", "Активный отдых", "Самостоятельно"],
    description:
      "Бәйтерек – Астана қаласындағы сәулет құрылыс кешені, сәулет өнерінің бірегей туындысы. Елорданың ең көрнекті ғимараттарының бірі.",
  },
  {
    id: 3,
    title: "Нұр Әлем",
    coords: [51.08935, 71.416],
    icon: expoIcon,
    subtitle: "Достопримечательность",
    imgs: [
      "https://www.wernersobek.com/wp-content/uploads/resized/2021/05/EXPO-2017-Astana-1920x0-c-default.jpg",
    ],
    color: "blue",
    workTimes: {
      startTime: "10:00",
      stopTime: "21:00",
    },
    categories: ["Природа", "Активный отдых", "Самостоятельно"],
    description:
      '"Нұр Әлем" - Астана ЭКСПО-2017 Көрмесінің архитектуралық символына айналған Көрме кешенінің орталық нысаны. Бұл диаметрі 80 метр, биіктігі 100 метр құрайтын әлемдегі ең үлкен сфералық ғимарат. Келушілер Қазақстанның тарихы, мәдениеті, салт-дәстүрі, көрікті жерлері, сонымен қатар елдің жетістіктерімен таныса алатындай, ғимараттың 1 қабатында Қазақстанның павильоны орналасқан.',
  },
];
