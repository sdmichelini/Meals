import request from 'superagent/lib/client'
import URL from '../constants/Url'

export default {
  getMeals: () => {
    return new Promise((resolve,reject) => {
      request.get(URL+'/api/meals')
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  }
}
