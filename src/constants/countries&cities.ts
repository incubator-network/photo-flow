export const countriesList = [
  {
    title: 'Belarus',
  },
  {
    title: 'Poland',
  },
  {
    title: 'Russia',
  },
  {
    title: 'UK',
  },
]

export const cityList = {
  Belarus: [
    {
      title: 'Minsk',
    },
    {
      title: 'Gomel',
    },
    {
      title: 'Mogilev',
    },
    {
      title: 'Vitebsk',
    },
    {
      title: 'Brest',
    },
  ],

  Poland: [
    {
      title: 'Warsaw',
    },
    {
      title: 'Kraków',
    },
    {
      title: 'Wrocław',
    },
    {
      title: 'Gdańsk',
    },
    {
      title: 'Poznań',
    },
  ],

  Russia: [
    {
      title: 'Moscow',
    },
    {
      title: 'Saint Petersburg',
    },
    {
      title: 'Novosibirsk',
    },
    {
      title: 'Yekaterinburg',
    },
    {
      title: 'Kazan',
    },
  ],
  UK: [
    {
      title: 'London',
    },
    {
      title: 'Manchester',
    },
    {
      title: 'Birmingham',
    },
    {
      title: 'Liverpool',
    },
    {
      title: 'Edinburgh',
    },
  ],
}

export type Country = keyof typeof cityList
