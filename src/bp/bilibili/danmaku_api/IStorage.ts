/**
 * Created by MIC on 2016-11-11.
 */

interface IStorage {

    loadRank(complete: Function, err?: Function): void;
    uploadScore(score: number, name?: string, complete?: Function, err?: Function): void;
    saveData(userData: any, complete?: Function, err?: Function): void;
    loadData(complete?: Function, err?: Function): void;

}

export default IStorage;
