import { useState, useEffect } from 'react';

export function useAppLogic() {
  const [dataTheme, setDataTheme] = useState(() => {
    const storedTheme = localStorage.getItem("dataTheme");
    if (!storedTheme) {
      localStorage.setItem("dataTheme", "light");
      return "light";
    }
    return storedTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dataTheme);
    localStorage.setItem("dataTheme", dataTheme);
  }, [dataTheme]);

  const color = dataTheme === 'light' ? 'black' : 'white';

  const [notes, setNotes] = useState(() => {
    let initialNotes = [];
    for (let i = 0; i < 4; i++) {
      initialNotes.push({ 
        title: `Untitled ${i}`, 
        id: i,
        description: "There's never enough time to do all the nothing you want",
      });
    }
    return initialNotes;
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return {
    dataTheme,
    setDataTheme,
    color,
    notes,
    setNotes,
    sidebarOpen,
    setSidebarOpen,
  };
}
