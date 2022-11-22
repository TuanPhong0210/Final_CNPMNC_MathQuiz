import { ReactNode, useState, createContext } from 'react';

type ThemeMode = 'light' | 'dark';

interface SettingsContextStates {
  themeMode: ThemeMode;
}
interface SettingsContextMethods {
  onChangeTheme: (currentMode: ThemeMode) => void;
}

interface SettingsProviderProps {
  children: ReactNode;
}

const initialState: SettingsContextStates & SettingsContextMethods = {
  themeMode: 'light',
  onChangeTheme: () => {},
};
const SettingsContext = createContext<SettingsContextStates & SettingsContextMethods>(initialState);

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<SettingsContextStates>({
    themeMode: 'light',
  });
  const onChangeTheme = async (currentMode: ThemeMode): Promise<void> => {
    setSettings({
      ...settings,
      themeMode: currentMode,
    });
  };
  return (
    <SettingsContext.Provider value={{ ...settings, onChangeTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, SettingsContext };
