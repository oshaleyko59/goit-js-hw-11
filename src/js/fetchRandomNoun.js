import axios  from "axios";

const BASIC_URL = 'https://api.api-ninjas.com/v1/randomword/?type=noun';
const MY_KEY = '7h0kAOUL37scIrO9xx5ytw==SyFOdl8E0InvX32m';

const instance = axios.create({
  baseURL: BASIC_URL,
  timeout: 500,
  headers: { 'X-Api-Key': MY_KEY },
});

export default  function fetchRandomNoun() {
  return instance.get();
}

