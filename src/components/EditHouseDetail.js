import React from "react";

const EditHouseDetail = (detailForHouses) => {

  const editingHeaders = new Headers();
  editingHeaders.append("X-Api-Key", "pWdHLoqaRIgeXl79-CnOmv0KJ6ANYBt4");

  var editHeaders = new Headers();
  editHeaders.append("X-Api-Key", "pWdHLoqaRIgeXl79-CnOmv0KJ6ANYBt4");

  console.log(detailForHouses)
  var formdata = new FormData();
  formdata.append("price", detailForHouses.price);
  formdata.append("bedrooms", detailForHouses.rooms.bedroom);
  formdata.append("bathrooms", detailForHouses.rooms.bathroom);
  formdata.append("size", detailForHouses.size);
  formdata.append("streetName", detailForHouses.location.street);
  formdata.append("zip", detailForHouses.location.zip);
  formdata.append("city", detailForHouses.location.city);
  formdata.append("constructionYear", detailForHouses.constructionYear);
  formdata.append("hasGarage", detailForHouses.hasGarage);
  formdata.append("description", detailForHouses.description);

  var editOptions = {
    method: 'POST',
    headers: editHeaders,
    body: formdata,
    redirect: 'follow'
  };


  const editingItems = async () => {
    fetch(`https://api.intern.d-tt.nl/api/houses/${detailForHouses.id}`, editOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

}

export default EditHouseDetail;



