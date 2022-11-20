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
  const gradientColour = [
    [new Color("435d88"), new Color("96bae8")],
    [new Color("e5a4a5"), new Color("ffe9dc")],
    [new Color("baecce"), new Color("e0fdcc")],
    [new Color("64afd9"), new Color("d0f0fd")],
    [new Color("c56b86"), new Color("f5cbd9")],
    [new Color("0c1f54"), new Color("285c8b")]
  ]
  // Add background gradient
  let time = Math.floor(new Date().getHours() / 4)
  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = gradientColour[time]
  widget.backgroundGradient = gradient
  await setImage(widget, time)

  return widget
}

async function setImage(widget, index) {
  const image_url = `https://raw.githubusercontent.com/Pieloaf/spiritclock_widget/main/imgs/${index}.png`

  let req = new Request(image_url)
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