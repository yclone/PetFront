import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class ClienteService {
  
  register(username: string, nome: string, sobrenome: string, email: string, password: string) {
    const json = JSON.stringify({ username,
      nome,
      sobrenome,
      email,
      password
    });
    
    return axios.post(API_URL + "user", json, {
       headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
            
        }
    });
  }

}

export default new ClienteService();
