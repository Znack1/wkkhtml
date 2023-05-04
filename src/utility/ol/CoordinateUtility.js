/*
 * @Descripttion: 
 * @version: 
 * @Author: 
 * @Date: 2020-06-03 09:48:04
 * @LastEditors: zkc
 * @LastEditTime: 2021-03-26 11:30:16
 * @input: no param
 * @out: no param
 */
export class CoordinateUtility {

    /**
     * @name: 
     * @test: test font
     * @msg: 
     * @param coordinate 度
     * @return: degree  [0,0,0]
     */
    static coordinateToDegree (coord) {
        let degree = [];
        if (!coord) return degree;

        let num = Math.floor(coord);
        degree.push(num);

        let minute = (coord - num) * 60;
        let minuteFloor = Math.floor(minute)
        degree.push(minuteFloor);

        let second = Math.floor(minute - minuteFloor * 60)
        degree.push(second);

        return degree;
    }

    /**
     * @name: 
     * @test: test font
     * @msg: 
     * @param degree  数组 [度，分，秒]
     * @return: 
     */
    static degreeToCoordinate (degree) {
        let coordinate = 0;
        if (!degree) return coordinate;


        for (let degreeIndex = 0; degreeIndex < degree.length; degreeIndex++) {
            let num = degree[degreeIndex];
            switch (degreeIndex) {
                case 0:
                    coordinate += num;
                    break;
                case 1:
                    coordinate += (num / 60);
                    break;
                case 2:
                    coordinate += ((num / 3600))
            }
        }

        return parseFloat(coordinate.toFixed(6)) + '';
    }



    static changeToDFM (du) {
        if (du.indexOf("°") >= 0)
            return du;
        const arr1 = du.split(".");
        if (arr1 == null || arr1.length <= 0)
            return;
        const d = arr1[0];
        if (arr1[1] == null || arr1[1] == undefined)
            return d + "° 0′ 0″";
        let tp = "0." + arr1[1]
        tp = String(tp * 60); //这里进行了强制类型转换
        const arr2 = tp.split(".");
        if (arr2 == null || arr2.length <= 0)
            return d + "°";
        const f = arr2[0];
        tp = "0." + arr2[1];
        if (arr2[1] == null || arr2[1] == undefined)
            return d + "° " + f + "′ 0″";
        tp = tp * 60;
        const m = tp;
        const dfm = d + "° " + f + "′ " + parseFloat(m.toFixed(2)) + "″";
        return dfm;
    }

    

    /**
     * 经纬度校验
     */
    static checkCoordLongitude (longitude) {
        try {
            if (longitude == null || longitude == undefined || longitude == '') {
                return false;
            }
                var longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,15})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,15}|180)$/;
                //var longitude = 123.123;
            if (!longrg.test(longitude)) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    static checkCoordLatitude (latitude) {
        try {
            if (latitude == null || latitude == undefined || latitude == '') {
                return false;
            }
            var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,15}|90\.0{0,15}|[0-8]?\d{1}|90)$/;
            //var latitude =22.2222;
            if (!latreg.test(latitude)) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    static checkDegree(degree){
        try {
            if (degree == null || degree == undefined || degree == '') {
                return false;
            }
            let curDegree = degree.replace(/"[\s\S]*?"/g, '')
            var latreg = /^\d{1,3}°\s\d{1,2}′\s\d{1,2}(\.\d{1,2})?″$/;
            if (!latreg.test(curDegree)) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
      
    }

}

CoordinateUtility.china_range_lont_min = 73.66;
CoordinateUtility.china_range_lont_max = 135.05;
CoordinateUtility.china_range_lat_min = 3.86;
CoordinateUtility.china_range_lat_max = 53.55;