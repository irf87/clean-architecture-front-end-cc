export const colors = {
  // Trello's primary brand colors
  brand: {
    primary: '#0079BF',    // Trello Blue
    secondary: '#70B500',  // Trello Green
    accent: '#FF9F1A',     // Trello Orange
  },

  // Background colors used in boards and cards
  background: {
    light: '#FFFFFF',      // White background
    subtle: '#FAFBFC',     // Subtle gray background
    board: '#F1F2F4',      // Board background
    hover: '#EBECF0',      // Hover state
  },

  // Text colors
  text: {
    primary: '#172B4D',    // Dark blue-gray (main text)
    secondary: '#5E6C84',  // Medium gray (secondary text)
    disabled: '#A5ADBA',   // Light gray (disabled text)
    inverse: '#FFFFFF',    // White text (for dark backgrounds)
  },

  // Border colors
  border: {
    default: '#DFE1E6',    // Default border color
    focus: '#4C9AFF',      // Focus state border
    hover: '#C1C7D0',      // Hover state border
  },

  // Status and feedback colors
  status: {
    success: {
      DEFAULT: '#61BD4F',  // Green success
      light: '#E4F0E1',
      dark: '#519839',
    },
    warning: {
      DEFAULT: '#F2D600',  // Yellow warning
      light: '#FCF3D9',
      dark: '#D9B51C',
    },
    error: {
      DEFAULT: '#EB5A46',  // Red error
      light: '#FBEDEB',
      dark: '#C04132',
    },
    info: {
      DEFAULT: '#0079BF',  // Blue info
      light: '#E4F0F6',
      dark: '#055A8C',
    },
  },

  // Label colors used in cards
  labels: {
    green: '#61BD4F',
    yellow: '#F2D600',
    orange: '#FF9F1A',
    red: '#EB5A46',
    purple: '#C377E0',
    blue: '#0079BF',
  },

  // Surface colors for cards, modals, etc.
  surface: {
    DEFAULT: '#FFFFFF',
    raised: '#FFFFFF',
    sunken: '#FAFBFC',
    overlay: 'rgba(23, 43, 77, 0.5)', // Modal overlay
  },

  // Interaction states
  interaction: {
    hover: {
      primary: '#026AA7',   // Primary button hover
      secondary: '#5AAC44', // Secondary button hover
    },
    active: {
      primary: '#055A8C',   // Primary button active
      secondary: '#49852E', // Secondary button active
    },
    focus: {
      outline: '#4C9AFF',   // Focus ring color
    },
  },
};

export const shadows = {
  card: '0 1px 0 rgba(9, 30, 66, 0.25)',
  raised: '0 8px 16px -4px rgba(9, 30, 66, 0.25)',
  modal: '0 8px 16px -4px rgba(9, 30, 66, 0.25)',
};

export const spacing = {
  'card-padding': '8px',
  'card-gap': '8px',
  'card-radius': '3px',
  'board-padding': '16px',
  'board-gap': '8px',
};
