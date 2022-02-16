const menuPage = function() {
  const menuDiv = document.createElement('div');
  menuDiv.classList.add('menu');

  const menuGrid = document.createElement('div');
  menuGrid.classList.add('menu-grid');

  const itemGrid = document.createElement('div');
  itemGrid.classList.add('menu-item-grid');

  const foodList = [
    {
      name: 'Spaghetti',
      description: 'Thick oodly noodles with a big steamy hunk of sauce.',
      price: 5.00
    },
    {
      name: 'Chili',
      description: 'Beans, beef, benevolent flavor. What more could you want?',
      price: 8.00
    },
    {
      name: 'Chili Dog',
      description: 'The best of both worlds: part chili, part dog, all in a fresh bun.',
      price: 4.00
    },
    {
      name: 'Jar of Honey',
      description: 'We have an entire attic full of bees! Honey leaks from the walls.',
      price: 0.00
    },
    {
      name: 'Existential Dread',
      description: "Oh my god; it's all going to stop one day, isn't it?",
      price: 99.99
    },
    {
      name: 'Breadsticks',
      description: "Not quite unlimited, but certainly more than you could eat!",
      price: 8.00
    }
  ]

  const dollarfy = (price) => {
    price = '$' +  price.toFixed(2);
    return price;
  }
  const addValue = (value, type) => {
    const element = document.createElement(type);
    element.textContent = value;
    itemGrid.appendChild(element);
  }

  for (const item of foodList) {
    addValue(item.name, 'h5');
    addValue(item.description, 'p');
    addValue(dollarfy(item.price), 'h6');
  }

  menuGrid.appendChild(itemGrid);
  menuDiv.appendChild(menuGrid);
  return menuDiv;
}

export default menuPage;

