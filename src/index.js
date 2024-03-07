document.addEventListener("DOMContentLoaded", () => {
  initialise();
  initialise2();
});

let dogFilterOn = false;

function initialise() {
  fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((data) => makeBar(data));
}

function initialise2() {
  const dogFilter = document.querySelector("#good-dog-filter");

  dogFilter.addEventListener("click", () => {
    if (dogFilterOn === false) {
      dogFilter.textContent = "Filter good dogs: ON";
      dogFilterOn = true;
      console.log("clicked false");
      initialise();
    } else {
      dogFilter.textContent = "Filter good dogs: OFF";
      dogFilterOn = false;
      console.log("clicked true");
      initialise();
    }
  });
}

function makeBar(data) {
  const dogBar = document.querySelector("#dog-bar");
  dogBar.innerHTML = "";
  if (dogFilterOn === true) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].isGoodDog === true) {
        let span = document.createElement("span");
        span.textContent = data[i].name;
        span.addEventListener("click", () => {
          createDogCard(data[i]);
        });

        dogBar.appendChild(span);
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      let span = document.createElement("span");
      span.textContent = data[i].name;
      span.addEventListener("click", () => {
        createDogCard(data[i]);
      });

      dogBar.appendChild(span);
    }
  }
}

function createDogCard(data) {
  const dogInfo = document.querySelector("#dog-info");
  dogInfo.innerHTML = "";

  let img = document.createElement("img");
  img.setAttribute("src", data.image);

  let h2 = document.createElement("h2");
  h2.textContent = data.name;

  let btn = document.createElement("button");
  if (data.isGoodDog === true) {
    btn.textContent = "Good Dog!";
  } else {
    btn.textContent = "Bad Dog!";
  }
  btn.addEventListener("click", (e) => {
    e.preventDefault;
    if (data.isGoodDog === true) {
      data.isGoodDog = false;
      btn.textContent = "Bad Dog!";
      fetch(`http://localhost:3000/pups/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isGoodDog: false }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      data.isGoodDog = true;
      fetch(`http://localhost:3000/pups/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isGoodDog: true }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      btn.textContent = "Good Dog!";
    }
  });

  dogInfo.appendChild(img);
  dogInfo.appendChild(h2);
  dogInfo.appendChild(btn);
}
