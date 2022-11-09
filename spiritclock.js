let widget = await createWidget()

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  widget.presentMedium()
  widget.refreshAfterDate = calculateRefresh()
}

Script.complete()

async function createWidget() {
  let widget = new ListWidget()
  const gradientColour = [[new Color("435d88"),
    new Color("96bae8")],[new Color("e5a4a5"),
    new Color("ffe9dc")],[new Color("baecce"),new Color("e0fdcc")],[new Color("64afd9"), new Color("d0f0fd")],[new Color("c56b86"),
    new Color("f5cbd9")],        [new Color("0c1f54"),
    new Color("285c8b")]]
  // Add background gradient
  let time = Math.floor(new Date().getHours()/4)
  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = gradientColour[time]
   widget.backgroundGradient = gradient
   await setImage(widget, time)

  return widget
}

async function setImage(widget, time){
  const images =   ["1032388496901546066/0.png",
"1032388497274851398/1.png",
"1032388497702658068/2.png",
"1032388498147258418/3.png",
"1032388498600235068/4.png",
"1032388498981929022/5.png"]
  const prefix = "https://cdn.discordapp.com/attachments/755447825520787477/"

  let req = new Request(prefix+images[time])
  let image = await req.loadImage()
  let clockImage = widget.addImage(image)
  clockImage.applyFillingContentMode()
  return 0
}

function calculateRefresh() {
  const ONE_HOUR = 10006060;
  let syncAt = 0;
  let timeUntilHour = ONE_HOUR - (new Date().getTime() % ONE_HOUR);
  let nextHour = new Date().getHours() + 1;
  while (nextHour > syncAt) {
    syncAt += 4;
  }

  return new Date(new Date().getTime() + ((syncAt - nextHour) * ONE_HOUR + timeUntilHour))
}