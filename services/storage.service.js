import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
    default_API: 'bc4c365e5876abcd0b21b5a92c97ad66',
    default_CITY: 'astana'
}

const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath) 
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
}

const saveDefaultValues = async () => {
    let data = {
        token: TOKEN_DICTIONARY.default_API,
        city: TOKEN_DICTIONARY.default_CITY
    };
    await promises.writeFile(filePath, JSON.stringify(data));
}

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath) 
        const data = JSON.parse(file);
        return data[key];
    }
    await saveDefaultValues();
    const file = await promises.readFile(filePath) 
    const data = JSON.parse(file);
    return data[key];
}


const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
}

export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY};