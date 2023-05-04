export class GuidUtility
{
    constructor()
    {

    }

    //获得guid值-32位
    static getGuid() {
        let result = this._getS4() + this._getS4() + this._getS4() + this._getS4() + this._getS4() + this._getS4() + this._getS4() + this._getS4();
       return result;
    }

    /**
     * 时间戳作为guid值
     */
    static getGuidEx()
    {   
        let guid=new Date().getTime();
        
        return guid;
    }

      
    static _getS4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     }
}