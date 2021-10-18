class AtomFeed {
  namespace: GoogleAppsScript.XML_Service.Namespace

  constructor() {
    this.namespace = XmlService.getNamespace('http://www.w3.org/2005/Atom')
  }

  fetch(url: string) {
    const response = UrlFetchApp.fetch(url)
    const xmlDoc = XmlService.parse(response.getContentText())
    const rootDoc = xmlDoc.getRootElement()
    const entries = Array.from(rootDoc.getChildren('entry', this.namespace))

    return entries.map(entry => {
      return {
        title: entry.getChild("title", this.namespace).getText(),
        updated: entry.getChild("updated", this.namespace).getText(),
        author: entry.getChild("author", this.namespace).getChild("name", this.namespace).getText(),
        link: entry.getChild('link', this.namespace).getAttribute('href').getValue(),
        content: entry.getChild("content", this.namespace).getText(),
      }
    })
  }
}

export default AtomFeed
