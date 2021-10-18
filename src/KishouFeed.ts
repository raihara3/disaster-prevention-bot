class KishouFeed {
  namespace: GoogleAppsScript.XML_Service.Namespace

  constructor() {
    this.namespace = XmlService.getNamespace('http://xml.kishou.go.jp/jmaxml1/body/seismology1/')
  }

  fetch(url: string) {
    const response = UrlFetchApp.fetch(url)
    const xmlDoc = XmlService.parse(response.getContentText())
    const rootDoc = xmlDoc.getRootElement()

    const locationName = rootDoc.getChild("Body", this.namespace)
      .getChild("Earthquake", this.namespace).getChild("Hypocenter", this.namespace)
      .getChild("Area", this.namespace).getChild("Name", this.namespace).getText()
    const maxInt = rootDoc.getChild("Body", this.namespace)
      .getChild("Intensity", this.namespace).getChild("Observation", this.namespace)
      .getChild("MaxInt", this.namespace).getText()

      return {
        locationName,
        maxInt
      }
  }
}

export default KishouFeed
