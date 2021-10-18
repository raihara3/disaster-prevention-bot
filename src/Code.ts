import Slack from './Slack'
import AtomFeed from './AtomFeed'

function sendSlack(){
  const atomFeed = new AtomFeed()
  const jisinKazan = atomFeed.fetch("http://www.data.jma.go.jp/developer/xml/feed/eqvol.xml")

  // const slack = new Slack()
  // slack.addMessage("test")
  // slack.send()
}
