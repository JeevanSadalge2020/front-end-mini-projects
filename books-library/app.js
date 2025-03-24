// const fetch = require("node-fetch");

const url =
  "https://api.freeapi.app/api/v1/public/books?page=1&limit=5&inc=kind%252Cid%252Cetag%252CvolumeInfo&query=tech";
const options = { method: "GET", headers: { accept: "application/json" } };

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
    const ul = document.querySelector("ul");
    books.forEach((book) => {
      const { title, authors, publisher, publishedDate, infoLink } =
        book["volumeInfo"];
      const thumbNail = book["volumeInfo"]["imageLinks"].thumbnail;

      //   const book_html = `<li>
      //         <div class="book-image">
      //           <img
      //             src=${thumbNail}
      //             alt="book-image"
      //             srcset=""
      //           />
      //         </div>
      //         <div class="book-content">
      //           <h4>${title}</h4>
      //           <p>Author: ${authors.toString()}</p>
      //           <p>Publisher: ${publisher}</p>
      //           <p>Publish Date: ${publishedDate}</p>
      //         </div>
      //       </li>`;
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
      author_ele.textContent = `Author: ${authors.toString()}`;
      publisher_ele.textContent = `Publisher: ${publisher}`;
      publishDate_ele.textContent = `Publish Date: ${publishedDate}`;

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
  })
  .catch((error) => console.log(error.message));
