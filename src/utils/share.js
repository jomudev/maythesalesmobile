import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import CurrencyFunctions from './currencyFunctions';

export default class ShareData {
    static async product(data,  type) {
        try {
            console.log('sharing...');
            const shareMessage = `${data.nombre} ${data.marca} - ${CurrencyFunctions.moneyFormat(data.precioVenta)} ${data.descripcion ? '| ' + data.descripcion : ''}`;
            const content = {
                title: shareMessage,
                message: shareMessage,
            }
    
            const shareByType = {
                detailsOnly: async () => {
                    await Share.open(content)
                },
                detailsAndImage: async () => {
                    let imagePath = null;
                    await RNFetchBlob.config({
                        fileCache: true,
                    })
                    .fetch('GET', data.imageURL)
                    .then(async (resp) => {
                        imagePath = resp.path();
                        return await resp.readFile('base64');
                    })
                    .then(async (base64Data) => {
                        var base64Data = `data:image/jpeg;base64,${base64Data}`;
                        await Share.open({...content, url: base64Data})
                        RNFetchBlob.fs.unlink(imagePath);
                    });
                    
                },
            }
    
            return await shareByType[type]();
        } catch (e) {
            console.log(e);
        }
    }

    static async service(data) {
        const shareMessage = `${data.nombre} ${data.marca} - ${CurrencyFunctions.moneyFormat(data.precioVenta)} ${data.descripcion ? '| ' + data.descripcion : ''}`;
        return await Share.open({title: shareMessage, message: shareMessage});
    }
}