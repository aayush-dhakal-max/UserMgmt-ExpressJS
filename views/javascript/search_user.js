const searchBar = document.getElementById("search");

searchBar.addEventListener("keypress", async (e) => {
  if (e.key == "Enter") {
    const res = await fetch("/searchuser/" + e.target.value);
    const data = await res.json();
    let tableBody = document.getElementById("display");
    tableBody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      // Create a new row element
      let row = document.createElement("tr");

      // Create a new cell element for the name
      let nameCell = document.createElement("td");
      nameCell.textContent = data[i].fname + " " + data[i].lname;
      nameCell.id = data[i].userid;

      // Create a new cell element for the email
      // let emailCell = document.createElement("td");
      // emailCell.textContent = data[i].email;

      // Create a new cell element and image element to insert an image
      let avatarCell = document.createElement("td");
      let image = document.createElement("img");
      image.src = data[i].avatar;
      image.classList.add("avatar-image");
      avatarCell.appendChild(image);

      let buttonCell = document.createElement("td");
      let button = document.createElement("button");
      button.id = "view-button";
      button.textContent = "View Profile";
      buttonCell.appendChild(button);

      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const user = e.target.parentElement.parentElement.children[0].id;
        location.assign("/user/" + user);
        // const res = await fetch("/user/" + userEmail);
      });

      // Append the cells to the row
      row.appendChild(nameCell);
      // row.appendChild(emailCell);
      row.appendChild(avatarCell);
      row.append(buttonCell);

      // Append the row to the table body
      tableBody.appendChild(row);
    }
  }
});
