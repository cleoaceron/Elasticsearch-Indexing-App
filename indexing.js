(function () {
    'use strict';
 
    const axios = require('axios');
    const fs = require('fs');
    const elasticsearch = require('elasticsearch');
    const esClient = new elasticsearch.Client({
        host: 'http://localhost:9200/',
        log: 'error'
    });
 
    const bulkIndex = function bulkIndex(index, type, data) {

        let bulkBody = [];

        for (let item of Object.entries(data)) {
        console.log(data); return false;
        bulkBody.push({
                index: {
                    _index: index,
                    _type: type,
                    _id: item.id
                }
            });
            bulkBody.push({item});
        }

        // esClient.bulk({ body: bulkBody })
        //     .then(response => {
        //         let errorCount = 0;
        //         response.items.forEach(item => {
        //             if (item.index && item.index.error) {
        //                 console.log(++errorCount, item.index.error);
        //             }
        //         });
        //         console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
        //     })
        //     .catch(console.err);
    };
 
    // only for testing purposes
    // all calls should be initiated through the module
    const test = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }
        try {
            return axios.get('https://store.musictribe.com/api/hybrisData/artists', axiosConfig)
        } catch (error) {
            console.error(error)
        }
    }
 
    const getArtist = async => {
        const artist = test()
            .then(response => {
                if (response.data) {
                    const data = response.data

                    bulkIndex('artists', 'artist', data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
 
    getArtist()
 
    module.exports = {
        bulkIndex
    };
}());