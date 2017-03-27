//这个代码实现了从兰州大学新闻中心的网站上爬取新闻的标题

// 引入模块
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');

// 创建http get请求
http.get("http://news.lzu.edu.cn/zhuanti/bnldqyp/", function(res) {
    var html = ''; // 保存抓取到的HTML源码
    var news = [];  // 保存解析HTML后的数据
    res.setEncoding('utf-8');

    // 抓取页面内容
    res.on('data', function(chunk) {
        html += chunk;
    });
    

    //网页内容抓取完毕
    res.on('end', function() {
       	//console.log(html);
        var $ = cheerio.load(html);

        $('#listPage li').each(function(index,item) {
            var news_item = {
                title: $('a',this).attr('title'), // 获取新闻标题
                time: $('span',this).text(), // 获取新闻时间
                link: 'http://news.lzu.edu.cn' + $('a',this).attr('href'), // 获取新闻详情页链接
            };
            // 把所有新闻放在一个数组里面
            news.push(news_item);
        });
        console.log(news);
    });

}).on('error', function(err) {
    console.log(err);
});
