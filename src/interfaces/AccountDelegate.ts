import { Web3Util } from "../Web3Util";
import { Account } from '../models/account';

export interface AccountDelegate {
    balanceDidChange(util: Web3Util, account: Account): void;
}