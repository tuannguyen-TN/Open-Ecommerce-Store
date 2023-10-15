# Open E-commerce Store

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)
![Material UI](https://img.shields.io/badge/Material_UI-v.5-2196f3)

## Introduction

The purpose of this repository is to demonstrate a solution that serves as an e-commerce store from the [Platzi Fake Store API](https://fakeapi.platzi.com/), using React, Redux Toolkit, RTK Query, TypeScript, and Material UI.

Experience the website [here](https://tuannguyen-ecommerce-store.netlify.app/).

## Table of contents

- [Requirements](#requirements)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [Author](#author)
- [Project structure](#project-structure)

## Requirements

1. Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website. Read the documentation and learn how to use the different endpoints.
2. Create at lease 4 pages (can be more if you want): Page for all products, product page,
   profile page (only available if user logins), and cart page (cart page could be a page or a modal)
3. Create Redux store for following features:
   - product reducer: get all products, find a single products, filter products by
     categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add product to cart, remove products, update products's quantity in cart
4. When adding routers to your application, programmatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
5. Implement unit testing for the reducers
6. Deploy the application and rewrite README file.

### Bonus

1. Use context API to switch theme (✔️).
2. Use pagination when fetching/displaying all the products (✔️).
3. Implement performance optimization where applicable (✔️).
4. Carousel effect to display product images (✔️).
5. Checkout functionality (✔️).

### Limitations

1. Sorting only works per pagination, not on the whole product list.
2. Checkout functionality merely works with only the payment method added to mimic the behavior, using the `alert` prompt for order confirmation.

## Technologies

- React
- TypeScript
- Material UI
- Redux Toolkit
  - RTK Query

## Getting started

1. Clone the repository to your local machine: `git clone https://github.com/tuannguyen-TN/fs16_6-frontend-project.git`.
2. Get into the directory: `cd fs16_6-frontend-project`.
3. Run `npm install` in terminal to install all the libraries, packages, and dependencies.
4. Run `npm start` to view the solution on the web.

Or you can just visit the production version [here](https://tuannguyen-ecommerce-store.netlify.app/).

## Author

- Tuan Nguyen (tuannguyen221101@gmail.com)

## Project structure

```console
.
├── README.md
├── netlify.toml
├── package-lock.json
├── package.json
├── public
│   ├── _redirects
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── CategoryMenu.tsx
│   │   ├── ImageCarousel.tsx
│   │   ├── ItemPerPageMenu.tsx
│   │   ├── LoginForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductListDisplay.tsx
│   │   ├── ProductMutationFormDialog.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── SingleListItemDisplay.tsx
│   │   ├── SortingOptionsMenu.tsx
│   │   └── UserCard.tsx
│   ├── hooks
│   │   ├── useAppDispatch.ts
│   │   └── useAppSelector.ts
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   ├── AllProductsPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── ErrorPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── SingleProductPage.tsx
│   ├── react-app-env.d.ts
│   ├── redux
│   │   ├── queries
│   │   │   └── productQueries.ts
│   │   ├── reducers
│   │   │   ├── cartReducer.ts
│   │   │   ├── productsReducer.ts
│   │   │   └── userReducer.ts
│   │   └── store
│   │       └── store.ts
│   ├── reportWebVitals.ts
│   ├── schemas
│   │   ├── LoginSchema.ts
│   │   └── RegisterSchema.ts
│   ├── server
│   │   ├── productServer.ts
│   │   └── userServer.ts
│   ├── setupTests.ts
│   ├── test
│   │   ├── Wrapper.tsx
│   │   ├── __mocks__
│   │   │   └── styleMock.ts
│   │   ├── components
│   │   │   ├── App.test.tsx
│   │   │   ├── __snapshots__
│   │   │   │   └── App.test.tsx.snap
│   │   │   └── appRender.tsx
│   │   ├── productsData.ts
│   │   ├── redux
│   │   │   └── reducers
│   │   │       ├── cartReducer.test.ts
│   │   │       ├── productsReducer.test.tsx
│   │   │       └── userReducer.test.ts
│   │   └── usersData.ts
│   └── types
│       ├── AuthorziedToken.ts
│       ├── CartItem.ts
│       ├── Category.ts
│       ├── FilterProductsOptions.ts
│       ├── Product.ts
│       ├── ProductMutationOptions.ts
│       ├── ProductsReducerState.ts
│       ├── TokenDecodedInfo.ts
│       ├── User.ts
│       ├── UserCredentials.ts
│       └── UserReducerState.ts
└── tsconfig.json

18 directories, 69 files
```
