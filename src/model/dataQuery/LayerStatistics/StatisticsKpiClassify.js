import {
    CustomArray
} from "../../../utility/common/CustomArray";
import AxiosConfig from "../../../config/AxiosConfigJs";
import qs from 'qs';
import {
    GuidUtility
} from "../../../utility/common/GuidUtility";
import {
    StatisticsKpiItems
} from "./StatisticsKpiItem.js";
import _ from 'lodash';
export class StatisticsKpiClassify {
    constructor() {
        /// 唯一值
        this.id = GuidUtility.getGuid();
        /// 名称
        this.name = null;
        /// 别名
        this.alias = null;
        /// 子分类
        this.children = null;
        /// code编码
        this.code = null;
        /// 描述
        this.description = null;

        /// 统计项
        this.kpiItems = null;

        /// 父id
        this.parentId = null;


    }

    // 解析组目录下的叶子节点
    static fromJson(jsonObject) {
        let statKPIClassify = null;
        if (!jsonObject) return statKPIClassify;

        statKPIClassify = new StatisticsKpiClassify();

        if (jsonObject.id) {
            statKPIClassify.id = jsonObject.id;
        }

        statKPIClassify.name = jsonObject.name;
        statKPIClassify.code = jsonObject.code;
        statKPIClassify.parentId = jsonObject.parentId;
        statKPIClassify.description = jsonObject.description;
        statKPIClassify.alias = jsonObject.alias;
        statKPIClassify.kpiItems = StatisticsKpiItems.fromJsons(jsonObject.kpiItems);
        statKPIClassify.children = StatisticsKpiClassifies.fromJsons(jsonObject.children);

        return statKPIClassify;
    }



}



export class StatisticsKpiClassifies extends CustomArray {
    constructor() {
        super();
    }

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

    findByCode(code) {
        let findItem = null;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem.code === code) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }

    findByStatIndex(code) {
        let findItem = null;

        if (!code) return findItem;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (!tempItem || !tempItem.code) continue;
            if (tempItem.code.endsWith(code)) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }

    /**
     * 通过筛选条件查询
     * @param {*} filter 
     * @param {*} succeedCallback 
     * @param {*} errorCallback 
     */
    static selectByFilter(filter, url, succeedCallback, errorCallback) {
        AxiosConfig.spatialyellowriver
            .post(url, filter)
            .then(function(response) {
                var responseResult = null;
                if (response != null && response.data) {
                    responseResult = response.data.data;
                }
                if (succeedCallback) {
                    succeedCallback(responseResult);
                }
            })

        .catch(function(error) {

            if (errorCallback) {
                errorCallback(error);
            }
        });
    }

    //模拟数据
    static mock() {
        let json = [{
            id: 1,
            name: '目录配置',
            code: 1,
            alias: '目录配置',
            description: '目录配置',
            kpiItems: [],
            parentId: null
        },
        {
            id: 2,
            name: '服务配置',
            code: 2,
            alias: '服务配置',
            description: '服务配置',
            kpiItems: [],
            parentId: null
        }
    ];
        let statKPIClassifies = StatisticsKpiClassifies.fromJsons(json);
        return statKPIClassifies;
    }


    static fromJsons(jsonObjects) {
        let statisticsKpiClassifies = new StatisticsKpiClassifies();
        if (!jsonObjects) return statisticsKpiClassifies;

        let tempJsonItem = null;
        let tempStatKPIClassify = null;
        for (let tempIndex = 0; tempIndex < jsonObjects.length; tempIndex++) {
            tempJsonItem = jsonObjects[tempIndex];
            tempStatKPIClassify = StatisticsKpiClassify.fromJson(tempJsonItem);
            if (!tempStatKPIClassify) continue;

            statisticsKpiClassifies.push(tempStatKPIClassify);
        }

        return statisticsKpiClassifies;
    }
}


export class StatisticsKpiClassifyFilter {
    constructor() {
        this.buildTree = false;
        this.code = "";
        this.codes = [];
        this.fuzzyCode = "";
        this.fuzzyCodes = [];
        this.id = "";
        this.ids = [];
        this.kpiItemFilters = [];
        this.parentId = "";
        this.parentIds = [];
        this.useCode = false;
        this.useCodes = false;
        this.useFuzzyCode = false;
        this.useFuzzyCodes = false;
        this.useId = false;
        this.useIds = false;
        this.useKpiItemFilters = false;
        this.useParentId = false;
        this.useParentIds = false
    }
}

export class ControlStatisticsKpiClassifyFilter {
    constructor() {
        this.classifyFilter = new StatisticsKpiClassifyFilter();
    }
}

/// 菜单统计分类
export class StatMenuClassify extends StatisticsKpiClassify {
    constructor() {
        super();
        // 路由
        this.router = null;
        this.icon = null;
    }


    // 通过统计分类转换菜单分类
    static statMenuClassifyByStatKPIClassify(statKPIClassify) {
        let statMenuClassify = new StatMenuClassify();
        if (!statKPIClassify) return statKPIClassify;
        statMenuClassify.id = statKPIClassify.id
        statMenuClassify.name = statKPIClassify.name;
        statMenuClassify.code = statKPIClassify.code;
        statMenuClassify.parentId = statKPIClassify.parentId;
        statMenuClassify.description = statKPIClassify.description;
        statMenuClassify.kpiItems = statKPIClassify.kpiItems;
        statMenuClassify.children = statKPIClassify.children;
        statMenuClassify.alias = statKPIClassify.alias;
        statMenuClassify.icon = StatMenuClassify.getIcon(statKPIClassify.alias);
        return statMenuClassify;
    }



    static getIcon(name) {
        let icon = "";
        if (!name) return icon;
        switch (name) {
            case leftMenu.menu_type_control:
                return "icon-icon-control";
                break;
            case leftMenu.menu_type_outlet:
                return "icon-icon-pk";
                break;
            case leftMenu.menu_type_emission:
                return "icon-icon-pl";
                break;
            case leftMenu.menu_type_pollutant:
                return "icon-icon-wry";
                break;
            case leftMenu.menu_type_city:
                return "icon-chengshi";
                break;
            case leftMenu.menu_type_directory:
                return "icon-mulu"
                break;
            case leftMenu.menu_type_service:
                return "icon-fabufuwu";
                break;
            case leftMenu.menu_type_user:
                return "icon-yonghuguanli";
                break;
        }
    }
}

export class StatMenuClassifies extends CustomArray {
    constructor() {
        super()
    }

    // 通过统计分类获取菜单分类
    static getMenuClassifiesByStatClassifies(statKPIClassifies) {
        let menuClassifies = new StatMenuClassifies();
        if (!statKPIClassifies) return menuClassifies;
        _.each(statKPIClassifies.objects, (statKPIClassify, index) => {
            let menuClassify = StatMenuClassify.statMenuClassifyByStatKPIClassify(statKPIClassify);

            menuClassify.router = '/statistical/' + statKPIClassify.name;

            if (statKPIClassify.children.length > 0) {
                let childClassfies = StatMenuClassifies.getMenuClassifiesByStatClassifies(statKPIClassify.children);
                menuClassify.children = childClassfies;
            }

            menuClassifies.push(menuClassify);
        });
        return menuClassifies;
    }

}

export const leftMenu = {
    menu_type_control: "控制单元统计",
    menu_type_pollutant: '污染源统计',
    menu_type_emission: '排放统计',
    menu_type_outlet: "排口统计",
    menu_type_city: '市州统计',
    menu_type_directory: '目录配置',
    menu_type_service: '服务配置',
    menu_type_user: '用户管理'
}