export class StringUtility {

    static isEmpty(input) {
        return input == null || input == '';
    }

    // 字符串转驼峰
    static convertToCamelCase(str) {
        // 去除中划线分隔符获取单词数组
        var strArr = str.split('-');
        // 如果第一个为空，则去掉
        if (strArr[0] === '') {
            strArr.shift();
        }
        // 遍历第二个单词到最后一个单词，并转换单词首字母为答谢
        for (var i = 1, len = strArr.length; i < len; i++) {
            // 如果不为空，则转成大写
            if (strArr[i] !== '') {
                strArr[i] = strArr[i][0].toUpperCase() + strArr[i].substring(1);
            }
        }
        return strArr.join('');
    }

    // 驼峰转换为字符串_
    static convertToDivisionCase(str) {
        // 去除中划线分隔符获取单词数组
        let divisionStr = str.replace(/([A-Z])/g, "_$1").toLowerCase()
        return divisionStr;
    }


    static isNotEmpty(input) {
        return !this.isEmpty(input);
    }

    static isBlank(input) {
        return input == null || /^\s*$/.test(input);
    }


    static isNotBlank(input) {
        return !this.isBlank(input);
    }

    static trim(input) {
        return input.replace(/^\s+|\s+$/, '');
    }

    static trimToEmpty(input) {
        return input == null ? "" : this.trim(input);
    }

    static startsWith(input, prefix) {
        return input.indexOf(prefix) === 0;
    }

    static endsWith(input, suffix) {
        return input.lastIndexOf(suffix) !== -1;
    }

    static contains(input, searchSeq) {
        return input.indexOf(searchSeq) >= 0;
    }

    static equals(input1, input2) {
        return input1 == input2;
    }

    static equalsIgnoreCase(input1, input2) {
        return input1.toLocaleLowerCase() == input2.toLocaleLowerCase();
    }

    static containsWhitespace(input) {
        return this.contains(input, ' ');
    }

    //生成指定个数的字符 
    static repeat(ch, repeatTimes) {
        var result = "";
        for (var i = 0; i < repeatTimes; i++) {
            result += ch;
        }
        return result;
    }

    static deleteWhitespace(input) {
        return input.replace(/\s+/g, '');
    }

    static rightPad(input, size, padStr) {
        return input + this.repeat(padStr, size);
    }

    static leftPad(input, size, padStr) {
        return this.repeat(padStr, size) + input;
    }

    //首小写字母转大写 
    static capitalize(input) {
        var strLen = 0;
        if (input == null || (strLen = input.length) == 0) {
            return input;
        }
        return input.replace(/^[a-z]/, function(matchStr) {
            return matchStr.toLocaleUpperCase();
        });
    }

    //首大写字母转小写 
    static uncapitalize(input) {
        var strLen = 0;
        if (input == null || (strLen = input.length) == 0) {
            return input;
        }
        return input.replace(/^[A-Z]/, function(matchStr) {
            return matchStr.toLocaleLowerCase();
        });
    }

    //大写转小写，小写转大写 
    static swapCase(input) {
        return input.replace(/[a-z]/ig, function(matchStr) {
            if (matchStr >= 'A' && matchStr <= 'Z') {
                return matchStr.toLocaleLowerCase();
            } else if (matchStr >= 'a' && matchStr <= 'z') {
                return matchStr.toLocaleUpperCase();
            }
        });
    }

    //统计含有的子字符串的个数 
    static countMatches(input, sub) {
            if (this.isEmpty(input) || this.isEmpty(sub)) {
                return 0;
            }
            var count = 0;
            var index = 0;
            while ((index = input.indexOf(sub, index)) != -1) {
                index += sub.length;
                count++;
            }
            return count;
        }
        //只包含字母 
    static isAlpha(input) {
            return /^[a-z]+$/i.test(input);
        }
        //只包含字母、空格 
    static isAlphaSpace(input) {
            return /^[a-z\s]*$/i.test(input);
        }
        //只包含字母、数字 
    static isAlphanumeric(input) {
            return /^[a-z0-9]+$/i.test(input);
        }
        //只包含字母、数字和空格 
    static isAlphanumericSpace(input) {
            return /^[a-z0-9\s]*$/i.test(input);
        }
        //数字 
    static isNumeric(input) {
            return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input);
        }
        //小数 
    static isDecimal(input) {
            return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input);
        }
        //负小数 
    static isNegativeDecimal(input) {
            return /^\-?(?:0|[1-9]\d*)\.\d+$/.test(input);
        }
        //正小数 
    static isPositiveDecimal(input) {
            return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input);
        }
        //整数 
    static isInteger(input) {
            return /^[-+]?(?:0|[1-9]\d*)$/.test(input);
        }
        //正整数 
    static isPositiveInteger(input) {
            return /^\+?(?:0|[1-9]\d*)$/.test(input);
        }
        //负整数 
    static isNegativeInteger(input) {
            return /^\-?(?:0|[1-9]\d*)$/.test(input);
        }
        //只包含数字和空格 
    static isNumericSpace(input) {
        return /^[\d\s]*$/.test(input);
    }

    static isWhitespace(input) {
        return /^\s*$/.test(input);
    }
    static isAllLowerCase(input) {
        return /^[a-z]+$/.test(input);
    }
    static isAllUpperCase(input) {
        return /^[A-Z]+$/.test(input);
    }
    static defaultString(input, defaultStr) {
        return input == null ? defaultStr : input;
    }
    static defaultIfBlank(input, defaultStr) {
        return this.isBlank(input) ? defaultStr : input;
    }
    static defaultIfEmpty(input, defaultStr) {
            return this.isEmpty(input) ? defaultStr : input;
        }
        //字符串反转 
    static reverse(input) {
            if (this.isBlank(input)) {
                input;
            }
            return input.split("").reverse().join("");
        }
        //删掉特殊字符(英文状态下) 
    static removeSpecialCharacter(input) {
            return input.replace(/[!-/:-@\[-`{-~]/g, "");
        }
        //只包含特殊字符、数字和字母（不包括空格，若想包括空格，改为[ -~]） 
    static isSpecialCharacterAlphanumeric(input) {
            return /^[!-~]+$/.test(input);
        }
        /** 
         * 校验时排除某些字符串，即不能包含某些字符串 
         * @param {Object} conditions:里面有多个属性，如下： 
         * 
         * @param {String} matcherFlag 匹配标识 
         * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文; 
         * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文； 
         * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文； 
         * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文； 
         * 100：所有字符; 
         * @param {Array} excludeStrArr 排除的字符串，数组格式 
         * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5 
         * @param {Boolean} ignoreCase 是否忽略大小写 
         * conditions={matcherFlag:"0",excludeStrArr:[],length:"",ignoreCase:true} 
         */
    static isPatternMustExcludeSomeStr(input, conditions) {
            //参数 
            var matcherFlag = conditions.matcherFlag;
            var excludeStrArr = conditions.excludeStrArr;
            var length = conditions.length;
            var ignoreCase = conditions.ignoreCase;
            //拼正则 
            var size = excludeStrArr.length;
            var regex = (size == 0) ? "^" : "^(?!.*(?:{0}))";
            var subPattern = "";
            for (var i = 0; i < size; i++) {
                excludeStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(excludeStrArr[i]);
                subPattern += excludeStrArr[i];
                if (i != size - 1) {
                    subPattern += "|";
                }
            }
            regex = this.format(regex, [subPattern]);
            switch (matcherFlag) {
                case '0':
                    regex += "\\d";
                    break;
                case '1':
                    regex += "[a-zA-Z]";
                    break;
                case '2':
                    regex += "[a-z]";
                    break;
                case '3':
                    regex += "[A-Z]";
                    break;
                case '4':
                    regex += "[!-/:-@\[-`{-~]";
                    break;
                case '5':
                    regex += "[\u4E00-\u9FA5]";
                    break;
                case '6':
                    regex += "[a-zA-Z0-9]";
                    break;
                case '7':
                    regex += "[a-z0-9]";
                    break;
                case '8':
                    regex += "[A-Z0-9]";
                    break;
                case '9':
                    regex += "[!-~]";
                    break;
                case '10':
                    regex += "[0-9\u4E00-\u9FA5]";
                    break;
                case '11':
                    regex += "[a-z!-/:-@\[-`{-~]";
                    break;
                case '12':
                    regex += "[A-Z!-/:-@\[-`{-~]";
                    break;
                case '13':
                    regex += "[a-zA-Z!-/:-@\[-`{-~]";
                    break;
                case '14':
                    regex += "[a-z\u4E00-\u9FA5]";
                    break;
                case '15':
                    regex += "[A-Z\u4E00-\u9FA5]";
                    break;
                case '16':
                    regex += "[a-zA-Z\u4E00-\u9FA5]";
                    break;
                case '17':
                    regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '18':
                    regex += "[\u4E00-\u9FA5!-~]";
                    break;
                case '19':
                    regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '20':
                    regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '100':
                    regex += "[\s\S]";
                    break;
                default:
                    alert(matcherFlag + ":This type is not supported!");
            }
            regex += this.isNotBlank(length) ? "{" + length + "}" : "+";
            regex += "$";
            var pattern = new RegExp(regex, ignoreCase ? "i" : "");
            return pattern.test(input);
        }
        /** 
         * @param {String} message 
         * @param {Array} arr 
         * 消息格式化 
         */
    static format(message, arr) {
            return message.replace(/{(\d+)}/g, function(matchStr, group1) {
                return arr[group1];
            });
        }
        /** 
         * 把连续出现多次的字母字符串进行压缩。如输入:aaabbbbcccccd 输出:3a4b5cd 
         * @param {String} input 
         * @param {Boolean} ignoreCase : true or false 
         */
    static compressRepeatedStr(input, ignoreCase) {
            var pattern = new RegExp("([a-z])\\1+", ignoreCase ? "ig" : "g");
            return result = input.replace(pattern, function(matchStr, group1) {
                return matchStr.length + group1;
            });
        }
        /** 
         * 校验必须同时包含某些字符串 
         * @param {String} input 
         * @param {Object} conditions:里面有多个属性，如下： 
         * 
         * @param {String} matcherFlag 匹配标识 
         * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文; 
         * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文； 
         * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文； 
         * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文； 
         * 100：所有字符; 
         * @param {Array} excludeStrArr 排除的字符串，数组格式 
         * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5 
         * @param {Boolean} ignoreCase 是否忽略大小写 
         * conditions={matcherFlag:"0",containStrArr:[],length:"",ignoreCase:true} 
         * 
         */
    static isPatternMustContainSomeStr(input, conditions) {
            //参数 
            var matcherFlag = conditions.matcherFlag;
            var containStrArr = conditions.containStrArr;
            var length = conditions.length;
            var ignoreCase = conditions.ignoreCase;
            //创建正则 
            var size = containStrArr.length;
            var regex = "^";
            var subPattern = "";
            for (var i = 0; i < size; i++) {
                containStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(containStrArr[i]);
                subPattern += "(?=.*" + containStrArr[i] + ")";
            }
            regex += subPattern;
            switch (matcherFlag) {
                case '0':
                    regex += "\\d";
                    break;
                case '1':
                    regex += "[a-zA-Z]";
                    break;
                case '2':
                    regex += "[a-z]";
                    break;
                case '3':
                    regex += "[A-Z]";
                    break;
                case '4':
                    regex += "[!-/:-@\[-`{-~]";
                    break;
                case '5':
                    regex += "[\u4E00-\u9FA5]";
                    break;
                case '6':
                    regex += "[a-zA-Z0-9]";
                    break;
                case '7':
                    regex += "[a-z0-9]";
                    break;
                case '8':
                    regex += "[A-Z0-9]";
                    break;
                case '9':
                    regex += "[!-~]";
                    break;
                case '10':
                    regex += "[0-9\u4E00-\u9FA5]";
                    break;
                case '11':
                    regex += "[a-z!-/:-@\[-`{-~]";
                    break;
                case '12':
                    regex += "[A-Z!-/:-@\[-`{-~]";
                    break;
                case '13':
                    regex += "[a-zA-Z!-/:-@\[-`{-~]";
                    break;
                case '14':
                    regex += "[a-z\u4E00-\u9FA5]";
                    break;
                case '15':
                    regex += "[A-Z\u4E00-\u9FA5]";
                    break;
                case '16':
                    regex += "[a-zA-Z\u4E00-\u9FA5]";
                    break;
                case '17':
                    regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '18':
                    regex += "[\u4E00-\u9FA5!-~]";
                    break;
                case '19':
                    regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '20':
                    regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                    break;
                case '100':
                    regex += "[\s\S]";
                    break;
                default:
                    alert(matcherFlag + ":This type is not supported!");
            }
            regex += this.isNotBlank(length) ? "{" + length + "}" : "+";
            regex += "$";
            var pattern = new RegExp(regex, ignoreCase ? "i" : "");
            return pattern.test(input);
        }
        //中文校验 
    static isChinese(input) {
            return /^[\u4E00-\u9FA5]+$/.test(input);
        }
        //去掉中文字符 
    static removeChinese(input) {
        return input.replace(/[\u4E00-\u9FA5]+/gm, "");
    }


};