import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    theme: string;

    colors: {
      background: string;

      weather_info_background: string;
      weather_Info_text: string;

      input_background: string;

      text: string;
    };
  }
}
