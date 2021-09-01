export interface IWeather {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };

  sys: {
    country: string;
  };
  name: string;

  weather: [
    {
      main: string;
      description: string;
      icon: string;
    },
  ];
}
