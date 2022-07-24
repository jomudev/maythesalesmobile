import Firebase from '../../utils/firebase';

async function htmlData(venta) {
  var userData = Firebase.getUserData();
  let html = `
    <style>
      .nofactura {
        text-align: right;
      }

      thead {
        background-color: rgba(20, 100, 256, 0.2);
      }

      .list td {
        font-size: 12px; 
        text-align: center              
      }

      .list .name {
        text-align: left;
      }

      .total {
        align-text: right;
        align-items: flex-end;
        justify-content: flex-end;
      }

      .totalTd {
        background-color: rgba(20, 100, 256, 0.2);
        font-weight: bolder;
      }

      .mainTable {
        width: 100%;
      }

    </style>
    <div class="nofactura">No. Factura: ${venta.formattedDate('dmyhms')}</div>
    <p>
    ${
      userData.negocio
        ? `<br/>Negocio: ${userData.negocio}`
        : ''
    }
    ${
      userData.displayName
        ? `<br/>Propietario: ${userData.displayName}`
        : ''
    }
    ${
      userData.email
        ? `<br/>Correo electrónico: ${userData.email}`
        : ''
    }
    ${
      userData.telefono
        ? `<br/>Número telefónico: ${userData.telefono}`
        : ''
    }
    </p>
    <h3>fecha: ${venta.formattedDate('PPpp')} - ${venta.formattedDate('P')}</h3>
    ${
      venta.cliente
        ? `
      <table>
        <caption>Facturar a:</caption>
        <tr><td>${venta.cliente.nombre ? venta.cliente.nombre : null}</td></tr>
        ${
          venta.cliente.email
            ? `<tr><td>correo: ${venta.cliente.email}</td></tr>`
            : null
        }
        ${
          venta.cliente.telefono
            ? `<tr><td>cel: ${venta.cliente.telefono}</td></tr>`
            : null
        }
      </table>`
        : ''
    }`;

  html += '<table class="mainTable list">';
  html +=
    '<thead><tr><th colspan="5">PRODUCTOS</th></tr><tr><th>CODIGO</th><th>DESCRIPCION</th><th>CANTIDAD</th><th>COSTO POR UNIDAD</th><th>TOTAL</th></tr></thead><tbody>';

  venta.productos.forEach(function (producto) {
    html += `
        <tr>
        <td>${
          producto.barcode ? producto.barcode : producto.id
        }</td>
          <td class="name">${producto.nombre.toLocaleUpperCase()}${
      producto.descripcion ? ', ' + producto.marca : ''
    }</td>
          <td>${producto.cantidad}</td>
          <td>${producto.getPrecioVenta()}</td>
          <td>${producto.getTotal()}</td>
        </tr>`;
  });

  if (venta.productos.length && venta.servicios.length) {
    html += `<tr>
                  <td colspan="3"></td>
                  <td>SUBTOTAL PRODUCTOS</td>
                  <td>${venta.getTotalProductos()}}</td>
              </tr>`;
  }

  html += venta.servicios.length
    ? `<tr>
                <th colspan="5">SERVICIOS</th>
            </tr>`
    : '';

  venta.servicios.forEach(function (servicio) {
    html += `
        <tr>
        <td>${
          servicio.barcode ? servicio.barcode : servicio.id
        }</td>
            <td class="name">${servicio.nombre.toLocaleUpperCase()}${
      servicio.descripcion ? ', ' + servicio.marca : ''
    }</td>
            <td>${servicio.cantidad}</td>
            <td>${servicio.getPrecioVenta()}</td>
            <td>${servicio.precioVenta * servicio.cantidad}</td>
        </tr>`;
  });

  html += venta.servicios.length
    ? `<tr>
  <td colspan="3"></td>
  <td>SUBTOTAL SERVICIOS</td>
  <td>${venta.getTotalServicios()}</td>
</tr>`
    : '';

  html += `<tr class="totalTd"><td colspan="3"></td><td>TOTAL</td><td>${venta.getTotal()}</td></tr>`;

  html += '</tbody>';
  return html;
}

export default htmlData;
