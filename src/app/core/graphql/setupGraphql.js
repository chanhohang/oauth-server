'use strict';

import { makeExecutableSchema } from 'graphql-tools';

import { getLogger } from '../../log/logger'
let logger = getLogger('RegisterController')

// Some fake data
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

// The GraphQL schema in string form
const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
    type Mutation {
        addBook( title: String, author: String ) : Book
    }
  `;

// The resolvers
const resolvers = {
    Query: { books: () => books },
    Mutation: {
        addBook: (root, args) => {
            const newBook = { title: args.title, author: args.author };
            books.push(newBook);
            return newBook;
        },
    },
};

/**
mutation{
addBook(title:"first",author:"second") {
  title
  author
}
}
 */
export default function setupGraphql() {
    return makeExecutableSchema({
        typeDefs,
        resolvers,
    });
}