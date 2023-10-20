// ======================================== GET PROVINCES ===========================================
async function fetchProvince(url) {
  try {
    const response = await fetch(url);

    // If get the data failed
    if (!response.ok) {
      throw new Error(`HTTP error? Status: ${response.status}`);
    }

    const data = await response.json();

    provinces.push(...data);
    renderSelectionProvinces();
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProvince("https://provinces.open-api.vn/api/?depth=3");
});

var provinces = [];
var districts = [];
var wards = [];

// Populate the province dropdown
function renderSelectionProvinces() {
  const provinceList = document.getElementById("provinces");
  const districtsList = document.getElementById("districts");
  const wardsList = document.getElementById("wards");

  provinceList.innerHTML = `<option title="" value=""></option>`;

  provinces.forEach((province) => {
    provinceList.innerHTML += `<option title="${province.name}" value="${province.name}">${province.name}</option>`;
  });

  // Reset the districts and wards dropdown
  districtsList.innerHTML = `<option title="" value=""></option>`;
  wardsList.innerHTML = `<option title="" value=""></option>`;

  // Attach event listener for the districts and wards
  renderSelectionDistricts();
}

// Populate the district dropdown based on the province dropdown
function renderSelectionDistricts() {
  const provinceDropdown = document.getElementById("provinces");

  provinceDropdown.addEventListener("change", () => {
    const provinceClicked = provinceDropdown.value;
    const districtFound = provinces.find((province) => province.name === provinceClicked);

    districts = districtFound ? districtFound.districts : [];

    document.getElementById("districts").innerHTML = `<option title="" value=""></option>`;

    districts.forEach((district) => {
      document.getElementById("districts").innerHTML += `<option title="${district.name}" value="${district.name}">${district.name}</option>`;
    });

    // Reset the wards dropdown
    document.getElementById("wards").innerHTML = `<option title="" value=""></option>`;

    renderSelectionWards();
  });
}

function renderSelectionWards() {
  const districtDropdown = document.getElementById("districts");

  districtDropdown.addEventListener("change", () => {
    const districtClicked = districtDropdown.value;
    const wardFound = districts.find((district) => district.name === districtClicked);

    wards = wardFound ? wardFound.wards : [];

    document.getElementById("wards").innerHTML = `<option title="" value=""></option>`;

    wards.forEach((ward) => {
      document.getElementById("wards").innerHTML += `<option title="${ward.name}" value="${ward.name}">${ward.name}</option>`;
    });
  });
}
