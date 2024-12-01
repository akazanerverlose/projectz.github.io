const listings = [];
const listingTable = document.getElementById("listingTable");
const listingForm = document.getElementById("listingForm");
const previewImage = document.getElementById("previewImage");
const searchBar = document.getElementById("searchBar");
const viewModalBody = document.getElementById("viewModalBody");
const viewModal = new bootstrap.Modal(document.getElementById("modal"));

// Preview Image on File Change
document
  .getElementById("propertyImage")
  .addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// Handle Form Submission
listingForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("propertyName").value;
  const location = document.getElementById("location").value;
  const price = document.getElementById("price").value;
  const image = previewImage.src;

  listings.push({ name, location, price, image });

  listingForm.reset();
  previewImage.src = "";
  renderListings();
});

// Render Listings
function renderListings() {
  listingTable.innerHTML = ""; // Clear existing rows
  listings.forEach((listing, index) => {
    const row = `
      <tr style="text-align : center;  justify-content: center;">
        <td>${index + 1}</td>
        <td><img src="${
          listing.image
        }" alt="Property" style="width: 100px; height: auto;border-radius :10px;display:block;margin:auto;"></td>
        <td>${listing.name}</td>
        <td>${listing.location}</td>
        <td>$${listing.price}</td>
        <td class="action-btns">
          <button class="btn btn-info btn-sm" onclick="viewUser(${index})">ចុចមើល</button>
          <button class="btn btn-warning btn-sm" onclick="editUser(${index})">កែតម្រូវ</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">លុប</button>
        </td>
      </tr>
    `;
    listingTable.insertAdjacentHTML("beforeend", row);
  });
}

// View Listing
function viewUser(index) {
  const listing = listings[index];
  const modalContent = `
    <div class="mb-3">
      <strong>ប្រភេទផ្ទះ :</strong> ${listing.name}
    </div>
    <div class="mb-3">
      <strong>ទីតាំងផ្ទះ​​ :</strong> ${listing.location}
    </div>
    <div class="mb-3">
      <strong>តម្លៃផ្ទះ :</strong> $${listing.price}
    </div>
    <div class="mb-3">
      <strong>រូបភាព​ :</strong><br>
      <img src="${listing.image}" style="width: 100%; height: auto;" />
    </div>
  `;
  viewModalBody.innerHTML = modalContent;
  viewModal.show();
}

// Edit Listing
function editUser(index) {
  const listing = listings[index];

  document.getElementById("propertyName").value = listing.name;
  document.getElementById("location").value = listing.location;
  document.getElementById("price").value = listing.price;
  previewImage.src = listing.image;

  // Remove current listing from the array and re-render
  listings.splice(index, 1);
  renderListings();
}

// Delete Listing
function deleteUser(index) {
  listings.splice(index, 1);
  renderListings();
}

// Search Listings
searchBar.addEventListener("input", function () {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredListings = listings.filter(
    (listing) =>
      listing.name.toLowerCase().includes(searchTerm) ||
      listing.location.toLowerCase().includes(searchTerm) ||
      listing.price.toString().includes(searchTerm)
  );
  renderFilteredListings(filteredListings);
});

// Render Filtered Listings
function renderFilteredListings(filteredListings) {
  listingTable.innerHTML = "";
  filteredListings.forEach((listing, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td><img src="${
          listing.image
        }" alt="Property" style="width: 100px; height: auto;"></td>
        <td>${listing.name}</td>
        <td>${listing.location}</td>
        <td>$${listing.price}</td>
        <td class="action-btns">
          <button class="btn btn-info btn-sm" onclick="viewUser(${index})">View</button>
          <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
    listingTable.insertAdjacentHTML("beforeend", row);
  });
}
