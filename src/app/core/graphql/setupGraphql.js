const {makeExecutableSchema} = require("graphql-tools");
const fs = require("fs");
const path = require("path");
const logger = require("../../log/logger").getLogger("setupGraphql");

let RegisterController = require("../controller/RegisterController");
let UserController = require("../controller/UserController");

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const typeDefs = [
  fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8")
];

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    users: () => {
      return UserController.findAllUsers();
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { title: args.title, author: args.author };
      books.push(newBook);
      return newBook;
    },
    addUser: (root, args) => {
      return RegisterController.addUser(
        args.userId,
        args.firstName,
        args.lastName,
        args.password,
        args.email
      );
    }
  }
};

/**
mutation{
addBook(title:"first",author:"second") {
  title
  author
}
}
 */
export default function setup() {
  return makeExecutableSchema({
    typeDefs,
    resolvers
  });
}
