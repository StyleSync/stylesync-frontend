import nails from '@/modules/landing/landing-image/nails.png';
import hair from '@/modules/landing/landing-image/hair.png';
import finess from '@/modules/landing/landing-image/fitness.png';
import makeup from '@/modules/landing/landing-image/makeup.png';
import barber from '@/modules/landing/landing-image/barber.png';
import cosmetologist from '@/modules/landing/landing-image/cosmo.png';
import epil from '@/modules/landing/landing-image/epil.png';

export const services = [
  {
    title: 'Косметолог',
    services: [
      'Догляд за обличчям:',
      'Антивікові процедури',
      'Корекція недоліків шкіри',
      'Перманентний макіяж',
      'Ін`єкційні процедури',
      'Догляд за тілом',
    ],
    image: cosmetologist,
  },
  {
    title: 'Нігті',
    services: [
      'Манікюр',
      'Педикюр',
      'Нарощування нігтів',
      'Покриття нігтів',
      'Корекція та догляд',
      'Інші послуги',
    ],
    image: nails,
  },
  {
    title: 'Волосся',
    services: [
      'Стрижка та укладання',
      'Фарбування',
      'Лікування та догляд',
      'Нарощування та подовження',
      'Спеціалізовані процедури ',
      'Консультації та рекомендації ',
    ],
    image: hair,
  },
  {
    title: 'Барбер',
    services: [
      'Стрижка волосся',
      'Гоління та догляд за бородою',
      'Догляд за обличчям та волоссям',
      'Стайлінг',
      'Спеціалізовані послуги ',
      'Консультації',
    ],
    image: barber,
  },
  {
    title: 'Макіяж',
    services: [
      'Денний макіяж',
      'Вечірній макіяж',
      'Весільний макіяж',
      'Макіяж для фотосесій',
      'Макіяж для особливих подій',
      'Інші послуги',
    ],
    image: makeup,
  },
  {
    title: 'Фітнес',
    services: [
      'Онлайн тренування та консультації',
      'Індивідуальні тренування',
      'Кардіо-тренування',
      'Спеціальні фітнес-програми',
      'Дієтологічні консультації',
      'Оцінка та моніторинг прогресу',
    ],
    image: finess,
  },

  {
    title: 'Епіляція',
    services: [
      'Воскова епіляція (депіляція)',
      'Шугаринг ',
      'Лазерна епіляція',
      'Фотоепіляція ',
      'Електроепіляція',
      'Інші послуги',
    ],
    image: epil,
  },
];
