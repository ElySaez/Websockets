checkCart()

// Cart acctions
async function checkCart() {
    await fetch(
        'http://localhost:8080/cart/checkCart', {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.cart != null) {
            const cid = data.cart._id;
            if (cid != null) {
                document.getElementById("cid").value = cid;
            } else {
                document.getElementById("cid").value = null;
            }
        }
    })
}

async function getCart(cid) {
    await fetch(
        'http://localhost:8080/cart/' + cid, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        return response.json()
    }).then(data => {
        let cartBody = document.getElementById("cart-body");
        cartBody.innerHTML = "";

        const cid = data.cart._id;
        const prods = data.cart.products;
        
        if (prods.length === 0) {
            document.getElementById("clrCartBt").disabled = true;
        } else {
            prods.map(element => {
                cartBody.innerHTML +=
                    `<tr>
            <td>${element.product.title}</td>
            <td>${element.product.price}</td>
            <td><input type="number" name="" id="cat-quantity-${element._id}" value="${element.quantity}"> </td>
            <td>
                <button class="btn btn-danger" onclick="delProdOnCart('`+ cid + `', \'${element._id}\')" >Quitar</button>
                <button title="Agregar al carrito" class="btn btn-primary" onclick="updateProdCart('`+ cid + `', \'${element._id}\')">Actualizar</button>
            </td>
            </tr>`
            });

            document.getElementById("clrCartBt").disabled = false;
        }

    });
}

async function addToCart(pid) {
    let cat = document.getElementById("prodCant-" + pid).value

    let body = {
        "pid": pid,
        "quantity": cat
    }

    await fetch(
        'http://localhost:8080/cart/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        return response.json()
    }).then(data => {
        let cartBody = document.getElementById("cart-body");
        cartBody.innerHTML = "";

        const cid = data.cart._id;
        document.getElementById("cid").value = cid;

        const prods = data.cart.products;

        prods.map(element => {
            cartBody.innerHTML +=
                `<tr>
            <td>${element.product.title}</td>
            <td>${element.product.price}</td>
            <td><input type="number" name="" id="cat-quantity-${element._id}" value="${element.quantity}"> </td>
            <td>
                <button class="btn btn-danger" onclick="delProdOnCart('`+ cid + `', \'${element._id}\')" >Quitar</button>
                <button title="Agregar al carrito" class="btn btn-primary" onclick="updateProdCart('`+ cid + `', \'${element._id}\')">Actualizar</button>
            </td>
            </tr>`
        });
    })
}

async function delProdOnCart(cid, pid) {
    await fetch(
        'http://localhost:8080/cart/' + cid + '/products/' + pid, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        return response.json()
    }).then(data => {
        let cartBody = document.getElementById("cart-body");
        cartBody.innerHTML = "";

        const cid = data.cart._id;
        const prods = data.cart.products;

        
        if (prods.length === 0) {
            document.getElementById("clrCartBt").disabled = true;
        } else {
            prods.map(element => {
                cartBody.innerHTML +=
                    `<tr>
            <td>${element.product.title}</td>
            <td>${element.product.price}</td>
            <td><input type="number" name="" id="cat-quantity-${element._id}" value="${element.quantity}"> </td>
            <td>
                <button class="btn btn-danger" onclick="delProdOnCart('`+ cid + `', \'${element._id}\')" >Quitar</button>
                <button title="Agregar al carrito" class="btn btn-primary" onclick="updateProdCart('`+ cid + `', \'${element._id}\')">Actualizar</button>
            </td>
            </tr>`
            });
        }

    })
}

async function delAllProdOnCart() {
    const cid = document.getElementById("cid").value;

    if (cid !== '') {
        await fetch(
            'http://localhost:8080/cart/' + cid + '/products/', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            return response.json()
        }).then(data => {
            let cartBody = document.getElementById("cart-body");
            cartBody.innerHTML = "";
            document.getElementById("clrCartBt").disabled = true;
        })
    }

}

async function updateProdCart(cid, pid) {
    const quantity = document.getElementById("cat-quantity-" + pid).value;

    let body = {
        quantity: quantity
    };

    await fetch(
        'http://localhost:8080/cart/' + cid + '/products/' + pid, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        return response.json()
    }).then(data => {
        let cartBody = document.getElementById("cart-body");
        cartBody.innerHTML = "";

        const cid = data.cart._id;
        const prods = data.cart.products;

        prods.map(element => {
            cartBody.innerHTML +=
                `<tr>
            <td>${element.product.title}</td>
            <td>${element.product.price}</td>
            <td><input type="number" name="" id="cat-quantity-${element._id}" value="${element.quantity}"> </td>
            <td>
                <button class="btn btn-danger" onclick="delProdOnCart('`+ cid + `', \'${element._id}\')" >Quitar</button>
                <button title="Agregar al carrito" class="btn btn-primary" onclick="updateProdCart('`+ cid + `', \'${element._id}\')">Actualizar</button>
            </td>
            </tr>`
        });
    })
}

document.getElementById('cart-modal').addEventListener('shown.bs.modal', () => {
    const cid = document.getElementById("cid").value
    if (cid != '') {
        getCart(cid)
    }
})