import React from "react";

export const defaultValue = {
  locale: 'en',
  // setLocale: () => {}
}

export default React.createContext(defaultValue);