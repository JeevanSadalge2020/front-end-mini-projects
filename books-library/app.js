// const fetch = require("node-fetch");

const url =
  "https://api.freeapi.app/api/v1/public/books?page=1&limit=2&inc=kind%252Cid%252Cetag%252CvolumeInfo";
const options = { method: "GET", headers: { accept: "application/json" } };

const searchBtn = document.querySelector("#book-filter");
const searchInput = document.querySelector("input");
const ul = document.querySelector("ul");

let searchBooks = function () {
  fetch_books().then(({ data }) => {
    const books = data.data.filter((book) => {
      let authors = book["volumeInfo"].authors.toString().toLowerCase();
      let title = book["volumeInfo"].title.toLowerCase();
      console.log(authors, title);
      //   if (authors.includes(searchInput.value.toLowerCase())) {
      //     return book;
      //   } else if (title.includes(searchInput.value.toLowerCase())) {
      //     return book;
      //   }
    });
    console.log("books", books);
  });
};

searchBtn.addEventListener("click", (e) => {
  searchBooks();
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
    author_ele.textContent = `Author: ${authors?.toString() || "Unknown"}`;
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
