console.log("Client side JS file loaded");

const fetchData = (address) => {
  fetch(`http://localhost:3000/weather?address=${address}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res, res.data);
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        console.log(res.error);
        throw new Error(res.error);
      }
    })
    .catch((error) => console.log(error));
};

const form = document.querySelector("form");
const search = document.querySelector("input");
console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetchData(location);
});
