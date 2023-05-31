/*
 * @Author: your name
 * @Date: 2020-11-13 16:51:59
 * @LastEditTime: 2021-06-11 15:29:18
 * @LastEditors: wutt
 * @Description: In User Settings Edit
 * @FilePath: /fmmodulelib/packages/utility/ol/VectorTileStyleParse.js
 */
import Http from "../common/HttpUtility"

export class VectorTileStyleParse {
    constructor() {

        
    }



    parse(styleJson) {
        var that = this;
        var layers = styleJson.layers;
        var legend = {};
        for (var i = 0, ii = layers.length; i < ii; i++) {
            var layer = layers[i];

            var name = layer.id;
            var index = name.indexOf('/');
            if (index > 0) {
                name = name.substring(0, index);
            }
            legend[name] = legend[name] || { sourceType: '', layers: [] };
            legend[name].layers.push(that.convert2Svg(layer, styleJson.sprite));
            if (legend[name].layers.length == 1) {
                legend[name].sourceType = layer.type;
            }

            //追加sprite，用于symbol符号
            legend[name].sprite = styleJson.sprite;
        }

        return legend;
    }

    // 转换为svg
    convert2Svg(layer, spirite) {
        var that = this;
        var res = {};
        if (layer.type == 'fill') {
            // 填充
            res.type = 'fill';
            if (layer['paint']) {
                var fill = {};
                if (layer['paint']['fill-color'] && layer['paint']['fill-color'] != '') {
                    // 颜色填充
                    var color = layer['paint']['fill-color'];
                    if (color && color != '') {
                        var hex = that.rgbToHex(color);
                        fill['fill'] = hex.hex;
                        fill['fill-opacity'] = hex.alpha;
                    } else {
                        fill['fill'] = '#fff';
                        fill['fill-opacity'] = 1;
                    }
                    // 外扩线
                    var outlineColor = layer['paint']['fill-outline-color'];
                    if (outlineColor && outlineColor != '') {
                        var hex = that.rgbToHex(outlineColor);
                        fill['stroke'] = hex.hex;
                        fill['stroke-opacity'] = hex.alpha;
                        fill['stroke-width'] = 1;
                    }
                } else if (layer['paint']['fill-pattern'] && layer['paint']['fill-pattern'] != '') {
                    // 填充图片

                    var rootPath = spirite.substring(0, spirite.lastIndexOf('/'));
                    var imgName = layer['paint']['fill-pattern'];
                    if (imgName && imgName != '') {
                        var imgPath = 'url(' + rootPath + '/pngs/' + imgName + '.png)';
                        fill['fill-pattern'] = imgPath;
                    }
                }
                res.style = fill;
            }
        } else if (layer.type == 'line') {
            // 线
            res.type = 'line';
            if (layer['paint']) {
                var line = {};
                if (layer['paint']['line-color'] && layer['paint']['line-color'] != '') {
                    // 颜色填充
                    var color = layer['paint']['line-color'];
                    if (color && color != '') {
                        var hex = that.rgbToHex(color);
                        line['stroke'] = hex.hex;
                        line['stroke-opacity'] = hex.alpha;
                    }
                    if (layer['paint']['line-width'] && layer['paint']['line-width'] != '') {
                        var width = layer['paint']['line-width'];
                        var svgWidth = 0;
                        if (typeof width == 'number') {
                            svgWidth = width;
                        } else {
                            svgWidth = width.base;
                        }
                        line['stroke-width'] = svgWidth;
                    }
                    if (layer['paint']['line-dasharray'] && layer['paint']['line-dasharray'] != '') {
                        var dasharray = layer['paint']['line-dasharray'];
                        var svgdasharray = undefined;
                        if (typeof dasharray == 'number') {
                            svgdasharray = dasharray;
                        } else {
                            svgdasharray = '';
                            dasharray.forEach(element => {
                                svgdasharray += element + ',';
                            });
                            svgdasharray = svgdasharray.substring(0, svgdasharray.length - 1);
                        }
                        line['stroke-dasharray'] = svgdasharray;
                    }
                }
                res.style = line;
            }
        } else if (layer.type == 'circle') {
            // 圆圈
            res.type = 'circle';
            if (layer['paint']) {
                var point = {};
                if (layer['paint']['circle-color'] && layer['paint']['circle-color'] != '') {
                    // 颜色填充
                    var color = layer['paint']['circle-color'];
                    if (color && color != '') {
                        var hex = that.rgbToHex(color);
                        point['fill'] = hex.hex;
                        point['fill-opacity'] = hex.alpha;
                    }
                    if (layer['paint']['circle-stroke-color'] && layer['paint']['circle-stroke-color'] != '') {
                        var strokeColor = layer['paint']['circle-stroke-color'];
                        if (strokeColor && strokeColor != '') {
                            var hex = that.rgbToHex(strokeColor);
                            point['stroke'] = hex.hex;
                            point['stroke-opacity'] = hex.alpha;
                        }
                    }
                    if (layer['paint']['circle-stroke-width'] && layer['paint']['circle-stroke-width'] != '') {
                        var width = layer['paint']['circle-stroke-width'];
                        var svgWidth = 0;
                        if (typeof width == 'number') {
                            svgWidth = width;
                        } else {
                            svgWidth = width.base;
                        }
                        point['stroke-width'] = svgWidth;
                    }
                    if (layer['paint']['circle-radius'] && layer['paint']['circle-radius'] != '') {
                        var radius = layer['paint']['circle-radius'];
                        var svgradius = 0;
                        if (typeof radius == 'number') {
                            svgradius = radius;
                        } else {
                            svgradius = radius.base;
                        }
                        point['r'] = svgradius;
                    }
                }
                res.style = point;
            }
        } else if (layer.type == 'symbol') {
            // 符号
            res.type = 'symbol';
            if (layer['layout']) {
                let layout = {};

                if (layer['layout']['symbol-placement']) {
                    layout.symbolplacement = layer['layout']['symbol-placement'];
                }

                if (layer['layout']['icon-image']) {
                    layout.iconimage = layer['layout']['icon-image'];
                }

                res.layout = layout;
            }
        }

        return res;
    }

    // rgba转16尽职颜色值
    rgbToHex(rgb) {
        var rRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/,
            r,
            g,
            b,
            a,
            rsa = rgb.replace(/\s+/g, '').match(rRgba);
        if (rsa) {
            r = (+rsa[1]).toString(16);
            r = r.length == 1 ? '0' + r : r;
            g = (+rsa[2]).toString(16);
            g = g.length == 1 ? '0' + g : g;
            b = (+rsa[3]).toString(16);
            b = b.length == 1 ? '0' + b : b;
            a = +(rsa[5] ? rsa[5] : 1);
            return { hex: '#' + r + g + b, alpha: Math.ceil(a) };
        } else {
            return { hex: rgb, alpha: 1 };
        }
    }







}