//carga la lista de productos

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
                <td><button class="btn btn-danger" onclick="deleteProd(\'${element._id}\')">Eliminar</button></td>
                </tr>`
            });

            let pagDiv = document.getElementById("pagination");
            pagDiv.innerHTML = "";

            let prevPage = data.hasPrevPage ? '<li class="page-item"><a class="page-link" onclick=" getProducts(null,null,' + data.prevPage + ',`'+sort+'`) ">Previous</a></li>' :
                '<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>';

            let currentPage = '<li class="page-item"><a class="page-link" href="#">' + data.page + '</a></li>';

            let nextPage = data.hasNextPage ? '<li class="page-item"><a class="page-link" onclick=" getProducts(null,null,'+ data.nextPage + ',`'+sort+'`) " href="#">Next</a></li>' :
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
        getProducts();
    });
});

async function deleteProd(id) {
    await fetch(
        'http://localhost:8080/products/' + id, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    }).then(data =>getProducts(null, null, null, selectOrder));
}

document.getElementById("filterBtn").addEventListener("click", async function (e) {
    e.preventDefault();
    let query = document.getElementById("bsq").value;
    let sort = document.getElementById("orderSel").value
    getProducts(query, null, null, sort)
})