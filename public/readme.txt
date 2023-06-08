<div class="w-100 px-2 mx-1 d-flex justify-content-between items-center">
  <div></div>
<a href="Products" class="btn btn-success float-right  my-4"> Add to Cart</a>
</div> 

<div class="mt-4 w-100">
<table class="table table-striped  m-auto w-75">
  <thead class="thead thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product Name</th>
      <th scope="col">Company</th>
      <th scope="col">Category</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Image</th>
      <th scope="col">Actions</th>
     
    </tr>
  </thead>
  <tbody>
    <% var total = 0, totalQnty=0; %>
    <% for(let i in Cart){ %>
        <% total +=Number(Cart[i].Price);  %>
        <% totalQnty +=Number(Cart[i].Quantity);  %>
    <tr>
      <th scope="row"><%= i %></th>
      <td><%= Cart[i].Name %></td>
      <td><%= Cart[i].Company %></td>
      <td><%= Cart[i].Category %></td>
      <td><%= Cart[i].Price %></td>
      <td><%= Cart[i].Quantity %></td>
      <td><%= Cart[i].Img %></td>
      <td><a href="removeCart/<%= Cart[i]._id %>" class="btn btn-danger">remove</a></td>
    </tr>
    <% } %>
    <tr>
        <td scope="row"><%= i+2 %></td>
        <td class="font-weight-bold text-uppercase">Total</td>
        <td class="font-weight-bold text-uppercase"><%= totalQnty  %></td>
        <td class="font-weight-bold text-uppercase"><%= total %></td>

    </tr>
    
  </tbody>
</table>
</div>
