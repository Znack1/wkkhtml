/*
 * @Author: wutt
 * @Date: 2020-11-08 18:13:00
 * @LastEditors: wutt
 * @LastEditTime: 2020-11-08 18:52:12
 * @Description: 
 * @FilePath: /html/src/utility/rem.js
 */
/**
 * @Author: wutt
 * @Date: 2020-11-08 18:24:40
 * @Description: 设置当前 1rem为多少px  1920/96 =20 px
 */
function setRemUnit() {
    const html = document.querySelector('html');
    const { width } = html.getBoundingClientRect();
    html.style.fontSize = `${width / 96}px`;
}
window.addEventListener('resize', setRemUnit);
setRemUnit();