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

    const addOption = function (name) {
      const newOption = document.createElement('a')
      newOption.classList.add('drop-down-item')
      newOption.textContent = name
      dropList.appendChild(newOption)
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

  /*const toggleDropDown = function (dropDiv) {
    if (DropDownMenu.isDropped) {
      items = document.querySelectorAll('.drop-down-item')
      items.forEach(item => {
        item.remove()
      })
      DropDownMenu.isDropped = false
      return
    }
    if (!dropDiv) {
      console.error('Dropdown menu has not been loaded. Sorry!')
      return
    }

    const dropList = document.createElement('div')
    dropList.classList.add('drop-list')
    const addOption = function (name) {
      const newOption = document.createElement('a')
      newOption.classList.add('drop-down-item')
      newOption.textContent = name
      dropList.appendChild(newOption)
    }

    addOption('Option 1')
    addOption('Option 2')
    addOption('Option 3')
    addOption('Option 4')

    dropDiv.appendChild(dropList)

    DropDownMenu.isDropped = true
  }
  */

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
        this.textContent = 'I DO NOTHING LOL'
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

    const insertImage = function (source, alt) {
      const image = document.createElement('img')
      image.classList.add('slider-image')
      image.setAttribute('src', source)
      if (alt) {
        image.setAttribute('alt', alt)
      }
      imageFrame.appendChild(image)
    }

    insertImage('images/first.jpg', 'garfield as art')
    insertImage('images/second.jpg', 'a garfield plushy in a car')
    insertImage('images/third.jpg', 'a cat that almost looks like garfield')

    const buttonList = document.querySelector('.button-list')
    buttonList.appendChild(mainDiv)
    ImageSlider.isLoaded = true
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
