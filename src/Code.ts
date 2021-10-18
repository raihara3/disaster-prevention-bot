import AtomFeed from './AtomFeed'
import KishouFeed from './KishouFeed'
import Slack from './Slack'

function disasterPreventionInformation() {
  const readTitle = ["震源・震度に関する情報"]

  const atomFeed = new AtomFeed()
  const jisinKazan = atomFeed.fetch("http://www.data.jma.go.jp/developer/xml/feed/eqvol.xml")

  const nowTime = new Date()
  const SPECIFIED_UPDATE_TIME_MIN = 10
  jisinKazan.forEach(news => {
    const updatedTime = new Date(news.updated);
    const diff = updatedTime.getTime() - nowTime.getTime();
    const diffMinutes = Math.abs(diff) / (60*1000)

    if(diffMinutes <= SPECIFIED_UPDATE_TIME_MIN) { // && readTitle.indexOf(news.title) > -1
      if(news.title === "震源・震度に関する情報") {
        _jisin(news)
      }else {
        const slack = new Slack()
        slack.setTitle(`${news.author} から ${news.title}`)
        slack.setMessage(news.content)
        slack.send()
      }
    }
  })
}

const EARTHQUAKE_INTENSITY_LOWER_LIMIT = 5
function _jisin(news) {
  const kishouFeed = new KishouFeed()
  const jisin = kishouFeed.fetch("http://www.data.jma.go.jp/developer/xml/data/20211018062428_0_VXSE53_270000.xml")
  if(Number(jisin.maxInt) < EARTHQUAKE_INTENSITY_LOWER_LIMIT) return

  // 最大震度が５以上の場合
  const slack = new Slack()
  slack.setTitle(`${news.author} から ${news.title}`)
  let message = `${news.content}\n`
  message += `${jisin.locationName}で最大震度${EARTHQUAKE_INTENSITY_LOWER_LIMIT}以上\nhttps://www.jma.go.jp/bosai/map.html#contents=earthquake_map \n`
  message += `<!channel> スレッドに安否確認をお願いします。(無事か・現在地)`
  slack.setMessage(message)

  slack.send()
}

function weatherInformation() {
  const readTitle = ["全般気象情報"]

  const atomFeed = new AtomFeed()
  const jisinKazan = atomFeed.fetch("http://www.data.jma.go.jp/developer/xml/feed/extra.xml")

  const nowTime = new Date()
  const SPECIFIED_UPDATE_TIME_MIN = 60
  jisinKazan.forEach(news => {
    const updatedTime = new Date(news.updated);
    const diff = updatedTime.getTime() - nowTime.getTime();
    const diffMinutes = Math.abs(diff) / (60*1000)

    if(diffMinutes <= SPECIFIED_UPDATE_TIME_MIN && readTitle.indexOf(news.title) > -1) {
      const slack = new Slack()
      slack.setTitle(`${news.author} から ${news.title}`)
      slack.setMessage(news.content + "\n" + "https://www.jma.go.jp/bosai/map.html#element=information&contents=information")
      slack.send()
    }
  })
}
