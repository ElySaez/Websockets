const socket = io("http://localhost:8080")
let arrProd = []
document.getElementById("send").addEventListener("click", postProduct)

function postProduct()  {
  let product = {
  "title" : document.getElementById("title").value,
  "description" : document.getElementById("description").value,
  "category" : document.getElementById("category").value,
  "price" : document.getElementById("price").value,
  "stock" : document.getElementById("stock").value,
  }

  socket.emit("add", product)

}

function deleteProd(id) {
  socket.emit("deleteProd", id)
}

socket.on("arrProd", data => {
  let record = document.getElementById("record")
  record.innerHTML = ""

  data.forEach(element => {
    record.innerHTML += `
                    <tr>
                    <td> ${element.title} </td>
                    <td>${element.description}</td>
                    <td>${element.categoria}</td>
                    <td>$ ${element.price}</td>
                    <td>${element.stock}</td>
                    </tr>
                    <button onclick="deleteProd(${element.id})">Eliminar</button>
    `
  })
})