const items = document.getElementById(`items`);
const image = document.getElementsByClassName(`image`)
const apiUrl = document.getElementsByName(`http://localhost:3000/api/products`);

image.forEach(img =>
  img.addEventListener(`click`, e => (image.src = e.target.scr)));


//Change items image to scr of clicked image
function imageClick(e) {
  img.src = e.target.src;

}
//display each product
let selectImage = [`items`];
console.log(selectImage[0, 1, 2]);


//fetch product
const getListing = () =>
  fetch(`http://localhost:3000/api/products`); {
  method: `POST`,
    headers; {
    `Content-type`; `product/json`
  };
  body: JSON.stringify({
    name: `Item`
  })

    .then(respose => response.json())
    .then(data => console.log(data))
}
renderHeader()
getListing()
//function to product

const getData = async () => {
  try {
    const response = await fetch(apiUrl);
    const jsonResponse = await response.json();

    jsonResponse.forEch(product => {
      items.innerhtml += `
    <a href="./product.html?id=$ {product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altText}">            
              <h3 class="productName">${product.name.toUpperCase()}</h3>
              <p class="productDescription">${product.description}</p>  
            </article>
            </a>`;
    })

  }

  catch (error) {
    console.log(error)
  }
}
console.log(getData)


//Function to display all products on home page
async function getAllProducts() {

  const postPromise = makeRequest(`GET`, apiUrl, {
  });
  try {
    const postResponse = await postPromise;
    postResponse.forEach(element => {
      const div1 = document.createElement('div');
      div1.className = "";
      items.appendChild(div1);
      const div2 = document.createElement('div');
      div2.className = "card shadow";
      //div2.style.width = "18rem";
      div1.appendChild(div2);
      const img = document.createElement('img');
      img.className = "card-img-top img-responsive";
      //img.style.width = "18rem";
      //img.style.height = "16rem";
      img.src = items.imageUrl;
      img.alt = "";
      div2.appendChild(img);
      const div3 = document.createElement('div');
      div3.className = "card-body";
      div2.appendChild(div3);
      const h5 = document.createElement('h5');
      h5.className = "card-title text-center";
      h5.innerHTML = items.name;
      div3.appendChild(h5);
      /*const p = document.createElement('p');
            p.className = "card-text";
            p.innerHTML = element.description;
            div3.appendChild(p);
            const div4 = document.createElement('div');
              div4.className = "card-body flex_colors";
              div3.appendChild(div4);
              const select = document.createElement('select');
              select.id = 'color'+element.colors+element._id;
              select.className = "card-text";
              select.value = "Select Color";
              select.innerHTML = "Select Color";
              select.style.width = "100%";
              var opt = document.createElement('option');
              opt.value = "Select Color";
              opt.innerHTML = "Select Color";
              select.appendChild(opt);
              
              
            element.colors.forEach(colors => {
              var opt = document.createElement('option');
                      opt.className = "color_"+colors+" border";
                      opt.value = colors;
                      opt.innerHTML = colors;
                      select.appendChild(opt);
            });
            div3.appendChild(select);*/


      const p2 = document.createElement('p');
      p2.className = "card-text";
      p2.innerHTML = "Price " + Intl.NumberFormat('en-US', { currency: "USD", style: 'currency' }).format(element.price);;
      div3.appendChild(p2);
      /*const a = document.createElement('a');
      a.className = "btn btn-primary stretched-link";
      div3.appendChild(a);*/

      /*const button1 = document.createElement('a');
      button1.className = "btn btn-danger";
      button1.type = "button";
      button1.style.marginRight = "5%";
      button1.innerHTML = "Remove from cart";
      button1.id = element._id;
      //button1.formMethod = "POST";
      button1.onclick = function() {
        removeFromCart(element,1,"/","_self");
        //parent.open("/", '_self');
      };
      div3.appendChild(button1);*/

      /*const button2 = document.createElement('a');
      button2.className = "btn btn-primary card-text";
      button2.type = "button";
      button2.innerHTML = "Add to cart";
      button2.id = element._id;
      //button2.formMethod = "POST";
      button2.onclick = function() {
        updateCart(element,1,"/","_self");
        //updateCart(element,1);
        //parent.open("/", '_self');
      };
      div3.appendChild(button2);*/

      const button3 = document.createElement('a');
      button3.className = "btn btn-primary card-text";
      button3.type = "button";
      button3.style.marginBottom = "5%";
      button3.innerHTML = "View Product";
      button3.id = element._id;
      button3.formMethod = "POST";
      button3.onclick = function () {
        parent.open("single_product/" + element._id, '_self');
        displaySingleProduct(element._id, "single_product/" + element._id, '_self')
      };
      div2.appendChild(button3);
    });
  } catch (error) {
    message.textContent = error.error;

  }

}



//cart
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const cartDOM = document.querySelector("cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");


// cart total
let cart = [];

//confirmation
