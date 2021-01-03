import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const moneyFormat = (number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'HNL',
  }).format(Number(number).toFixed(2));
};

async function update(collectionToUpdate, data) {
  const db = firestore().collection('negocios').doc(auth().currentUser.uid);
  try {
    return db.collection(collectionToUpdate).doc(data.id).update(data);
  } catch (err) {
    console.log(err);
  }
}

const getMonthsReport = (list) => {
  list = list.map((item) => {
    return {
      period: moment(item.timestamp, 'x').format('MMMM YYYY'),
      total: item.total,
    };
  });

  return list
    .map((item, index, self) => {
      //get the total of each sales and sum it, to get the total sale per month;
      let monthTotal = self
        .map((sale) => (sale.period === item.period ? sale.total : 0))
        .reduce((accumulator, value) => accumulator + value);
      //return only one element per month and total of the month.
      const canShow =
        self.findIndex((sale) => sale.period === item.period) === index;
      return canShow ? {period: item.period, total: monthTotal} : null;
    })
    .filter((item) => item !== null);
};

const getSales = (snap, list, setList, setMonths) => {
  if (!snap) {
    return;
  }
  var newList = list;
  snap.docChanges().forEach((change) => {
    const data = change.doc.data();
    if (change.type === 'added') {
      const filter = list.filter((item) => item.id === data.id);
      const isInList = filter.length > 0;
      if (!isInList) {
        newList = newList.concat(data);
      }
    } else if (change.type === 'modified') {
      newList = list.map((item) => (item.id === data.id ? data : item));
    } else if (change.type === 'removed') {
      newList = list.filter((item) => item.id !== data.id);
    }
  });
  if (JSON.stringify(newList) !== JSON.stringify(list)) {
    setList(newList);
    const months = getMonthsReport(newList);
    setMonths(months);
  }
};

const handleSetSnackMessage = (message, activeSnackbarHook, setMessageHook) => {
  setMessageHook(message);
  activeSnackbarHook(true);
};

export {moneyFormat, update, getMonthsReport, getSales, handleSetSnackMessage};
