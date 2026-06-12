export function formatedValueForDecimal(value: string | null | undefined) {

    console.log(value);
    
    if(!value){
      return
    }

    const turnIntoDecimal = Number.parseFloat(value) /100;

    const formated = turnIntoDecimal.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return formated;
  }