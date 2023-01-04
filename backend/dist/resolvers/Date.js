"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const dateScalar = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    // serialize(value: Date) {
    //   return value.getTime(); // Convert outgoing Date to integer for JSON
    // },
    // parseValue(value: number) {
    //   return new Date(value); // Convert incoming integer to Date
    // },
    // parseLiteral(ast) {
    //   if (ast.kind === Kind.INT) {
    //     // Convert hard-coded AST string to integer and then to Date
    //     return new Date(parseInt(ast.value, 10));
    //   }
    //   // Invalid hard-coded value (not an integer)
    //   return null;
    // },
});
exports.default = dateScalar;
