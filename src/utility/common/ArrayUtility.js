
export class ArrayUtility {


    static addTargetToOri(oriArray, tarArray) {
        if (!oriArray || !tarArray) return;

        let tempTarItem = null;
        for (let tempIndex = 0; tempIndex < tarArray.length; tempIndex++) {
            tempTarItem = tarArray[tempIndex];
            if (!tempTarItem) continue;
            oriArray.push(tempTarItem);
        }
    }

    /**
     * 按照index移除
     */
    static removeMulti(oriArray, delIndices) {
        if (!oriArray || !delIndices) return;

        //从大到小，排序
        delIndices.reverse();
        let oriItem = null;
        let tempDelIndex = null;
        for (let tempIndex = 0; tempIndex < delIndices.length; tempIndex++) {
            tempDelIndex = delIndices[tempIndex];
            oriItem = oriArray[tempDelIndex];
            if (!oriItem) continue;

            oriArray.splice(tempDelIndex, 1);
        }
    }

    /**
     * 数组是否包含某元素
     */
    static isContain(itemArray, item) {
        let flag = false;
        if ((item != 0 && !item) || !itemArray || itemArray.length == 0) return flag;
        let tempTarItem = null;
        for (let tempIndex = 0; tempIndex < itemArray.length; tempIndex++) {
            tempTarItem = itemArray[tempIndex];
            if (tempTarItem != 0 && !tempTarItem) continue;
            if (item == tempTarItem) {
                flag = true;
                break;
            }
        }
        return flag;

    }

    /**
     * 在原数组中查询除了当前数组的元素，剩下的元素的集合
     * orginArray:原数组，全部数据
     * curArray:当前数组
     * 返回：数组
     */
    static getNotContainArray(orginArray, curArray) {
        let resultArray = [];

        if (!orginArray || orginArray.length == 0 || !curArray || curArray.length == 0) return resultArray;
        let tempOrigin = null;
        let tempCur = null;
        let indexArr = [];
        let curIndex = null;
        let flag = false;
        for (let tempCurIndex = 0; tempCurIndex < curArray.length; tempCurIndex++) {
            tempCur = curArray[tempCurIndex];
            curIndex = this.getCurIndexInArray(orginArray, tempCur);
            if (curIndex != -1) {
                indexArr.push(curIndex);
            }
        }
        for (let index = 0; index < orginArray.length; index++) {
            tempOrigin = orginArray[index];
            flag = this.isContain(indexArr, index);
            if (!flag) {
                resultArray.push(tempOrigin);
            }
        }
        return resultArray;

    }

    /**
     * 查询当前元素在原数组的位置下标
     */
    static getCurIndexInArray(itemArray, item) {
        let curIndex = -1;
        if (!item || !itemArray || itemArray.length == 0) return curIndex;

        let tempTarItem=null;
        for (let tempIndex = 0; tempIndex < itemArray.length; tempIndex++) {
            tempTarItem = itemArray[tempIndex];
            if (!tempTarItem) continue;
            if (item == tempTarItem) {
                curIndex = tempIndex;
                break;
            }
        }
        return curIndex;
    }

    /**
     * 根据数组拼接成以,分割开的字符串
     * 或者可以直接使用  originArr.join(",")
     */
    static getFormateStringByArray(originArr) {
        let str = "";
        if (!originArr || originArr.length == 0) return str;
        for (let tempIndex = 0; tempIndex < originArr.length; tempIndex++) {
            str += originArr[tempIndex] + ",";
        }

        if (str.length >= 2) {
            str = str.substring(0, str.length - 1);
        }

        return str;
    }

}