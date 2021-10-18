class Slack {
  webhook_url: string
  message: string

  constructor() {
    const scriptProperties = PropertiesService.getScriptProperties()
    this.webhook_url = scriptProperties.getProperty('WEBHOOK_URL')
    this.message = ""
  }

  addMessage(message) {
    this.message += message
  }

  send() {
    const json = {
      "text": this.message
    }
    const payload = JSON.stringify(json);
    const options = {
      "method" : "post",
      "contentType" : "application/json",
      "payload" : payload
    }
    UrlFetchApp.fetch(this.webhook_url, options)
  }
}

export default Slack
