var http = require("http")
var cheerio = require("cheerio")
var baseUrl = "http://www.imooc.com/learn/"

var fetchChapterArray = []
var videosId = [637,348,259,197,134,75]

videosId.forEach(function(element, index) {
	fetchChapterArray.push(getPageAsync(baseUrl + element))
});

Promise
.all(fetchChapterArray)
.then(function(pages) {
	var pagesData = []
	pages.forEach(function(element) {
		var page = filterPage(element)
		pagesData.push(page)
	});

	pagesData.sort(function(a,b) {
		return a.number < b.number
	})

	showPages(pagesData)
})


function getPageAsync(url) {
	return new Promise(function(resolve,reject) {
		console.log("正在爬取 " + url)
		http
		.get(url,function(res) {
			var html = ""
			res.on("data",function(data) {
				html += data
			})
			res.on("end",function() {
				resolve(html)
			})
		})
		.on("error",function(error) {
			reject(error)
		})
	})
} 

function filterPage(html) {
	var $  = cheerio.load(html)
	var chapters = $(".chapter");

	var rtData = {
		title : "",
		number : "",
		chapters : []
	}

	rtData.title = $(".hd").find("h2").text()
	//目前学习人数获取不到,因为爬取的页面没有这个值
	rtData.number = $(".js-learn-num").text()

	chapters.each(function(index, el) {

		var chapter = {
			chapterTitle : "",
			videos : []
		}
		chapter.chapterTitle = $(el).find("strong").text()

		var videos = $(el).find(".J-media-item");
		videos.each(function(index, el) {
			var video = {
				videoId : "",
				videoTitle : ""
			}
			video.videoId = $(el).attr("href").split("/video/")[1]
			video.videoTitle = $(el).text()
			chapter.videos.push(video)
		})

		rtData.chapters.push(chapter)
	})
	return rtData
}

function showPages(pages) {
	pages.forEach( function(element, index) {
		console.log(element.number + "人学过【" + element.title + "】")
	});
	pages.forEach( function(element, index) {
		console.log(element.title + "\n")
		element.chapters.forEach(function(element, index) {
			console.log(element.chapterTitle)
			element.videos.forEach( function(element, index) {
				console.log("【" + element.videoId + "】" + element.videoTitle)
			});
		});
	});
}