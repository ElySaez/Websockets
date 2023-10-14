//carga la lista de productos
checkCart()

let selectOrder = document.getElementById("orderSel").value
getProducts(null, null, null, selectOrder)


async function getProducts(query, limit, page, sort) {
    let params = {
        query: query === null ? '' : query,
        limit: limit === null ? 3 : limit,
        page: page === null ? 1 : page,
        sort: sort
    };

    await fetch(
        'http://localhost:8080/products/all?' + new URLSearchParams(params), {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            let historial = document.getElementById("record");
            historial.innerHTML = "";

            let docs = data.payload;
            docs.map(element => {
                historial.innerHTML +=
                    `<tr>
                <td>${element.title}</td>
                <td>${element.description}</td>
                <td>${element.category}</td>
                <td>$ ${element.price}</td>
                <td>${element.stock} </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteProd(\'${element._id}\')">Eliminar</button>
                    <input type="number" name="" id="prodCant-${element._id}" value="1">
                    <button title="Agregar al carrito" class="btn btn-primary" onclick="addToCart(\'${element._id}\')">Agregar</button>
                </td>
                </tr>`
            });

            let pagDiv = document.getElementById("pagination");
            pagDiv.innerHTML = "";

            let prevPage = data.hasPrevPage ? '<li class="page-item"><a class="page-link" onclick=" getProducts(null,null,' + data.prevPage + ',`' + sort + '`) ">Previous</a></li>' :
                '<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>';

            let currentPage = '<li class="page-item"><a class="page-link" href="#">' + data.page + '</a></li>';

            let nextPage = data.hasNextPage ? '<li class="page-item"><a class="page-link" onclick=" getProducts(null,null,' + data.nextPage + ',`' + sort + '`) " href="#">Next</a></li>' :
                '<li class="page-item disabled"><a class="page-link" >Next</a></li>';

            pagDiv.innerHTML += prevPage + currentPage + nextPage;

        });

}

document.getElementById("newProd").addEventListener("click", async function (e) {
    e.preventDefault();

    let product = {
        "title": document.getElementById("title").value,
        "description": document.getElementById("description").value,
        "category": document.getElementById("category").value,
        "price": document.getElementById("price").value,
        "stock": document.getElementById("stock").value,
    }

    await fetch(
        'http://localhost:8080/products/new', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" }
    }).then(data => {
        document.getElementById("formProd").reset();
        getProducts(null, null, null, selectOrder);
    });
});

async function deleteProd(pid) {
    await fetch(
        'http://localhost:8080/products/' + pid, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    }).then(data => getProducts(null, null, null, selectOrder));
}

document.getElementById("filterBtn").addEventListener("click", async function (e) {
    e.preventDefault();
    let query = document.getElementById("bsq").value;
    let sort = document.getElementById("orderSel").value
    getProducts(query, null, null, sort)
})



// Cart acctions
async function checkCart(){
    await fetch(
        'http://localhost:8080/cart/checkCart', {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        return response.json()
    }).then(data => {
        if(data.cart != null){
            const cid = data.cart._id;
            if(cid != null){
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

        prods.map(element => {
            cartBody.innerHTML +=
                `<tr>
            <td>${element.product.title}</td>
            <td>${element.product.price}</td>
            <td>${element.quantity}</td>
            <td>
                <button class="btn btn-danger" onclick="delProdOnCart('`+ cid + `', \'${element._id}\')" >Eliminar</button>
                <input type="number" name="" id="" value="1">
                <button title="Agregar al carrito" class="btn btn-primary">Agregar</button>
            </td>
            </tr>`
        });

        document.getElementById("clrCartBt").disabled = false;
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
            <td>${element.quantity}</td>
            <td>
                <button class="btn btn-danger" onclick="delProdOnCart('`+ cid + `', \'${element._id}\')" >Eliminar</button>
                <input type="number" name="" id="" value="1">
                <button title="Agregar al carrito" class="btn btn-primary">Agregar</button>
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

        prods.map(element => {
            cartBody.innerHTML +=
                `<tr>
            <td>${element.product.title}</td>
            <td>${element.product.price}</td>
            <td>${element.quantity}</td>
            <td>
                <button class="btn btn-danger" onclick="rc('`+ cid + `', \'${element._id}\')" >Eliminar</button>
                <input type="number" name="" id="" value="1">
                <button title="Agregar al carrito" class="btn btn-primary">Agregar</button>
            </td>
            </tr>`
        });
    })
}

async function delAllProdOnCart() {
    const cid = document.getElementById("cid").value;

    if(cid !== ''){
        await fetch(
            'http://localhost:8080/cart/'+cid+'/products/', {
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

document.getElementById('cart-modal').addEventListener('shown.bs.modal', () => {
    const cid = document.getElementById("cid").value
    if(cid != ''){
        getCart(cid)
    }
})
