export type Theme = {
    name: string;
    id: string;
    styles: {
      pageBackground: string;
      containerBackground: string;
      numberDisplay: string;
      drawnNumber: string;
      undrawnNumber: string;
      cardBackground: string;
      textColor: string;
    };
  };
  
  export const themes: Theme[] = [
    {
      name: "Default",
      id: "default",
      styles: {
        pageBackground: "bg-white",
        containerBackground: "bg-background",
        numberDisplay: "bg-card",
        drawnNumber: "bg-blue-500 text-white",
        undrawnNumber: "bg-white text-gray-700",
        cardBackground: "bg-card",
        textColor: "text-gray-500"
      }
    },
    {
      name: "Christmas",
      id: "christmas",
      styles: {
        pageBackground: "bg-[#022b14]",
        containerBackground: "bg-[#022b14]",
        numberDisplay: "bg-[#c41e3a]",
        drawnNumber: "bg-[#c41e3a] text-[#f4f0ec]",
        undrawnNumber: "bg-[#034a21] text-[#f4f0ec] border-[#f4f0ec]",
        cardBackground: "bg-[#034a21] border-[#f4f0ec]",
        textColor: "text-[#f4f0ec]"
      }
    }
  ];