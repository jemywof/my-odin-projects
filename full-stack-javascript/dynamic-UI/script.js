const DropDownMenu = (() => {
  let isLoaded = false
  let isDropped = false
  const toggle = function () {
    if (DropDownMenu.isLoaded) {
      const mainDiv = document.querySelector('.drop-down-div')
      mainDiv.remove()
      DropDownMenu.isLoaded = false
      return
    }
    const mainDiv = document.createElement('div')
    mainDiv.classList.add('drop-down-div')

    const dropDownHead = document.createElement('p')
    dropDownHead.textContent = 'Drip?'
    dropDownHead.classList.add('drop-down-head')
    mainDiv.appendChild(dropDownHead)

    const dropList = document.createElement('div')
    dropList.classList.add('drop-down-list')

    const dropContent = document.createElement('div')
    dropContent.classList.add('drop-down-content')
    dropList.appendChild(dropContent)

    const addOption = function (name) {
      const newOption = document.createElement('p')
      newOption.textContent = name
      dropContent.appendChild(newOption)
    }

    addOption('Option 1')
    addOption('Option 2')
    addOption('Option 3')
    addOption('Option 4')

    mainDiv.appendChild(dropList)


    const header = document.querySelector('header')
    header.appendChild(mainDiv)
    DropDownMenu.isLoaded = true
  }

  return {
    toggle
    }
})()

const MobileMenu = (() => {
  let isLoaded = false
  const toggle = function () {
    if (MobileMenu.isLoaded) {
      const mainDiv = document.querySelector('.mobile-menu-div')
      mainDiv.remove()
      MobileMenu.isLoaded = false
      return
    }
    const mainDiv = document.createElement('div')
    mainDiv.classList.add('mobile-menu-div')

    for (let i = 0; i <= 2; i++) {
      const mobileButton = document.createElement('button')
      mobileButton.textContent = 'BUTTON?'
      mobileButton.classList.add('mobile-button')
      mobileButton.onclick = function() {
        this.textContent = 'I DO NOTHING'
      }
      mainDiv.appendChild(mobileButton)
    }

    const footer = document.querySelector('footer')
    footer.appendChild(mainDiv)
    MobileMenu.isLoaded = true;
  }
  return {
    toggle,
  }
})()

const ImageSlider = (() => {
  let isLoaded = false
  const IMAGECOUNT = 3
  let activeImageIndex = 0
  const toggle = function () {
    if (ImageSlider.isLoaded) {
      const mainDiv = document.querySelector('.image-slider-div')
      mainDiv.remove()
      ImageSlider.isLoaded = false
      return
    }
    const mainDiv = document.createElement('div')
    mainDiv.classList.add('image-slider-div')

    const imageFrame = document.createElement('div')
    imageFrame.classList.add('image-frame')
    mainDiv.appendChild(imageFrame)

    const longImageBox = document.createElement('div')
    longImageBox.classList.add('long-image-box')
    imageFrame.appendChild(longImageBox)

    const insertImage = function (source, id, alt) {
      const image = document.createElement('img')
      image.classList.add('slider-image')
      image.setAttribute('src', source)
      image.id = `slider${id}`;
      if (alt) {
        image.setAttribute('alt', alt)
      }
      imageFrame.appendChild(image)
    }

    insertImage('images/first.jpg', 0, 'garfield as art')
    insertImage('images/second.jpg', 1, 'a garfield plushy in a car')
    insertImage('images/third.jpg', 2, 'a cat that almost looks like garfield')

    const navContainer = document.createElement('div')
    navContainer.classList.add('nav-container')
    mainDiv.appendChild(navContainer)

    //createArrow: adds the arrows to the UI
    //also holds the arrows' 'slide' functionality (bad design oops)
    const createArrow = function (src, direction) {
      const arrow = document.createElement('img')
      arrow.classList.add('nav-arrow')
      arrow.setAttribute('src', src)
      arrow.onclick = function () {
        const previouslyActiveDot = document.getElementById(`arrow${activeImageIndex}`)
        if (previouslyActiveDot == null) {
          console.error(`previouslyActiveDot is set to ${previouslyActiveDot}`)
          return
        }

        const oldImage = document.getElementById(`slider${activeImageIndex}`)

        activeImageIndex += direction
        if (activeImageIndex < 0) {
          activeImageIndex = 0
          return
        }
        if (activeImageIndex > IMAGECOUNT - 1) {
          activeImageIndex = IMAGECOUNT - 1
          return
        }

        const activeDot = document.getElementById(`arrow${activeImageIndex}`)
        if (activeDot == null) {
          console.error(`activeDot is set to ${activeDot}`)
          return
        }
        const newImage = document.getElementById(`slider${activeImageIndex}`)

        previouslyActiveDot.classList.remove('dot-active')
        oldImage.classList.remove('active')
        activeDot.classList.add('dot-active')
        newImage.classList.add('active')

      }
      navContainer.appendChild(arrow)
    }

    const leftDirection = -1
    const rightDirection = 1

    const createDot = function (number) {
      const dot = document.createElement('div')
      dot.classList.add('image-dot')
      dot.id = `arrow${number}`
      navContainer.appendChild(dot)
      if (number === 0) {
        dot.classList.add('dot-active')
      }
    }

    createArrow('images/left-arrow.png', leftDirection)

    for (let i = 0; i < IMAGECOUNT; i++) {
      createDot(i)
    }
    
    createArrow('images/right-arrow.png', rightDirection)

    const buttonList = document.querySelector('.button-list')
    buttonList.appendChild(mainDiv)
    ImageSlider.isLoaded = true

    //make the first image visible (bad design again oops)
    document.getElementById(`slider0`).classList.add('active')

  }
  return {
    toggle,
  }
})()

const dropDownButton = document.getElementById('dropdown')
dropDownButton.onclick = function () {
  DropDownMenu.toggle()
}
const mobileMenuButton = document.getElementById('mobile')
mobileMenuButton.onclick = function () {
  MobileMenu.toggle()
}

const sliderButton = document.getElementById('slider')
sliderButton.onclick = function () {
  ImageSlider.toggle()
}
