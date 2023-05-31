/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: zkc
 * @Date: 2020-11-17 14:27:07
 * @LastEditors: zkc
 * @LastEditTime: 2020-11-18 16:21:52
 * @input: no param
 * @out: no param
 */
import { GuidUtility } from "../utility/common/GuidUtility";
import { CustomArray } from "../utility/common/CustomArray";
import _ from 'lodash';



export class YearDistributionItem {
    constructor() {
        this.id = GuidUtility.getGuid();
        this.year = null;
        this.projectCount = null;
        this.projectUnit = '个';
        this.builtArea = null;
        this.builtAreaUnit = '万亩';
        this.investment = null;
        this.investmentUnit = '万元';

    }

    static getItemsByKeyValue(keyValue) {
        let yearDistributionItem = null;
        if (!keyValue) return yearDistributionItem;

        yearDistributionItem = new YearDistributionItem();
        yearDistributionItem.year = keyValue.id;
        yearDistributionItem.projectCount = keyValue.name;
        yearDistributionItem.builtArea = keyValue.value;
        yearDistributionItem.investment = Math.round(keyValue.tag * 100) / 100;

        return yearDistributionItem;
    }


    static fromJson(jsonObject) {
        let yearDistributionItem = null;
        if (!jsonObject) return yearDistributionItem;

        yearDistributionItem = new YearDistributionItem();
        yearDistributionItem.year = jsonObject.year;
        yearDistributionItem.projectCount = jsonObject.projectCount;
        yearDistributionItem.builtArea = jsonObject.builtArea;
        yearDistributionItem.investment = jsonObject.investment;

        return yearDistributionItem;
    }
}



export class YearDistributionItems extends CustomArray {
    constructor() {
        super();

    }

    static getItemsByKeyValues(keyValues) {
        let yearDistributionItems = new YearDistributionItems();

        _.each(keyValues, (keyValue) => {
            let yearDistributionItem = null;
            yearDistributionItem = YearDistributionItem.getItemsByKeyValue(keyValue);
            if (yearDistributionItem) {
                yearDistributionItems.push(yearDistributionItem);
            }
        })
        return yearDistributionItems;
    }

    static fromJsons(jsonObjects) {
        let yearDistributionItems = new YearDistributionItems();
        if (!jsonObjects || jsonObjects.length == 0) return yearDistributionItems;

        let tempJsonItem = null;
        let yearDistributionItem = null;
        for (let tempIndex = 0; tempIndex < jsonObjects.length; tempIndex++) {
            tempJsonItem = jsonObjects[tempIndex];
            yearDistributionItem = YearDistributionItem.fromJson(tempJsonItem);
            if (!yearDistributionItem) continue;

            yearDistributionItems.push(yearDistributionItem);
        }

        return yearDistributionItems;
    }

}