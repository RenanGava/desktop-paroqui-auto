export function formatedValueForDecimal(value: string | null | undefined) {
    if(!value){
      return
    }

    const turnIntoDecimal = Number.parseFloat(value) / 100;

    if (turnIntoDecimal > 0) {
      // setFormatedDizimo(turnIntoDecimal);
      const formated = turnIntoDecimal.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return formated;
    } else {
      return "0";
    }
  }