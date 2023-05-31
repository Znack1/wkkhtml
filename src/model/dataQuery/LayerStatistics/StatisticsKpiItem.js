/*
 * @Author: your name
 * @Date: 2020-04-13 11:05:22
 * @LastEditTime: 2020-12-01 11:45:33
 * @LastEditors: zkc
 * @Description: In User Settings Edit
 * @FilePath: \largescreen\src\model\StatKPIItem.js
 */
import { GuidUtility } from "../../../utility/common/GuidUtility";
import { CustomArray } from "../../../utility/common/CustomArray";
import { StatKeyValueItems } from "./StatKeyValueItem.js";
import AxiosConfig from "../../../config/AxiosConfigJs";
import _ from 'lodash';

export class StatisticsKpiItem {


    constructor() {
        /// 分类id
        this.classifyId = null;

        /// code编码
        this.code = null;

        /// 描述
        this.description = null;

        /// 唯一值
        this.id = GuidUtility.getGuid();

        /// 键值对集合
        this.keyValues = new StatKeyValueItems;

        /// 名称
        this.name = null;

        /// 别名
        this.alias = null;

        // 展示类型
        this.chartType = null;



    }

    // 获取表头
    static getEmissionAreaTableHeader() {

        let header = [
            { name: '序号', width: '20%', prop: 'num' },
            { name: '名称', width: '40%', prop: 'name' },
            { name: '数值', width: '40%', prop: 'value' }
        ];
        return header

    }

    // 获取表格数据
    getTableItem() {
        let tableItem = [];
        _.each(this.keyValues.objects, (keyvalue, idx) => {
            tableItem.push({
                'num': (idx + 1),
                'name': keyvalue.name,
                'value': keyvalue.value + keyvalue.tag
            })
        });
        return tableItem

    }

    static fromJson(jsonObject) {
        let kpiItem = null;
        if (!jsonObject) return kpiItem;

        kpiItem = new StatisticsKpiItem();
        kpiItem.name = jsonObject.name;
        kpiItem.classifyId = jsonObject.classifyId;
        kpiItem.code = jsonObject.code;
        kpiItem.description = jsonObject.description;
        kpiItem.id = jsonObject.id;
        kpiItem.alias = jsonObject.alias;
        kpiItem.chartType = jsonObject.chartType;
        kpiItem.keyValues = StatKeyValueItems.fromJsons(jsonObject.keyValues);

        return kpiItem;
    }

}


export class StatisticsKpiItems extends CustomArray {

    constructor() {
        super();

    }


    // 通过名字查找 item项
    findStatisticsKpiItemByName(name) {
        let statisticsKpiItem = new StatisticsKpiItem();

        if (this.objects.length === 0) return statisticsKpiItem;

        let tempStatisticsKpiItem = _.find(this.objects, { "name": name });
        if (!tempStatisticsKpiItem) return statisticsKpiItem;

        return tempStatisticsKpiItem;
    }


    /**
     * 获取排放统计数据
     * @param {*} filter 
     * @param {*} succeedCallback 
     * @param {*} errorCallback 
     */
    static selectByFilter(filter, url, succeedCallback, errorCallback) {
        AxiosConfig.gbznt
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


    /**
     * 获取排放统计数据
     * @param {*} filter 
     * @param {*} succeedCallback 
     * @param {*} errorCallback 
     */
    static selectBySqlFilter(filter, url, succeedCallback, errorCallback) {
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



    static mock() {
        let json = [{
            classifyId: GuidUtility.getGuid(),
            code: '01',
            description: '',
            id: GuidUtility.getGuid(),
            chartType: 'count',
            keyValues: [{
                id: GuidUtility.getGuid(),
                name: 'cod',
                tag: '',
                value: 40524,
                unit: '个',
                alias: 'COD'
            }],
            name: '污染源数量'
        }, {
            classifyId: GuidUtility.getGuid(),
            code: '02',
            description: '',
            id: GuidUtility.getGuid(),
            chartType: 'rose',
            keyValues: [{
                id: GuidUtility.getGuid(),
                name: 'cod',
                tag: '',
                value: 40524,
                unit: '个',
                alias: 'COD'
            }],
            name: '污染源分类'
        }, {
            classifyId: GuidUtility.getGuid(),
            code: '03',
            description: '',
            id: GuidUtility.getGuid(),
            chartType: 'table',
            keyValues: [{
                id: GuidUtility.getGuid(),
                name: 'cod',
                tag: '',
                value: 40524,
                unit: '个',
                alias: 'COD'
            }],
            name: '污染源运行状态'
        }, {
            classifyId: GuidUtility.getGuid(),
            code: '05',
            description: '',
            id: GuidUtility.getGuid(),
            chartType: 'table',
            keyValues: [{
                id: GuidUtility.getGuid(),
                name: 'cod',
                tag: '',
                value: 40524,
                unit: '个',
                alias: 'COD'
            }],
            name: '污染源运行状态'
        }, {
            classifyId: GuidUtility.getGuid(),
            code: '04',
            description: '',
            id: GuidUtility.getGuid(),
            chartType: 'bar',
            keyValues: [{
                id: GuidUtility.getGuid(),
                name: 'cod',
                tag: '',
                value: 40524,
                unit: '个',
                alias: 'COD'
            }],
            name: '污染源运行状态'
        }, {
            classifyId: GuidUtility.getGuid(),
            code: '06',
            description: '',
            id: GuidUtility.getGuid(),
            chartType: 'line',
            keyValues: [{
                id: GuidUtility.getGuid(),
                name: 'cod',
                tag: '',
                value: 40524,
                unit: '个',
                alias: 'COD'
            }],
            name: '污染源运行状态'
        }, {
            classifyId: GuidUtility.getGuid(),
            code: '07',
            description: '',
            id: GuidUtility.getGuid(),
            chartType: 'bar',
            keyValues: [{
                id: GuidUtility.getGuid(),
                name: 'cod',
                tag: '',
                value: 40524,
                unit: '个',
                alias: 'COD'
            }],
            name: '污染源运行状态'
        }];
        return StatisticsKpiItems.fromJsons(json)
    }


    static fromJsons(jsonObjects) {
        let kpiItems = new StatisticsKpiItems();
        if (!jsonObjects) return kpiItems;

        let tempJsonItem = null;
        let tempKpiItem = null;
        for (let tempIndex = 0; tempIndex < jsonObjects.length; tempIndex++) {
            tempJsonItem = jsonObjects[tempIndex];
            tempKpiItem = StatisticsKpiItem.fromJson(tempJsonItem);
            if (!tempKpiItem) continue;

            kpiItems.push(tempKpiItem);
        }

        return kpiItems;
    }

    static getSumValue(kpiItemArray) {
        let sumValue = 0;
        if (!kpiItemArray) return sumValue;

        let tempItem = null;
        for (let itemIndex = 0; itemIndex < kpiItemArray.length; itemIndex++) {
            tempItem = kpiItemArray[itemIndex];
            if (!tempItem || !tempItem.value) continue;
            sumValue += tempItem.value;
        }

        return sumValue;
    }

}

export class StatisticsKpiItemFilterByEmission {
    constructor() {
        this.areaType = null,
            this.emissionSourceType = null
    }
}

export class StatisticsKpiItemFilterByOutfall {
    constructor() {
        this.areaType = null;
        this.districtCode = null;
        this.controlName = null;
        this.riverName = null;
    }
}

export class StatisticsKpiItemFilterByPollution {
    constructor() {
        this.areaType = null;
        this.districtName = null;
        this.controlName = null;
        this.riverName = null;
    }
}


export class SqlStatisticsKpiItemParam {
    constructor() {
        this.code = null;
        this.paramValue = new Array();
    }


}

export class SqlStatisticsKpiItemParams extends CustomArray {
    constructor() {
            super();
        }
        // 获取参数
    getRequestObject() {
        let requestObject = new Array();
        _.each(this.objects, (object) => {
            if (object.paramValue.length == 0) {
                object.paramValue = [""];
            }
            requestObject.push(object);
        })
        return requestObject;
    }
}



// 排水特征类型
export const DrainCharacteristicType = {
    drainCharacteristicType_water_stagnant: "死水",

    drainCharacteristicType_water_broke: "闸断",
    drainCharacteristicType_water_flow: "活水",
    drainCharacteristicType_water_anhydrous: "无水",
    drainCharacteristicType_water_rest: "无法确认",

    drainCharacteristicType_water_stagnant_desc: "死水",

    drainCharacteristicType_water_broke_desc: "闸断",
    drainCharacteristicType_water_flow_desc: "活水",
    drainCharacteristicType_water_anhydrous_desc: "无水",
    drainCharacteristicType_water_rest_desc: "其他",
}

export const StatItemChartType = {
    chart: 'chart',
    bar: 'bar',
    line: 'line',
    barY: 'barY',
    rose: 'rose',
    pie: 'pie',
    table: 'table',
    barLine: 'barLine',
    doublePie: 'doublePie',
    count: 'count',
    img: 'img',
}

export const StatKPIClassifyType = {
    outfall_type_desc: "排口类型",

    suspectedSource_desc: "污水疑似来源",

    outfall_count_desc: "排口数量",

    into_river_way_desc: "入河方式",

    drain_characteristic_desc: "排水特征",

    outfall_monitor_desc: "排口监测",


    outfall_type: "outfall_type",

    suspectedSource: "suspectedSource",

    outfall_count: "outfall_count",

    into_river_way: "into_river_way",

    drain_characteristic: "drain_characteristic",

    outfall_monitor: "outfall_monitor",

}

export const StatisticsCodeDefine = {

    // 市州统计code
    city_outfall_river: "01",
    city_outfall_district: "02",
    city_outfall_control: "03",

    type_all_river: "00",
    type_per_river: "01",
    type_all_control: "00",
    type_per_control: "01",


    type_district_provience: "00",
    type_district_city: "01",
    type_district_country: "02",

    //污染源01
    type_data_pollution: "01",
    //排口 02
    type_data_outfall: "02",
    //排放03
    type_data_emission: "03",

    //市01
    type_area_city: "01",
    //河流02
    type_area_river: "02",
    //控制单元03
    type_area_control_unit: "03",

    //
    //	所有来源 01
    type_emission_source_all: "01",
    //	工业源02
    type_emission_source_industrial: "02",
    //	面源03
    type_emission_source_area: "03",
    //	生活源04
    type_emission_source_life: "04",

    //	总统计：01
    type_emission_stat_sum: "01",
    //	分统计 02
    type_emission_stat_group: "02",

    //	cod 01
    type_emission_chemical_cod: "01",
    //	n 02
    type_emission_chemical_n: "02",
    //	霖
    type_emission_chemical_p: "03",
    //	nh3_n 04
    type_emission_chemical_nh3_n: "04",

    //	nh3_n 04
    type_emission_chemical_nh3_n_total: "05",

    // 排口统计

    /**
     * 入河方式
     */
    type_outfall_index_into_river: "01",

    /**
     * 排污口类型
     */
    type_outfall_type: "02",

    /**
     * 排水特征
     */
    type_outfall_index_drain_characteristic: "03",


    /**
     * 是否监测
     */
    type_outfall_has_sampling_monitor: "04",

    /**
     * 是否具备条件
     */
    type_outfall_exception_need_sampling: "05",


    type_outfall_exception_history_outfall: "06",


    type_outfall_new_outfall: "07",

    /**
     * 按下一级统计单元统计进行排口总数
     */
    type_outfall_next_stat_unit_outfall_count: "08",

    type_outfall_next_stat_unit_outlet_count: "15",

    type_outfall_next_stat_unit_drain_count: "16",

    type_outfall_next_stat_unit_type_count: "17",
    type_outfall_next_stat_unit_intoRiver_count: "18",
    type_outfall_next_stat_unit_monitor_count: "19",
    type_outfall_next_stat_unit_trace_count: "20",
    type_outfall_next_stat_unit_online_count: "21",
    /**
     * 污水疑似来源
     */
    type_outfall_new_suspected_source: "09",
    // 数量统计
    type_outfall_new_count: "12",
    type_outfall_monito: "04",
    type_outfall_trace: "13",

    // 污染源数量
    type_pollution_source_number: "01",
    //污染源分类
    type_pollution_source_type: "02",
    //污染源运行状态
    type_pollution_source_runstat: "03",
    //污染源区域分布
    type_pollution_area_distribution: "04",


    // cod
    type_pollution_cod_75: '22',
    type_pollution_cod_90: '23',
    type_pollution_cod_years: '24',
    type_pollution_cod_years10: '25',

    // 氨氮
    type_pollution_ammonia_75: '26',
    type_pollution_ammonia_90: '27',
    type_pollution_ammonia_years: '28',
    type_pollution_ammonia_years10: '29',

    // 高标项目配置
    stat_type_district: "01",

    indic_project_scale: '01', // 项目规模
    indic_built_area: '02', // 建成面积 去重
    indic_newArea_arableLand: '04', // 新增耕地面积
    indic_project_distribution: '07', // 高标项目分布
    indic_farmland_area: '03', // 高标准农田建成面积（万亩）
    indic_invest_distribution: '05', // 项目投资分布
    indic_farmland_area_year: '06', //年度高标农田项目概况
    indic_farmlan_total_investment: '08', // 总投资
    indic_project_arableLand: '09', // 耕地面积
    indic_project_count: '12', // 项目个数
    indic_built_scale: '20', // 建设规模
    indic_built_area_all: '22', // 建成面积
    // 按年度统计数据
    indic_year_farmlan_total_investment: '15', // 总投资
    indic_year_built_area: '17', // 建成面积 去重
    indic_year_project_count: '14', // 项目个数
    indic_year_project_arableLand: '16', // 耕地面积
    indic_year_project_distribution: '18', // 高标项目分布
    indic_year_farmland_area: '19', // 年度高标准农田建成面积（万亩）
    indic_year_farmland_area_year: '13', // 年度高标农田项目概况
    indic_year_built_scale: '21', // 建设规模
    indic_year_built_area_all: '23', // 建成面积

}

export const EmissionsType = {
    percenter75: "75%",
    percenter90: "90%",
    years: "多年平均最枯月流量",
    years10: "10年内最枯月流量",

    dataLabels: [
        { "label": "75%", value: "75%" },
        { "label": "90%", value: "90%" },
        { "label": "多年平均最枯月流量", value: "多年平均最枯月流量" },
        { "label": "10年内最枯月流量", value: "10年内最枯月流量" }
    ]
}

export const IndicConfig = {
    distribute_tableName: '高标准农田建设概况',
    distribute_tableName_year: '高标准农田建设概况',
    investment_total_name: "总投资",
    project_count_unit: '个',
    area_count_unit: '万亩',
    indic_list: [{
            name: "项目个数",
            value: 0,
            unit: "个",
            select: true,
            type: "projectCount"
        },
        {
            name: "总投资",
            value: 0,
            unit: "亿元",
            select: true,
            type: "investment"
        }, {
            name: "建设规模",
            value: 0,
            unit: "万亩",
            select: true,
            type: "construction_scale"
        }, {
            name: "建成面积",
            value: 0,
            unit: "万亩",
            select: true,
            type: "builtArea"
        }, {
            name: "去重后建成面积",
            value: 0,
            unit: "万亩",
            select: false,
            value1: 0,
            unit1: '%',
            type: "afteWeight"
        }, {
            name: "耕地面积",
            value: 0,
            unit: "万亩",
            select: false,
            value1: 0,
            unit1: '',
            type: "ploughArea"
        }
    ],
    indic_project_afteWeight: 'afteWeight',
    indic_project_investment: 'investment',
    indic_project_builtArea: 'builtArea',
    indic_project_projectCount: 'projectCount',
    indic_project_construction_scale: 'construction_scale',
    indic_project_ploughArea: 'ploughArea',

    indic_project_distribution_name: '项目数量',
    indic_project_arableLand_name: '耕地面积',
    indic_built_area_name: '高标农田面积',
    indic_farmlan_total_investment_name: '总投资',
    indic_farmlandShare_name: '高标农田比例'

}