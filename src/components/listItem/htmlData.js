import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import {moneyFormat, getTotal} from '../mainFunctions';

function htmlData(venta, userData) {
  const saleDate = new Date(venta.timestamp.seconds * 1000);
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
    <div class="nofactura">No. Factura: ${format(saleDate, 'dmyhms')}</div>
    ${userData.negocio ? `<h1>${userData.negocio}</h1>` : ''}
    ${userData.displayName ? `<h2>${user.displayName}</h2>` : ''}

    <h3>fecha: ${format(saleDate, 'PPpp', {locale: es})} - ${format(
    saleDate,
    'P',
  )}</h3>
  ${
    venta.mayorista
      ? `
    <table>
      <caption>Facturar a:</caption>
      <tr><td>${
        venta.mayorista.nombre ? venta.mayorista.nombre : null
      }</td></tr>
      ${
        venta.mayorista.email
          ? `<tr><td>correo: ${venta.mayorista.email}</td></tr>`
          : null
      }
      ${
        venta.mayorista.telefono
          ? `<tr><td>cel: ${venta.mayorista.telefono}</td></tr>`
          : null
      }
    </table>
  `
      : ''
  }
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
    '<thead><tr><th colspan="5">PRODUCTOS</th></tr><tr><th>CODIGO</th><th>DESCRIPCION</th><th>CANTIDAD</th><th>COSTO POR UNIDAD</th><th>TOTALES</th></tr></thead><tbody>';

  venta.productos.forEach(function (producto) {
    html += `
        <tr>
        <td>${
          producto.codigoDeBarras ? producto.codigoDeBarras : producto.id
        }</td>
          <td class="name">${producto.nombre.toLocaleUpperCase()}${
      producto.descripcion ? ', ' + producto.marca : ''
    }</td>
          <td>${producto.cantidad}</td>
          <td>${moneyFormat(
            venta.mayorista ? producto.precioMayoreo : producto.precioVenta,
          )}</td>
          <td>${moneyFormat(
            (venta.mayorista ? producto.precioMayoreo : producto.precioVenta) *
              producto.cantidad,
          )}</td>
        </tr>`;
  });

  html += `<tr>
                <td colspan="3"></td>
                <td>SUBTOTAL PRODUCTOS</td>
                <td>${moneyFormat(
                  getTotal([venta.productos], venta.mayorista),
                )}</td>
            </tr>`;

  html += venta.servicios.length
    ? `<tr>
                <th colspan="5">SERVICIOS</th>
            </tr>`
    : '';

  venta.servicios.forEach(function (servicio) {
    html += `
        <tr>
        <td>${
          servicio.codigoDeBarras ? servicio.codigoDeBarras : servicio.id
        }</td>
            <td class="name">${servicio.nombre.toLocaleUpperCase()}${
      servicio.descripcion ? ', ' + servicio.marca : ''
    }</td>
            <td>${servicio.cantidad}</td>
            <td>${moneyFormat(
              venta.mayorista
                ? servicio.precioMayoreo
                  ? servicio.precioMayoreo
                  : servicio.precioVenta
                : servicio.precioVenta,
            )}</td>
            <td>${moneyFormat(
              (venta.mayorista
                ? servicio.precioMayoreo
                : servicio.precioVenta) * servicio.cantidad,
            )}</td>
        </tr>`;
  });

  html += venta.servicios.length
    ? `<tr>
  <td colspan="3"></td>
  <td>SUBTOTAL SERVICIOS</td>
  <td>${moneyFormat(getTotal([venta.servicios], venta.mayorista))}</td>
</tr>`
    : '';

  html += `<tr><td colspan="3"></td><td>TOTAL</td><td>${moneyFormat(
    venta.total,
  )}</td></tr>`;

  html += '</tbody>';
  return html;
}

export default htmlData;
