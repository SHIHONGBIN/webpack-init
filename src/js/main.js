var first = document.getElementById('first')
var btn = document.getElementById('btn')
var two = document.getElementById('two')
var res = document.getElementById('res')

btn.onclick = function(){
  var firstValue = parseFloat(first.value)
  var twoValue = parseFloat(two.value)
  //获取模块中sum
  // var sum = require('./module1')

  res.value = sumObj.sum(firstValue, twoValue)
}

//获取main.css文件
require('../css/main.css')
//获取scss文件
require('../css/scss/scss1.scss')
//获取less文件
require('../css/less/less1.less')

import sumObj from './module1.js'