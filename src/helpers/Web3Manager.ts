import { Web3Util } from '../Web3Util';

export class Web3Manager extends Web3Util {
    private static instance: Web3Manager;

    private constructor(){
        super();
    }

    public static getInstance(): Web3Manager {
        if(this.instance == null){
            this.instance = new Web3Manager();
        }

        return this.instance;
    }
}