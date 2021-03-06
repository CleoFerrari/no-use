

//function to fill products array with all id of the orders
function items_array() {
    items = [];
    keys = Object.keys(localStorage);
    let length = keys[0];
    if (length != null) {
        length = parseInt(keys[0]);
    } else {
        length = 1;
    }
    for (let i = 1; i <= length; i++) {
        let array = localStorage.getItems(i);
        let json = JSON.parse(array);
        if (json != null) {
            items.push(json._id);
        }

    }
    return products;
}

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

// Function to display a single product by id
async function displaySingleProduct(id, page) {

    const postPromise = makeRequest('GET', api + "/" + id, {
    });
    try {
        const postResponse = await postPromise;
        items.style.justifyContent = "center";
        const div1 = document.createElement('div');
        div1.className = "col-12 col-lg-4";
        items.appendChild(div1);
        const div2 = document.createElement('div');
        div2.className = "card shadow";
        div1.appendChild(div2);
        const img = document.createElement('img');
        img.className = "card-img-top img-responsive";
        //img.style.height = "16rem";
        img.src = postResponse.imageUrl;
        img.alt = "";
        div2.appendChild(img);
        const div3 = document.createElement('div');
        div3.className = "card-body";
        div2.appendChild(div3);
        const h5 = document.createElement('h5');
        h5.className = "card-title";
        h5.innerHTML = postResponse.name;
        div3.appendChild(h5);
        const p = document.createElement('p');
        p.className = "card-text";
        p.innerHTML = postResponse.description;
        div3.appendChild(p);
        const p2 = document.createElement('p');
        p2.className = "card-text";
        p2.innerHTML = "Price " + Intl.NumberFormat('en-US', { currency: "USD", style: 'currency' }).format(postResponse.price);;
        div3.appendChild(p2);

        const select = document.createElement('select');
        select.id = 'color' + postResponse._id;
        select.style.marginBottom = "0.5rem";
        select.className = "card-text";
        select.value = "Select Color";
        select.innerHTML = "Select Color";
        select.style.width = "100%";
        var opt = document.createElement('option');
        opt.value = "Select Color";
        opt.innerHTML = "Select Color";
        select.appendChild(opt);
        postResponse.colors.forEach(colors => {
            var opt = document.createElement('option');
            opt.className = "color_" + colors + " border";
            opt.value = colors;
            opt.innerHTML = colors;
            select.appendChild(opt);
        });
        div3.appendChild(select);

        const button1 = document.createElement('a');
        button1.className = "btn btn-danger card-text";
        button1.type = "button";
        button1.innerHTML = "Remove from cart";
        button1.style.width = "100%";
        button1.id = postResponse._id;
        button1.formMethod = "POST";
        button1.onclick = function () {
            removeFromCart(postResponse, 1, "/single_product/" + postResponse._id, '_self', "single")
            //parent.open("/single_product/"+postResponse._id, '_self');
        };


        const button2 = document.createElement('a');
        button2.className = "btn btn-primary";
        button2.type = "button";
        button2.style.width = "100%";
        button2.innerHTML = "Add to cart";
        button2.style.marginBottom = "0.5rem";
        button2.id = postResponse._id;
        button2.formMethod = "POST";
        button2.onclick = function () {
            updateCart(postResponse, 1, "/single_product/" + postResponse._id, '_self', "single");
            // parent.open("/single_product/"+postResponse._id, '_self');
        };
        div3.appendChild(button2);
        div3.appendChild(button1);
    } catch (error) {
        message.textContent = error.error;

    }
}

//Function to remove a specific qty of an item from the storage
function removeFromCart(postResponse, qty, page, value, from) {

    let answer = document.getElementById("color" + postResponse.colors + postResponse._id).value;
    let success = document.getElementById("success");
    success.innerHTML = "";
    success.className = "";
    if (answer !== 'Select Color') {
        var total = qty;
        var item = findMyItem(postResponse, answer);
        if (item != 0) {
            var lenght = localStorage.length;
            var array = localStorage.getItem(item);
            var json = JSON.parse(array);

            if (total > json.count) {

                alert("You can't delete more than you have in your cart");
                let qty = document.getElementById("qty" + postResponse.colors + postResponse._id);
                qty.value = postResponse.count;
                qty.innerHTML == postResponse.count;
            } else {
                total = json.count - total;
                json.count = total;
                if (total <= 0) {
                    const responseDanger = document.getElementById('danger');
                    responseDanger.innerHTML = "You have removed an item from the cart";
                    responseDanger.className = "alert-danger";
                    localStorage.removeItem(item);
                    if (from === "single") {

                    } else {
                        parent.open(page, value);
                    }

                } else {
                    const responseDanger = document.getElementById('danger');
                    responseDanger.innerHTML = "You have removed an item from the cart";
                    responseDanger.className = "alert-danger";
                    localStorage.setItem(item, JSON.stringify(json));
                    let qty = document.getElementById("qty" + postResponse.colors + postResponse._id);
                    qty.value = total;
                    qty.innerHTML == total;
                    //parent.open(page, value);
                }
                var array = localStorage.getItem(item);
                var json = JSON.parse(array);
            }

        } else {
            alert('You dont have this item in your cart');

        }
    } else {
        alert('You need to select a color');
    }


    cartCount();

}

//Function to find an item in the local storage
//Check if specific item and color are in the storage
//Return 0 if the item doesnt exist
function findMyItem(postResponse, answer) {

    keys = Object.keys(localStorage);
    length = parseInt(keys[0]);
    if (length != null) {
        length = parseInt(keys[0]);
    } else {
        length = 1;
    }

    for (var i = 1; i <= length; i++) {
        var array = localStorage.getItem(i);
        var json = JSON.parse(array);
        if (json != null) {
            if (json._id === postResponse._id) {
                if (json.colors === answer) {
                    return i;
                }
            }
        }
    }
    return 0;


}

// return 0 if there is not null keys
function findMyKey(postResponse, answer) {

    keys = Object.keys(localStorage);
    length = parseInt(keys[0]);
    if (length != null) {
        length = parseInt(keys[0]);
    } else {
        length = 1;
    }

    for (var i = 1; i <= length; i++) {

        var array = localStorage.getItem(i);
        var json = JSON.parse(array);
        if (json == null) {
            return i;
        }
    }
    return 0;


}

// Function to display cart every single item with their color will be display 
function displayCart() {
    const message = document.getElementById('message');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');

    const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };
    products = products_array();
    const object = { contact, products };

    keys = Object.keys(localStorage);

    var length = 1;
    for (i = 0; i <= keys[0]; i++) {
        if (parseInt(length) < parseInt(keys[i])) {
            length = parseInt(keys[i]);
        }
    }

    for (let i = 1; i <= length; i++) {
        let array = localStorage.getItem(i);
        let json = JSON.parse(array);
        if (json != null) {
            const div1 = document.createElement('div');
            div1.className = "card mb-3";
            items.appendChild(div1);

            const div2 = document.createElement('div');
            div2.className = "row g-0";
            //div2.style.width = "18rem";
            div1.appendChild(div2);

            const div3 = document.createElement('div');
            div3.className = "col-md-4";
            //div2.style.width = "18rem";
            div2.appendChild(div3);

            const div4 = document.createElement('div');
            div4.className = "col-md-8";
            //div2.style.width = "18rem";
            div2.appendChild(div4);

            const div5 = document.createElement('div');
            div5.className = "card-body";
            //div2.style.width = "18rem";
            div4.appendChild(div5);

            const img = document.createElement('img');
            img.className = "card-img-top img-responsive";
            //img.style.width = "18rem";
            //img.style.height = "16rem";
            img.src = json.imageUrl;
            img.alt = "";
            div3.appendChild(img);

            const h5 = document.createElement('h5');
            h5.className = "card-title";
            h5.innerHTML = json.name;
            div5.appendChild(h5);

            const p = document.createElement('p');
            p.className = "card-text";
            p.innerHTML = json.description;
            div5.appendChild(p);

            const p2 = document.createElement('p');
            p2.className = "";
            p2.innerHTML = "Price " + Intl.NumberFormat('en', { currency: "??", style: 'currency' }).format(json.price);;
            div5.appendChild(p2);

            const select = document.createElement('select');
            select.id = "color" + json.colors + json._id;
            select.className = "card-text";
            select.value = json.colors;
            select.innerHTML = "Select Color";
            select.style.width = "100%";

            var opt = document.createElement('option');
            opt.className = "color_" + json.colors + " border";
            opt.value = json.colors;
            opt.innerHTML = json.colors;
            opt.selected = "Selected";
            select.appendChild(opt);

            div5.appendChild(select);

            const select_qty = document.createElement('select');
            select_qty.id = "qty" + json.colors + json._id;
            select_qty.className = "card-text";
            select_qty.innerHTML = "Qty: " + json.count;
            select_qty.style.width = "100%";
            if (json.count > 10) {
                for (let j = 1; j <= json.count; j++) {
                    var opt2 = document.createElement('option');
                    opt2.value = j;
                    opt2.innerHTML = j;
                    if (j == json.count) {
                        opt2.selected = "Selected";
                    }

                    select_qty.appendChild(opt2);

                }
            } else {
                for (let j = 1; j <= 10; j++) {
                    var opt2 = document.createElement('option');
                    opt2.value = j;
                    opt2.innerHTML = j;
                    if (j == json.count) {
                        opt2.selected = "Selected";
                    }

                    select_qty.appendChild(opt2);

                }
            }


            div5.appendChild(select_qty);
            const p3 = document.createElement('p');
            p3.id = i;
            p3.value = json.price * (json.count);
            p3.className = "card-text";
            p3.innerHTML = "Total Price " + Intl.NumberFormat('en', { currency: "??", style: 'currency' }).format((json.price * (json.count)));
            div5.appendChild(p3);

            const button2 = document.createElement('a');
            button2.className = "btn btn-primary";
            button2.type = "button";
            button2.style.marginRight = "5%";
            button2.innerHTML = "Update cart";
            button2.value = json.colors + json._id;
            button2.id = "update" + json.colors + json._id;
            button2.formMethod = "POST";
            button2.onclick = function () {
                var value = document.getElementById("qty" + this.value).value;
                updateCart(json, value, "/show_cart", '_self', 'cart');
                //parent.open("/show_cart",'_self');
            };
            div5.appendChild(button2);

            const button3 = document.createElement('a');
            button3.className = "btn btn-danger";
            button3.type = "button";
            button3.style.marginRight = "5%";
            button3.innerHTML = "Remove from cart";
            button3.value = json.colors + json._id;
            button3.id = "remove" + json.colors + json._id;
            button3.formMethod = "POST";
            button3.onclick = function () {
                var value = document.getElementById("qty" + this.value).value;
                removeFromCart(json, value, "/show_cart", '_self', 'cart');
                //parent.open("/show_cart",'_self');
            };
            div5.appendChild(button3);
        }
    }
    updateTotalPrice();
}

//Function to update total price of the order
function updateTotalPrice() {
    keys = Object.keys(localStorage);
    var length = keys[0];
    if (length != null) {
        length = parseInt(keys[0]);
    } else {
        length = 1;
    }

    let total = 0;
    for (let i = 1; i <= length; i++) {
        let array = localStorage.getItem(i);
        let json = JSON.parse(array);
        if (json != null) {
            total = total + parseInt((document.getElementById(i).value));
        }
    }
    var totalPrice = document.getElementById("totalPrice");
    totalPrice.value = Intl.NumberFormat('en', { currency: "??", style: 'currency' }).format((total));
    totalPrice.innerHTML += " " + Intl.NumberFormat('en-US', { currency: "??", style: 'currency' }).format((total));

}

//Function to update qty of cart receiving item and qty to update
function updateCart(postResponse, qty, page, value, from) {

    let answer;
    if (from === "single") {
        answer = document.getElementById("color" + postResponse._id).value;

    } else {
        answer = document.getElementById("color" + postResponse.colors + postResponse._id).value;

    }
    let danger = document.getElementById("danger");
    danger.innerHTML = "";
    danger.className = "";
    keys = Object.keys(localStorage);
    var local_length = keys[0];

    if (answer !== 'Select Color') {
        var total = parseInt(qty);
        var item = findMyItem(postResponse, answer);
        if (item != 0) {
            var array = localStorage.getItem(item);
            var json = JSON.parse(array);

            if (total >= 1 && from === "cart") {
                total = total;
                let qty = document.getElementById("qty" + postResponse.colors + postResponse._id);
                qty.value = total;
                qty.innerHTML = total;
            } else {
                total = total + parseInt(json.count);
            }

            json.count = total;
            localStorage.setItem(item, JSON.stringify(json));
            const responseSuccess = document.getElementById('success');
            responseSuccess.innerHTML = "You have added an item to the cart";
            responseSuccess.className = "alert-success";
            var array = localStorage.getItem(item);
            var json = JSON.parse(array);
            if (from === "single") {

            } else {
                parent.open(page, value);
            }
        } else {
            var count = total;
            postResponse.colors = answer;
            postResponse['count'] = count;
            if (local_length != null) {
                if (findMyKey() == 0) {
                    lenght = parseInt(local_length) + 1;
                } else {
                    lenght = findMyKey();
                }

                local_length = parseInt(keys[0]);
            } else {
                lenght = 1;
            }
            const responseSuccess = document.getElementById('success');
            responseSuccess.innerHTML = "You have added an item to the cart";
            responseSuccess.className = "alert-success";
            localStorage.setItem(lenght, JSON.stringify(postResponse));
            var array = localStorage.getItem(postResponse._id);
            var json = JSON.parse(array);
            if (from === "single") {

            } else {
                parent.open(page, value);
            }
        }
    } else {
        alert('You need to select a color');
    }
    cartCount();
}
