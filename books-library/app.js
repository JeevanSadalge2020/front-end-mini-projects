// const fetch = require("node-fetch");

const url =
  "https://api.freeapi.app/api/v1/public/books?page=1&limit=50&inc=kind%252Cid%252Cetag%252CvolumeInfo";
const options = { method: "GET", headers: { accept: "application/json" } };

const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("input");
const ul = document.querySelector("ul");

let searchBooks = function () {};

searchBtn.addEventListener("click", (e) => {
  fetch_books().then(({ data }) => {
    const books = data.data.filter((book) => {
      let authors = book["volumeInfo"].authors
        .toString()
        .toLowerCase()
        .split(" ");
      let title = book["volumeInfo"].title.toLowerCase().split(" ");
      let seachText = searchInput.value.toLowerCase();
      //   console.log("title", title);
      //   console.log("searchInput", searchInput.value.toLowerCase());
      if (authors.includes(seachText) || title.includes(seachText)) {
        console.log("==");
        return book;
      }
    });
    displayBooks(books);
  });
});

async function fetch_books() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

fetch_books()
  .then(({ data }) => {
    const books = data.data;
    console.log(books);
    displayBooks(books);
  })
  .catch((error) => console.log(error.message));

function displayBooks(bookList) {
  ul.textContent = "";
  bookList.forEach((book) => {
    const { title, authors, publisher, publishedDate, infoLink } =
      book["volumeInfo"];
    const thumbNail = book["volumeInfo"]["imageLinks"].thumbnail;

    let publishedDate_arr = new Date(publishedDate).toDateString().split(" ");
    let month = publishedDate_arr[1];
    let year = publishedDate_arr[3];

    const li_ele = document.createElement("li");
    const bookImage_ele = document.createElement("div");
    const bookContent_ele = document.createElement("div");
    const image_ele = document.createElement("img");
    const heading_ele = document.createElement("h4");
    const author_ele = document.createElement("p");
    const publisher_ele = document.createElement("p");
    const publishDate_ele = document.createElement("p");

    image_ele.setAttribute("src", thumbNail);
    image_ele.setAttribute("alt", "book-image");
    bookImage_ele.append(image_ele);
    li_ele.append(bookImage_ele);
    ul.append(li_ele);

    bookImage_ele.setAttribute("class", "book-image");

    heading_ele.textContent = title;
    author_ele.textContent = `Author: ${
      authors
        ? authors.length <= 3
          ? authors?.toString()
          : authors.slice(0, 3).toString() + " and others"
        : "Unknown"
    }`;
    publisher_ele.textContent = `Publisher: ${publisher || "Unknown"}`;
    if (month && year) {
      publishDate_ele.textContent = `Publish Date: ${month}, ${year}`;
    } else {
      publishDate_ele.textContent = `Publish Date: 'Unknown`;
    }

    bookContent_ele.append(
      heading_ele,
      author_ele,
      publisher_ele,
      publishDate_ele
    );
    bookContent_ele.setAttribute("class", "book-content");
    li_ele.append(bookContent_ele);
    ul.append(li_ele);
  });
}
