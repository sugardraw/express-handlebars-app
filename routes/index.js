const router = require("express").Router();
const fs = require("fs");

/**
 * Get the product list
 * 
 */


const productsList = JSON.parse(
  fs.readFileSync("./database/database.json", "utf8")
);


/**
 * routes
 */


router.get("/", (req, res) => {
  res.render("index.hbs", {
    title: "E-Commerce Platform using Express-Handlebars",
    tagline: "Get more for your trash"
  });
});

router.get("/products", (req, res) => {
  let products = [];
  for (let i in productsList) {
    products.push(productsList[i]);
  }
  res.render("products.hbs", {
    products: products,
    url: "http://localhost:3000/products/",
    helpers: {
      concat: function() {
        var result = "";
        for (var i in arguments) {
          result +=
            (typeof arguments[i] === "string" ? arguments[i] : "") + " ";
        }
        return result;
      }
    }
  });
});

router.get("/about", (req, res) => {
  res.render("about.hbs");
});

/**
 * Add a product
 * 
 */

router.post("/products/new-product", (req, res) => {
  if (req.body.product != "") {
    req.body.url = `http://localhost:3000/products/delete/?id=${Date.now()}`;
    req.body.editUrl = `http://localhost:3000/products/edit/?id=${Date.now()}`;
    productsList.push(req.body);
    fs.writeFile(
      "./database/database.json",
      JSON.stringify(productsList),
      err => {
        if (err) {
          console.log(err);
        }
        console.log("product saved");
      }
    );
    res.render("new-product.hbs", { product: req.body.product });
  } else {
    res.render("error.hbs");
  }
});

/**
 * 
 * Delete a product
 */


router.get("/products/delete/", (req, res) => {
  let selected = {};
  for (let i in productsList) {
    if (
      productsList[i].url ===
      `http://localhost:3000/products/delete/?id=${req.query.id}`
    ) {
      selected = productsList[i];
      productsList.splice(productsList.indexOf(productsList[i]), 1);
    }
  }

  fs.writeFile(
    "./database/database.json",
    JSON.stringify(productsList),
    err => {
      if (err) {
        console.log(err);
      }
      console.log("product deleted");
    }
  );
  res.render("deleted.hbs", {
    product: selected.product
  });
});

/**
 * Edit Product
 */
router.get("/products/edit/", (req, res) => {
  // let selected = {};
  for (let i in productsList) {
    if (
      productsList[i].url ===
      `http://localhost:3000/products/delete/?id=${req.query.id}`
    ) {
      // selected = productsList[i];
      // productsList.splice(productsList.indexOf(productsList[i]), 1);
    }
  }

  // fs.writeFile(
  //   "./database/database.json",
  //   JSON.stringify(productsList),
  //   err => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log("product deleted");
  //   }
  // );
  res.send('edit')
});


module.exports = router;
