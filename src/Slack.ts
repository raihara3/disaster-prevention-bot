class Slack {
  webhook_url: string
  title: string
  message: string

  constructor() {
    const scriptProperties = PropertiesService.getScriptProperties()
    this.webhook_url = scriptProperties.getProperty('WEBHOOK_URL')
    this.title = ""
    this.message = ""
  }

  setMessage(message) {
    this.message += message
  }

  setTitle(title) {
    this.title = title
  }

  send() {
    const attachments = [{
      "title": this.title,
      "fallback": "",
      "color": "#ff8c00",
      "attachment_type": "default",
      "text": this.message
    }]
    const payload = {
      "attachments": attachments
    }
    const options = {
      "method" : "post",
      "payload" : JSON.stringify(payload)
    }
    UrlFetchApp.fetch(this.webhook_url, options)
  }
}

export default Slack
