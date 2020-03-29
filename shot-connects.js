import React from 'react';
import axios from 'axios';

class ShotConnect{

    getShotworksList(host,param){
        var param = {'a':'01','pr':'13'}
        
        axios
        .get('https://api-front.shotworks.jp/api-front/app/worklist', { params: param　})
        .then((results) => {
            // 通信に成功してレスポンスが返ってきた時に実行したい処理
        }
        .catch((error) => {
            // 通信に失敗してレスポンスが返ってこなかった時に実行したい処理
            console.log('処理に失敗しました');
        }
    }

    
}