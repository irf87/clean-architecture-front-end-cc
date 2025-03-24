import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      brand: {
        primary: string;
        secondary: string;
        accent: string;
      };
      background: {
        light: string;
        subtle: string;
        board: string;
        hover: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        inverse: string;
      };
      border: {
        default: string;
        focus: string;
        hover: string;
      };
      status: {
        success: {
          DEFAULT: string;
          light: string;
          dark: string;
        };
        warning: {
          DEFAULT: string;
          light: string;
          dark: string;
        };
        error: {
          DEFAULT: string;
          light: string;
          dark: string;
        };
        info: {
          DEFAULT: string;
          light: string;
          dark: string;
        };
      };
      labels: {
        green: string;
        yellow: string;
        orange: string;
        red: string;
        purple: string;
        blue: string;
      };
      surface: {
        DEFAULT: string;
        raised: string;
        sunken: string;
        overlay: string;
      };
      interaction: {
        hover: {
          primary: string;
          secondary: string;
        };
        active: {
          primary: string;
          secondary: string;
        };
        focus: {
          outline: string;
        };
      };
    };
    shadows: {
      card: string;
      raised: string;
      modal: string;
    };
  }
} 