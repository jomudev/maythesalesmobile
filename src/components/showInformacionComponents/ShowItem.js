import ShowClienteItem from '../showItemComponents/showClienteItem';
import ShowProductoItem from '../showItemComponents/showProductoItem';
import ShowServiceItem from '../showItemComponents/showServicioItem';
import ShowProveedorItem from '../showItemComponents/showProveedorItem';

const editIcon = 'pencil';
const closeIcon = 'close';

const ShowItem = ({route, navigation}) => {
  const type = route.params.type;
  const data = route.params.data;
  const args = {type, data, navigation, editIcon, closeIcon};
  const productItem = new ShowProductoItem(args);
  const serviceItem = new ShowServiceItem(args);
  const clientItem = new ShowClienteItem(args);
  const providerItem = new ShowProveedorItem(args);

  const Items = {
    productos: productItem,
    servicios: serviceItem,
    clientes: clientItem,
    proveedores: providerItem,
  };

  return Items[type] && Items[type];
};

export default ShowItem;
