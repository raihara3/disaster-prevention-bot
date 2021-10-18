import Slack from './Slack'

function sendSlack(){
  const slack = new Slack()
  slack.addMessage("test")
  slack.send()
}
