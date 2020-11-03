const ordenarVentas = list => {
  let newLista = [];
  const sorted = list
    .map(v => parseInt(v.fechaLarga.match(/[0-9]{1,2}/)[0], 10))
    .sort((a, b) => a - b)
    .reverse();
  sorted.forEach(val =>
    list.forEach(v =>
      v.fechaLarga.match(/[0-9]{1,2}/)[0] == val
        ? (newLista = newLista.concat(v))
        : null,
    ),
  );
  return newLista;
};

export {ordenarVentas};
