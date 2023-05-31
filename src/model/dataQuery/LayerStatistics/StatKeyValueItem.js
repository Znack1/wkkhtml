import { GuidUtility } from "../../../utility/common/GuidUtility";
import { CustomArray } from "../../../utility/common/CustomArray";

/// 统计结果-键值对
export class StatKeyValueItem {
    constructor() {
        /// 唯一值
        this.id = GuidUtility.getGuid();
        /// 名称
        this.name = null;
        /// 扩展属性项
        this.tag = null;
        /// 值
        this.value = null;

        // 单位
        this.unit = null;

        /// 别名
        this.alias = null;

        this.icon = null;
    }

    static fromJson(jsonObject) {
        let keyValueItem = null;
        if (!jsonObject) return keyValueItem;

        keyValueItem = new StatKeyValueItem();
        keyValueItem.id = jsonObject.id;
        keyValueItem.name = jsonObject.name;
        keyValueItem.value = jsonObject.value || 0;
        keyValueItem.tag = jsonObject.tag;
        keyValueItem.unit = jsonObject.unit;
        keyValueItem.icon = jsonObject.icon;
        keyValueItem.alias = jsonObject.alias;
        return keyValueItem;
    }
}

/// 统计结果-键值对数组
export class StatKeyValueItems extends CustomArray {
    constructor() {
        super();
    }

    /**
     * 通过名称查找键值对
     */
    findByName(name) {
        let findItem = null;
        if (!name) return findItem;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem.name === name) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }


    static fromJsons(jsonObjects) {
        let keyValueItems = new StatKeyValueItems();
        if (!jsonObjects) return keyValueItems;

        let tempJsonItem = null;
        let tempkeyValueItem = null;
        for (let tempIndex = 0; tempIndex < jsonObjects.length; tempIndex++) {
            tempJsonItem = jsonObjects[tempIndex];
            tempkeyValueItem = StatKeyValueItem.fromJson(tempJsonItem);
            if (!tempkeyValueItem) continue;

            keyValueItems.push(tempkeyValueItem);
        }

        return keyValueItems;
    }
}